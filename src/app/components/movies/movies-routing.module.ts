import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: 'movies',
    component: IndexComponent,
  },
  {
    path: 'movies/:id',
    component: DetailsComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
