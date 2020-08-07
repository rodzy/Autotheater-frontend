import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMoviesComponent } from './create-movies/create-movies.component';
import { CreateProductsComponent } from './create-products/create-products.component';

const routes: Routes = [
  {
    path: '/create-movies',
    component: CreateMoviesComponent,
  },
  {
    path: '/create-products',
    component: CreateProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
