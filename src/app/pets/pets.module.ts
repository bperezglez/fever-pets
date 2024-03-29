import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

import { PetsRoutingModule } from './pets-routing.module';

import { PaginationComponent } from './../shared/pagination/pagination.component';
import { SortableComponent } from './../shared/sortable/sortable.component';

import { PetDayComponent } from './../shared/pet-day/pet-day.component';

@NgModule({
  declarations: [
    DetailComponent,
    ListComponent,
    PaginationComponent,
    SortableComponent,
    PetDayComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PetsRoutingModule,
  ]
})
export class PetsModule { }
