import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMoviesComponent } from './create-movies/create-movies.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { UpdateMoviesComponent } from './update-movies/update-movies.component';
import { UpdateProductsComponent } from './update-products/update-products.component';

const routes: Routes = [
  {
    path: '/create-movies',
    component: CreateMoviesComponent,
  },
  {
    path: '/create-products',
    component: CreateProductsComponent,
  },
  {
    path: '/update-movies',
    component: UpdateMoviesComponent,
  },
  {
    path: '/update-products',
    component: UpdateProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
