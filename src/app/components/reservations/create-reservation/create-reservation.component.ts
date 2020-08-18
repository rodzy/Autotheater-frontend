import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { Billboard } from '../../../models/Bilboard.interface';
import { Movie } from '../../../models/Movies.interface';
import { Products } from '../../../models/Products.interface';
import { Tickets } from '../../../models/Tickets.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss'],
})
export class CreateReservationComponent implements OnInit {
  CreateForm: FormGroup;
  isSubmited = false;
  billboard: Billboard;
  movie: Movie;
  products: Products[] = [];
  tickets: Tickets[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotficationService,
    private genericService: GenericService
  ) {}

  ngOnInit(): void {}

  /* This sets the initial state for the
     Create reservations component
  */
  getInitialView() {
    const billboardId = this.route.snapshot.paramMap.get('id');
    if (billboardId.trim() !== '') {
      this.genericService
        .Obtain<Billboard>('billboard', this.billboard, billboardId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (bill: Billboard) => {
            this.billboard = bill;
          },
          (error: any) => {
            this.notification.message(error.name, error.messge, 'error');
          }
        );
    }
    if (this.billboard !== undefined) {
      this.genericService
        .Obtain<Movie>('movies', this.movie, this.billboard.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (movie: Movie) => {
            this.movie = movie;
          },
          (error: any) => {
            this.notification.message(error.name, error.messge, 'error');
          }
        );
    }
  }

  /* This saves products on behalf of
     the user needs
  */
  saveProducts() {}

  /* This deletes products on behalf of
     the user needs
  */
  deleteProducts() {}

  /* This deletes products on behalf of
     the user needs
  */
  saveTickets() {}

  /* This deletes products on behalf of
     the user needs
  */
  deleteTickets() {}

  /* Submiting reservations after the
     users product insertions and tickets selections
  */
  onSubmitedReservation() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
