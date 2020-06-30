import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MoviesComponent } from './movies/movies.component';
import { BillboardComponent } from './billboard/billboard.component';
import { SharedModule } from '../shared/shared.module';
import { LocationsComponent } from './locations/locations.component';
import { LikedmoviesComponent } from './likedmovies/likedmovies.component';

const declarations: any[] = [
  IndexComponent,
  PageNotFoundComponent,
  CarouselComponent,
  MoviesComponent,
  BillboardComponent,
  LocationsComponent,
  LikedmoviesComponent
];

const exports: any[] = [
  IndexComponent,
  PageNotFoundComponent,
  LocationsComponent,
];

const imports: any[] = [CommonModule, SharedModule];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [...imports],
})
export class PagesModule {}
