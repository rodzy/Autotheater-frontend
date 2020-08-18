import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillboardRoutingModule } from './billboard-routing.module';
import { BillboardindexComponent } from './billboardindex/billboardindex.component';
import { SharedModule } from '../shared/shared.module';
import { FirstLocationComponent } from './first-location/first-location.component';
import { SecondLocationComponent } from './second-location/second-location.component';

const declarations: any[] = [
  BillboardindexComponent,
  FirstLocationComponent,
  SecondLocationComponent,
];
const imports: any[] = [CommonModule, BillboardRoutingModule, SharedModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class BillboardModule {}
