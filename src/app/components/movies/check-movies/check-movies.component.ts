import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../models/Movies.interface';
import { Subject } from 'rxjs';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-check-movies',
  templateUrl: './check-movies.component.html',
  styleUrls: ['./check-movies.component.scss'],
})
export class CheckMoviesComponent implements OnInit {
  data: Movie[];
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
      .List<Movie>('movies/', this.data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Movie[]) => {
          this.data = data;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  // Select the desired movie and redirect
  onSelectedRedirect() {}

  // Deactivate movie from the actual cinema
  deactivateMovie() {}
}
