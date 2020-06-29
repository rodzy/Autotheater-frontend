import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CarouselComponent } from './carousel/carousel.component';

const declarations: any[] = [
  IndexComponent,
  PageNotFoundComponent,
  CarouselComponent,
];

const exports: any[] = [IndexComponent, PageNotFoundComponent];

const imports: any[] = [CommonModule];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [...imports],
})
export class PagesModule {}
