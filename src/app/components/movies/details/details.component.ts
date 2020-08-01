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
  public classification = ['G', 'PG', 'M', 'MA 15+', 'R 18+', 'X 18+'];

  constructor(
    private gService: GenericService,
    private notification: NotficationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ObtainMovieDetails(id);
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
  LikeMovie(id: any) {
    this.gService.Like('movies', id).pipe(takeUntil(this.destroy$));
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
