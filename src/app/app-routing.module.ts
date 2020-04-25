import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pets/pets.module').then(mod => mod.PetsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: '404',
      message: 'Not found :(',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
