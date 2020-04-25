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
    this.petsService.getPets(options).subscribe(
      (res) => {
        const {response, linkHeader} = res;
        this.pets = response;
      }
    )
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

}
