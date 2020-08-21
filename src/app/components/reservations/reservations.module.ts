import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { CheckReservationComponent } from './check-reservation/check-reservation.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const declarations: any = [
  CheckReservationComponent,
  CreateReservationComponent,
  ReservationDetailsComponent,
];

const imports: any = [
  CommonModule,
  ReservationsRoutingModule,
  SharedModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  providers: [DatePipe],
})
export class ReservationsModule {}
