import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';
import { CheckMoviesComponent } from './check-movies/check-movies.component';
import { RoleGuardService } from '../../guards/role-guard.service';

const routes: Routes = [
  {
    path: 'movies',
    component: IndexComponent,
  },
  {
    path: 'movies/:id',
    component: DetailsComponent,
  },
  {
    path: 'check-movies',
    component: CheckMoviesComponent,
    canActivate: [RoleGuardService],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
