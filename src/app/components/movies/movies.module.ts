import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { IndexComponent } from './index/index.component';

const declarations: any[] = [IndexComponent];
const imports: any[] = [CommonModule, MoviesRoutingModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class MoviesModule { }
