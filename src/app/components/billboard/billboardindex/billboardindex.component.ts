import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { Billboard } from 'src/app/models/Bilboard.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movie } from '../../../models/Movies.interface';

@Component({
  selector: 'app-billboardindex',
  templateUrl: './billboardindex.component.html',
  styleUrls: ['./billboardindex.component.scss'],
})
export class BillboardindexComponent implements OnInit {
  data: Billboard[];
  location1: Billboard[];
  location2: Billboard[];
  movieLocation1: Movie[] = [];
  movieLocation2: Movie[] = [];
  show = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.show = localStorage.getItem('currentUser');
    }
    this.listBillboards();
  }

  // Listing billboards, separatelly for each location in mind
  listBillboards() {
    this.gService
      .List<Billboard>('billboard', this.data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (billboards: Billboard[]) => {
          this.data = billboards;
          this.location1 = this.data.filter((item) => item.location_id === 1);
          this.location2 = this.data.filter((item) => item.location_id === 2);
          if (this.location1 !== undefined) {
            this.location1.forEach((element) => {
              this.gService
                .Obtain<Movie>('movies', this.movieLocation1, element.movie_id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((movie: Movie) => {
                  this.movieLocation1.push(movie);
                });
            });
          }
          if (this.location2 !== undefined) {
            this.location2.forEach((element) => {
              this.gService
                .Obtain<Movie>('movies', this.movieLocation2, element.movie_id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((movie: Movie) => {
                  this.movieLocation2.push(movie);
                });
            });
          }
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
