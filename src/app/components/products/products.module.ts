import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { IndexComponent } from './index/index.component';

const declarations: any[] = [IndexComponent];
const imports: any[] = [CommonModule, ProductsRoutingModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class ProductsModule { }