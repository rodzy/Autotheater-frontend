import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { CheckReservationComponent } from './check-reservation/check-reservation.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';

const declarations: any = [
  CheckReservationComponent,
  CreateReservationComponent,
  ReservationDetailsComponent,
];

const imports: any = [CommonModule, ReservationsRoutingModule, SharedModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
})
export class ReservationsModule {}
