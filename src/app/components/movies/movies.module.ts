import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { IndexComponent } from './index/index.component';
import { UpcomingmoviesComponent } from './upcomingmovies/upcomingmovies.component';
import { SharedModule } from '../shared/shared.module';
import {NgxUsefulSwiperModule} from 'ngx-useful-swiper';
import { AllmoviesComponent } from './allmovies/allmovies.component';
import { BestmoviesComponent } from './bestmovies/bestmovies.component';

const declarations: any[] = [
  IndexComponent,
  UpcomingmoviesComponent,
  AllmoviesComponent,
  BestmoviesComponent
];
const imports: any[] = [
  CommonModule,
  MoviesRoutingModule,
  SharedModule,
  NgxUsefulSwiperModule
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class MoviesModule {}
