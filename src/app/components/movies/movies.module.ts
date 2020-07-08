import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { IndexComponent } from './index/index.component';
import { UpcomingmoviesComponent } from './upcomingmovies/upcomingmovies.component';
import { SharedModule } from '../shared/shared.module';
import { SwiperComponent } from './swiper/swiper.component';
import {NgxUsefulSwiperModule} from 'ngx-useful-swiper';

const declarations: any[] = [
  IndexComponent,
  UpcomingmoviesComponent,
  SwiperComponent,
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
