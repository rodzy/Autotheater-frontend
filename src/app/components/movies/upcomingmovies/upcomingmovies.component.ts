import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { NotficationService } from '../../../services/notfication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from '../../../services/generic.service';

@Component({
  selector: 'app-upcomingmovies',
  templateUrl: './upcomingmovies.component.html',
  styleUrls: ['./upcomingmovies.component.scss'],
})
export class UpcomingmoviesComponent implements OnInit {
  data: any;
  errors: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private tmbdService: TmdbService,
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

  // @TODO: KEY env call
  listUpcoming() {
    this.tmbdService
      .RetrieveData('upcoming', '7', 'en-US', '1')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.data = data;
        },
        (error: any) => {
          this.notification.message(error.name, error.message, 'error');
        }
      );
    console.log(this.data);
  }
}
