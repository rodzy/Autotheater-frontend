import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Movie } from '../../../models/Movies.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  data: Movie;
  errors: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  classification = ['G', 'PG', 'M', 'MA 15+', 'R 18+', 'X 18+'];
  id = this.route.snapshot.paramMap.get('id');
  liked;
  show = false;
  constructor(
    private gService: GenericService,
    private notification: NotficationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.show = true;
    }
    this.ObtainMovieDetails(this.id);
  }

  // Listing movies using the generic service and the notifying service
  ObtainMovieDetails(id: any) {
    this.gService
      .Obtain<Movie>('movies', this.data, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Movie) => {
          this.data = data;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  // Like the current movie
  likeMovie(e) {
    e.preventDefault();
    this.gService
      // tslint:disable-next-line: radix
      .Like('likes', parseInt(this.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (like: any) => {
          this.liked = like;
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
