import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';

const declarations: any[] = [CarouselComponent];

const exports: any[] = [CarouselComponent];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [CommonModule],
})
export class UIModule {}
