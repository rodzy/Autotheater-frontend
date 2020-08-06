import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { IndexComponent } from './index/index.component';
import { UpcomingmoviesComponent } from './upcomingmovies/upcomingmovies.component';
import { SharedModule } from '../shared/shared.module';
import { AllmoviesComponent } from './allmovies/allmovies.component';
import { BestmoviesComponent } from './bestmovies/bestmovies.component';
import { DetailsComponent } from './details/details.component';
import { TooltipModule } from 'ng2-tooltip-directive';

const declarations: any[] = [
  IndexComponent,
  UpcomingmoviesComponent,
  AllmoviesComponent,
  BestmoviesComponent,
  DetailsComponent,
];
const imports: any[] = [
  CommonModule,
  MoviesRoutingModule,
  SharedModule,
  TooltipModule,
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class MoviesModule {}
