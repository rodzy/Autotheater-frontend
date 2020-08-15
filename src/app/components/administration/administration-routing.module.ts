import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMoviesComponent } from './create-movies/create-movies.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { UpdateMoviesComponent } from './update-movies/update-movies.component';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { AuthGuardService } from '../../guards/auth-guard.service';
import { RoleGuardService } from '../../guards/role-guard.service';
import { CreateBillboardComponent } from './create-billboard/create-billboard.component';

const routes: Routes = [
  {
    path: 'create-movies',
    component: CreateMoviesComponent,
    canActivate: [AuthGuardService, RoleGuardService],
  },
  {
    path: 'create-products',
    component: CreateProductsComponent,
    canActivate: [AuthGuardService, RoleGuardService],
  },
  {
    path: 'update-movies',
    component: UpdateMoviesComponent,
    canActivate: [AuthGuardService, RoleGuardService],
  },
  {
    path: 'update-products',
    component: UpdateProductsComponent,
    canActivate: [AuthGuardService, RoleGuardService],
  },
  {
    path: 'create-billboard',
    component: CreateBillboardComponent,
    canActivate: [AuthGuardService, RoleGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
