import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';
import { CheckProductsComponent } from './check-products/check-products.component';
import { RoleGuardService } from '../../guards/role-guard.service';

const routes: Routes = [
  {
    path: 'products',
    component: IndexComponent,
  },
  {
    path: 'products/:id',
    component: DetailsComponent,
  },
  {
    path: 'check-products',
    component: CheckProductsComponent,
    canActivate: [RoleGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
