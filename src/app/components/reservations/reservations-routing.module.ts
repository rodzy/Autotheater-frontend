import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { AuthGuardService } from '../../guards/auth-guard.service';
import { RoleGuardService } from '../../guards/role-guard.service';
import { CheckReservationComponent } from './check-reservation/check-reservation.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';

const routes: Routes = [
  {
    path: 'create-reservation',
    component: CreateReservationComponent,
    canActivate: [AuthGuardService, RoleGuardService],
  },
  {
    path: 'check-reservation',
    component: CheckReservationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reservation-details',
    component: ReservationDetailsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule {}
