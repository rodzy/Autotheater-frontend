import { Component, OnInit, Input } from '@angular/core';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TmdbService } from '../../../services/tmdb.service';

@Component({
  selector: 'app-movies-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  data: any;
  dmdb: any;
  errors: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private tmbdService: TmdbService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    this.listingMovies();
    this.listUpcoming();
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

  // @TODO: KEY env call
  listUpcoming() {
    this.tmbdService
      .RetrieveData(
        'upcoming',
        '7173b32ff3e2adf2e13d28656b0cf89c',
        'en-US',
        '1'
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (dmdb: any) => {
          this.dmdb = dmdb;
        },
        (error: any) => {
          this.notification.message(error.name, error.message, 'error');
        }
      );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
