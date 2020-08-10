import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMoviesComponent } from './create-movies/create-movies.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { UpdateMoviesComponent } from './update-movies/update-movies.component';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { AuthGuardService } from '../../guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'create-movies',
    component: CreateMoviesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-products',
    component: CreateProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'update-movies',
    component: UpdateMoviesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'update-products',
    component: UpdateProductsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
