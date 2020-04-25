import { Component, OnInit } from '@angular/core';
import { PetsService } from '../services/pets.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tableHeaders: any;
  pets: Array<any>;
  pagination: Object;

  constructor( private petsService: PetsService) {
    this.tableHeaders = [
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
    ]
   }

  ngOnInit(): void {
    this.getPets();
  }
  getPets(options = {}) {
    this.petsService.getPetsList(options).subscribe(this.handleResponse.bind(this));
  }
  handleSortedEvent(event) {
    this.tableHeaders = this.tableHeaders.map(tableHeader => {
      if (tableHeader.name !== event.name) {
        tableHeader.order = null;
      } else {
        tableHeader.order = event.order;
      }
      return tableHeader;
    });
    const pets = this.petsService.sortPets(event);
    console.log(pets)
    this.pets = pets;
  }
  handlePaginatedEvent(event) {
    this.petsService.getPets({url: event.link}).subscribe(this.handleResponse.bind(this));
  }
  handleResponse(res) {
    const {response, linkHeader} = res;
    this.pets = response;
    this.pagination = linkHeader;
  }

}
