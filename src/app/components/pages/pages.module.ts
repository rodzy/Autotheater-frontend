import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SharedModule } from '../shared/shared.module';
import { LocationsComponent } from './locations/locations.component';
import { LikedmoviesComponent } from './likedmovies/likedmovies.component';
import { PagesRoutingModule } from './pages-routing.module';
import { TooltipModule } from 'ng2-tooltip-directive';

const declarations: any[] = [
  IndexComponent,
  PageNotFoundComponent,
  CarouselComponent,
  LocationsComponent,
  LikedmoviesComponent,
];

const exports: any[] = [
  IndexComponent,
  PageNotFoundComponent,
  LocationsComponent,
];

const imports: any[] = [
  CommonModule,
  SharedModule,
  PagesRoutingModule,
  TooltipModule,
];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [...imports],
})
export class PagesModule {}
