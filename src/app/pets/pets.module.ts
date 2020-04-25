import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

import { PetsRoutingModule } from './pets-routing.module';

import { SortableComponent } from './../shared/sortable/sortable.component';


@NgModule({
  declarations: [
    DetailComponent,
    ListComponent,
    SortableComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PetsRoutingModule,
  ]
})
export class PetsModule { }
