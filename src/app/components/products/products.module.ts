import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { DrinksComponent } from './drinks/drinks.component';
import { SnacksComponent } from './snacks/snacks.component';
import { PopcornComponent } from './popcorn/popcorn.component';

const declarations: any[] = [
  IndexComponent,
  DrinksComponent,
  SnacksComponent,
  PopcornComponent,
];
const imports: any[] = [CommonModule, ProductsRoutingModule, SharedModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class ProductsModule {}
