import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { CreateMoviesComponent } from './create-movies/create-movies.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { UpdateMoviesComponent } from './update-movies/update-movies.component';

const declarations: any = [CreateMoviesComponent, CreateProductsComponent, UpdateMoviesComponent];
const imports: any = [CommonModule, AdministrationRoutingModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class AdministrationModule {}
