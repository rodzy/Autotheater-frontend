import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Movie } from '../../../models/Movies.interface';
import { Router } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';
import { TmdbService } from '../../../services/tmdb.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-movies',
  templateUrl: './create-movies.component.html',
  styleUrls: ['./create-movies.component.scss'],
})
export class CreateMoviesComponent implements OnInit {
  CreateForm: FormGroup;
  isSubmited = false;
  tmdbData: any;
  movie: Movie;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private notification: NotficationService,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    if (this.movie === undefined) {
      this.movie = null;
    }
  }

  // reactiveForm() {
  //   this.CreateForm = this.formBuilder.group({
  //     movie: new FormControl
  //     classification: new FormControl

  //   })
  // }

  loadMovieData() {
    this.tmdbService
      .RetrieveData('upcoming', 'en-US', '1')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (dmdb: any) => {
          this.tmdbData = dmdb;
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
