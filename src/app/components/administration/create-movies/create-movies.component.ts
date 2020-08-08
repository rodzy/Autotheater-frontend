import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Movie } from '../../../models/Movies.interface';
import { Router } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';
import { TmdbService } from '../../../services/tmdb.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Results } from '../../../models/Results.interface';
import { GenericService } from '../../../services/generic.service';
import { Genre } from '../../../models/Genre.interface';
import { MovieClassification } from '../../../models/MovieClasification.interface';

@Component({
  selector: 'app-create-movies',
  templateUrl: './create-movies.component.html',
  styleUrls: ['./create-movies.component.scss'],
})
export class CreateMoviesComponent implements OnInit {
  CreateForm: FormGroup;
  isSubmited = false;
  dmd: Results;
  movie: Movie;
  genres: Genre[];
  classifications: MovieClassification[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private notification: NotficationService,
    private genericService: GenericService,
    private tmbdService: TmdbService
  ) {}

  ngOnInit(): void {
    this.defaultValuesCheck();
    this.listUpcoming();
    this.listGenres();
    this.listClassifications();
    this.reactiveForm();
  }

  defaultValuesCheck() {
    if (this.dmd === undefined) {
      this.dmd = {
        results: [],
      };
    }
    if (this.movie === undefined) {
      this.movie = {
        name: '',
        sinopsis: '',
        image: '',
        banner: '',
        classification_id: 0,
        genres: [],
        status: true,
      };
    }
    if (this.genres === undefined) {
      this.genres = [
        {
          id: 0,
          name: '',
          description: '',
        },
      ];
    }
    if (this.classifications === undefined) {
      this.classifications = [
        {
          id: 0,
          description: '',
          type: '',
        },
      ];
    }
  }

  onMovieNameChange() {
    console.log(this.CreateForm.get('name').value);
  }

  reactiveForm() {
    this.CreateForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      classifications: new FormControl('', [Validators.required]),
      genres: new FormControl('', [Validators.required]),
    });
  }

  listUpcoming() {
    this.tmbdService.executeQuery<Results>('upcoming').subscribe(
      (d: Results) => {
        this.dmd = d;
      },
      (error: any) => {
        this.notification.message(error.name, error.message, 'error');
      }
    );
  }

  listGenres() {
    this.genericService
      .List<Genre>('genres', this.genres)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (gen: Genre[]) => {
          this.genres = gen;
        },
        (error: any) => {
          this.notification.message(error.name, error.message, 'error');
        }
      );
  }

  listClassifications() {
    this.genericService
      .List<MovieClassification>('movies/classification', this.classifications)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (classy: MovieClassification[]) => {
          this.classifications = classy;
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
