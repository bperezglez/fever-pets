import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

const DEFAULT_API_PAGE = 1;
const DEFAULT_API_LIMIT = 10;

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  pets:any;

  constructor(private http: HttpClient) { }

  getPets(options: {page?: number, limit?: number}) {
    let {page, limit} = options;
    page = page || DEFAULT_API_PAGE;
    limit = limit || DEFAULT_API_LIMIT;
    const params = new HttpParams()
        .set('_page', page.toString())
        .set('_limit', limit.toString());
    return this.http.get(`${environment.API_URL}`, {params, observe: 'response'})
            .pipe(
              map((response: HttpResponse<any>) => {
                const linkHeader = response.headers.get('Link');
                this.pets = response.body;
                return {
                  response: response.body,
                  linkHeader,
                };
              }),
            );
  }

  sortPets({name, order}) {
    return this.pets.sort((a, b) => {
      console.log(order)
      if ( order === 'desc' && a[name] < b[name] || order === 'asc' &&  a[name] > b[name]  ){
        return 1;
      }
      if ( order === 'desc' &&  a[name] > b[name] || order === 'asc' &&  a[name] < b[name] ){
        return -1;
      }
      return 0;
    });
  }

}
