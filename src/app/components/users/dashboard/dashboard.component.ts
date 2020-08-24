import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/Users.interface';
import { AuthService } from '../../../services/auth.service';
import { NotficationService } from '../../../services/notfication.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../../models/Reservation.interface';
import { GenericService } from '../../../services/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: Users;
  reservations: Reservation[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private authService: AuthService,
    private genericService: GenericService,
    private notification: NotficationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUserInfo().user;
    this.messages();
  }

  onloadReservations(event) {
    event.preventDefault();
    this.listReservations();
  }

  listReservations() {
    this.genericService
      .Obtain<Reservation>('reservation', this.reservations, this.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (reservs: Reservation[]) => {
          this.reservations = reservs;
          console.log(this.reservations);
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  messages() {
    let movieSuccess = false;
    let movieUpdated = false;
    let productSuccess = false;
    let productUpdate = false;
    this.route.queryParams.subscribe((params) => {
      movieSuccess = params.movieSuccess || false;
      movieUpdated = params.movieUpdated || false;
      productUpdate = params.productUpdate || false;
      productSuccess = params.productSuccess || false;
    });
    if (movieSuccess) {
      this.notification.message(
        'Success, movie registered successfully',
        `Movie registered successfully 📔🎬`,
        'success'
      );
    }
    if (movieUpdated) {
      this.notification.message(
        'Success, movie updated successfully',
        `Movie updated successfully ✅✨`,
        'success'
      );
    }
    if (productUpdate) {
      this.notification.message(
        'Success, product updated successfully',
        `Product updated successfully ✅✨`,
        'success'
      );
    }
    if (productSuccess) {
      this.notification.message(
        'Success, product registered successfully',
        `Product registered successfully 🍿🥤`,
        'success'
      );
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
