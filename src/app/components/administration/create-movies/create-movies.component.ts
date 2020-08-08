import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Movie } from '../../../models/Movies.interface';
import { Router } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';
import { TmdbService } from '../../../services/tmdb.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Results } from '../../../models/Results.interface';
import { Result } from '../../../models/Result.interface';

@Component({
  selector: 'app-create-movies',
  templateUrl: './create-movies.component.html',
  styleUrls: ['./create-movies.component.scss'],
})
export class CreateMoviesComponent implements OnInit {
  CreateForm: FormGroup;
  isSubmited = false;
  dmdb: Result;
  dmd: Results;
  movie: Movie;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private notification: NotficationService,
    private tmbdService: TmdbService
  ) {}

  ngOnInit(): void {
    this.listUpcoming();
    console.log(this.dmdb);
  }

  listUpcoming() {
    this.tmbdService.executeQuery<Result>('upcoming').subscribe(
      (d: Result) => {
        this.dmdb = d;
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
