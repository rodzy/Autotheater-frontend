import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Reservation } from '../../../models/Reservation.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {
  data: Reservation;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private notification: NotficationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ObtainReservation();
  }

  // Obtaining reservation details from the selected input
  ObtainReservation() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id.trim() !== '') {
      this.gService
        .Obtain<Reservation>('reservation', this.data, id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res: Reservation) => {
            this.data = res;
          },
          (error: any) => {
            this.notification.message(error.name, error.messge, 'error');
          }
        );
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
