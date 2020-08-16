import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillboardRoutingModule } from './billboard-routing.module';
import { BillboardindexComponent } from './billboardindex/billboardindex.component';
import { SharedModule } from '../shared/shared.module';

const declarations: any[] = [BillboardindexComponent];
const imports: any[] = [CommonModule, BillboardRoutingModule, SharedModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class BillboardModule {}
