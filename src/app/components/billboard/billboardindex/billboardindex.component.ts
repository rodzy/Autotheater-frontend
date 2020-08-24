import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { Billboard } from 'src/app/models/Bilboard.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movie } from '../../../models/Movies.interface';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billboardindex',
  templateUrl: './billboardindex.component.html',
  styleUrls: ['./billboardindex.component.scss'],
})
export class BillboardindexComponent implements OnInit {
  data: Billboard[];
  location1: Billboard[] = [];
  location2: Billboard[] = [];
  movieLocation1: Movie[] = [];
  movieLocation2: Movie[] = [];
  show = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private notification: NotficationService,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.show = localStorage.getItem('currentUser');
    }
    this.listBillboards();
    this.messages();
  }

  messages() {
    let done = false;
    this.route.queryParams.subscribe((params) => {
      done = params.done || false;
    });
    if (done) {
      this.notification.message(
        'Success, your reservation has been processed ✅',
        `You can check the details of your transaction on the profile tab, we hope to see you at AutoTheater`,
        'success'
      );
    }
  }
  // Listing billboards, separatelly for each location in mind
  listBillboards() {
    const currentDate = new Date();
    this.gService
      .List<Billboard>('billboard', this.data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (billboards: Billboard[]) => {
          this.data = billboards;
          this.location1 = this.data.filter(
            (item) =>
              item.location_id === 1 &&
              item.show_date >
                this.datepipe.transform(
                  currentDate,
                  'yyyy-MM-dd HH:mm:ss',
                  'GMT-0600'
                ) &&
              item.capacity > 0
          );
          this.location2 = this.data.filter(
            (item) =>
              item.location_id === 2 &&
              item.show_date >
                this.datepipe.transform(
                  currentDate,
                  'yyyy-MM-dd HH:mm:ss',
                  'GMT-0600'
                ) &&
              item.capacity > 0
          );
          if (this.location1 !== undefined) {
            this.location1.forEach((element) => {
              this.gService
                .Obtain<Movie>('movies', this.movieLocation1, element.movie_id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((movie: Movie) => {
                  this.movieLocation1.push(movie);
                });
            });
            this.location1.sort((a, b) => 0 - (a > b ? 1 : -1));
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
            this.location2.sort((a, b) => 0 - (a < b ? 1 : -1));
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
