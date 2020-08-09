import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
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
import { Result } from '../../../models/Result.interface';

@Component({
  selector: 'app-create-movies',
  templateUrl: './create-movies.component.html',
  styleUrls: ['./create-movies.component.scss'],
})
export class CreateMoviesComponent implements OnInit {
  CreateForm: FormGroup;
  isSubmited = false;
  dmd: Results;
  selectedMovie: Result;
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
    if (this.selectedMovie === undefined) {
      this.selectedMovie = {
        popularity: 0,
        vote_count: 0,
        video: false,
        poster_path: '',
        id: 0,
        adult: false,
        backdrop_path: '',
        original_language: '',
        original_title: '',
        genre_ids: [],
        title: '',
        vote_average: 0,
        overview: '',
        release_date: '',
      };
    }
  }

  onMovieNameChange() {
    this.tmbdService
      .executeQuery<Result>(`${this.CreateForm.get('name').value}`)
      .subscribe(
        (movieSelected: Result) => {
          this.selectedMovie = movieSelected;
        },
        (error: any) => {
          this.notification.message(error.name, error.message, 'error');
        }
      );
  }

  reactiveForm() {
    this.CreateForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      classifications: new FormControl('', [Validators.required]),
      genres: new FormArray([], [Validators.required]),
    });
  }

  // get method
  get createForm() {
    return this.CreateForm.controls;
  }

  // Event checker for the reactive form
  onCheckChecked(event) {
    const genresArray: FormArray = this.CreateForm.get('genres') as FormArray;
    if (event.target.checked) {
      genresArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;
      genresArray.controls.forEach((control: FormControl) => {
        if (control.value === event.target.value) {
          genresArray.removeAt(i);
          return;
        }
        i++;
      });
    }
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

  onSubmitMovie() {
    this.isSubmited = true;
    if (this.CreateForm.invalid) {
      return;
    }
    this.movie = {
      name: this.selectedMovie.title,
      sinopsis: this.selectedMovie.overview,
      image: this.selectedMovie.poster_path,
      banner: this.selectedMovie.backdrop_path,
      classification_id: this.CreateForm.get('classifications').value,
      genres: this.CreateForm.get('genres').value,
      status: true,
    };
    this.genericService
      .Create<Movie>('movies', this.movie, this.movie)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (movie: Movie) => {
          (this.movie = movie), this.router.navigate(['/']);
        },
        (error: any) => {
          this.notification.message(error.name, error.message, 'error');
        }
      );
  }

  onResetMovie() {
    this.selectedMovie = {
      popularity: 0,
      vote_count: 0,
      video: false,
      poster_path: '',
      id: 0,
      adult: false,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids: [],
      title: '',
      vote_average: 0,
      overview: '',
      release_date: '',
    };
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
