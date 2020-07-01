import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillboardRoutingModule } from './billboard-routing.module';
import { BillboardindexComponent } from './billboardindex/billboardindex.component';

const declarations: any[] = [BillboardindexComponent];
const imports: any[] = [CommonModule, BillboardRoutingModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class BillboardModule {}
