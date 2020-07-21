import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { takeUntil, map } from 'rxjs/operators';
import { Movie } from '../../../models/Movies.interface';

@Component({
  selector: 'app-likedmovies',
  templateUrl: './likedmovies.component.html',
  styleUrls: ['./likedmovies.component.scss'],
})
export class LikedmoviesComponent implements OnInit {
  data: Movie[];
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    this.listingPopularMovies();
  }

   // Listing most popular movies
   listingPopularMovies() {
    this.gService
      .List<Movie>('movies/', this.data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Movie[]) => {
          this.data = data
            .filter((x) => x.likes_count)
            .sort((a, b) => b.likes_count - a.likes_count);
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

}
