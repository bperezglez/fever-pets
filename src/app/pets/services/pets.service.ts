import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

const DEFAULT_API_PAGE = 1;
const DEFAULT_API_LIMIT = 10;

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  linksObj: any;
  pets: Array<any>;
  tableHeaders: any;

  constructor(private http: HttpClient) {
    this.tableHeaders = this.getDefaultTableHeaders();
  }

  getDefaultTableHeaders() {
    return [
      {
        name: 'photo_url',
        title: 'Imagen',
        sortable: false,
        order: null,
      },
      {
        name: 'name',
        title: 'Nombre',
        sortable: true,
        order: null,
      },
      {
        name: 'kind',
        title: 'Tipo',
        sortable: true,
        order: null,
      },
      {
        name: 'weight',
        title: 'Peso',
        sortable: true,
        order: null,
      },
      {
        name: 'height',
        title: 'Altura',
        sortable: true,
        order: null,
      },
      {
        name: 'length',
        title: 'Tamaño',
        sortable: true,
        order: null,
      },
    ];
  }

  getPetsList(options: {
    page?: number;
    limit?: number;
    order?: String;
    by?: String;
  }) {
    let { page, limit, order, by } = options;
    page = page || DEFAULT_API_PAGE;
    limit = limit || DEFAULT_API_LIMIT;

    const url = `${environment.API_URL}pets`;
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());
    return this.getPets({ url, params, order, by });
  }

  getPets({ url, params = {}, order = null, by = null }) {
    return this.http.get(url, { params, observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const linkHeader = this.transformLinkToJson(
          response.headers.get('Link')
        );
        this.pets = response.body;
        this.sortPets({ name: by, order });
        return {
          tableHeaders: this.getDefaultTableHeaders(),
          response: response.body,
          linkHeader,
        };
      })
    );
  }

  sortPets({ name, order }) {
    if (order) {
      this.pets = this.pets.sort((a, b) => {
        if (
          (order === 'desc' && a[name] < b[name]) ||
          (order === 'asc' && a[name] > b[name])
        ) {
          return 1;
        }
        if (
          (order === 'desc' && a[name] > b[name]) ||
          (order === 'asc' && a[name] < b[name])
        ) {
          return -1;
        }
        return 0;
      });
    }
    return this.pets;
  }

  transformLinkToJson(links) {
    const linksSplited = links.split(',');
    const linkObj = {};
    linksSplited.forEach((link) => {
      let [url, name] = link.split(';');
      url = url.replace(/<(.*)>/, '$1').trim();
      name = name.replace(/rel="(.*)"/, '$1').trim();
      linkObj[name] = url;
    });
    this.linksObj = linkObj;
    return linkObj;
  }

  getPetById({id}) {
    return this.http.get(`${environment.API_URL}pets/${id}`)
    .pipe(
      map((pet: any) => {
        pet.health = this.calculatePetHealth(pet);
        return pet;
      })
    );
  }

  calculatePetHealth(pet) {
    const petHealth = pet.weight / (pet.height * pet.length);
    if ((petHealth === 1 && pet.kind === 'cat') || (petHealth < 2 || petHealth > 5)) {
      return 'unhealthy';
    }
    if (petHealth => 2 && petHealth <= 3) {
      return 'very healthy';
    }
    if (petHealth > 3 || petHealth <= 5) {
      return 'healthy';
    }
    
  }
}
