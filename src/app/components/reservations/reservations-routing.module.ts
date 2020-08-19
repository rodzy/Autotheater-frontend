import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { AuthGuardService } from '../../guards/auth-guard.service';
import { CheckReservationComponent } from './check-reservation/check-reservation.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';

const routes: Routes = [
  {
    path: 'create-reservation/:id',
    component: CreateReservationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'check-reservation',
    component: CheckReservationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reservation-details/:id',
    component: ReservationDetailsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule {}
