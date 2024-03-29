import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { CreateMoviesComponent } from './create-movies/create-movies.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { UpdateMoviesComponent } from './update-movies/update-movies.component';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateBillboardComponent } from './create-billboard/create-billboard.component';

const declarations: any = [
  CreateMoviesComponent,
  CreateProductsComponent,
  UpdateMoviesComponent,
  UpdateProductsComponent,
  CreateBillboardComponent,
];
const imports: any = [
  CommonModule,
  AdministrationRoutingModule,
  ReactiveFormsModule,
  SharedModule,
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  providers: [DatePipe],
})
export class AdministrationModule {}
