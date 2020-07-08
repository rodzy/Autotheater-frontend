import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bestmovies',
  templateUrl: './bestmovies.component.html',
  styleUrls: ['./bestmovies.component.scss']
})
export class BestmoviesComponent implements OnInit {
  data: any;
  errors: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    this.listingMovies();
  }

  // Listing movies using the generic service and the notifying service
  listingMovies() {
    this.gService
      .List('movies/')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.data = data;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  // Listing most popular movies
  listingPopularMovies() {
    this.gService
      .List('movies/popular')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.data = data;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}