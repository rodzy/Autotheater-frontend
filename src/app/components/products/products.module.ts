import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { DrinksComponent } from './drinks/drinks.component';
import { SnacksComponent } from './snacks/snacks.component';
import { PopcornComponent } from './popcorn/popcorn.component';
import { DetailsComponent } from './details/details.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { CheckProductsComponent } from './check-products/check-products.component';

const declarations: any[] = [
  IndexComponent,
  DrinksComponent,
  SnacksComponent,
  PopcornComponent,
  DetailsComponent,
  CheckProductsComponent
];
const imports: any[] = [
  CommonModule,
  ProductsRoutingModule,
  SharedModule,
  TooltipModule,
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class ProductsModule {}
