import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { NotficationService } from '../../../services/notfication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private tmbdService: TmdbService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    this.listUpcoming();
  }

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
