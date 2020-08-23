import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { Movie } from '../../../models/Movies.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Genre } from '../../../models/Genre.interface';
import { MovieClassification } from '../../../models/MovieClasification.interface';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update-movies',
  templateUrl: './update-movies.component.html',
  styleUrls: ['./update-movies.component.scss'],
})
export class UpdateMoviesComponent implements OnInit {
  data: Movie;
  destroy$: Subject<boolean> = new Subject<boolean>();
  id = this.route.snapshot.paramMap.get('id');
  show = false;
  CreateForm: FormGroup;
  isSubmited = false;
  newMovie: Movie;
  genres: Genre[] = [];
  classifications: MovieClassification[] = [];
  message = '';
  constructor(
    public formBuilder: FormBuilder,
    private gService: GenericService,
    private notification: NotficationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.show = true;
    }
    this.ObtainMovieDetails(this.id);
    this.listClassifications();
    this.listGenres();
  }

  // Obtaining movies using the generic service and the notifying service
  ObtainMovieDetails(id: any) {
    this.gService
      .Obtain<Movie>('movies', this.data, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Movie) => {
          this.data = data;
          this.reactiveForm();
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  listGenres() {
    this.gService
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
    this.gService
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

  reactiveForm() {
    this.CreateForm = this.formBuilder.group({
      name: new FormControl(this.data.name),
      synopsis: new FormControl(this.data.sinopsis, [Validators.required]),
      classifications: new FormControl(this.data.classification_id, [
        Validators.required,
      ]),
      genres: new FormControl(''),
    });
  }

  // get method
  get createForm() {
    return this.CreateForm.controls;
  }

  saveGenres(event) {
    event.preventDefault();
    const id = this.CreateForm.get('genres').value;
    const foundG = this.data.genres.find((value) => value.id === id);
    if (foundG === undefined) {
      this.data.genres.push(this.genres.find((value) => value.id === id));
    }
  }

  deleteGenres(event, id: number) {
    event.preventDefault();
    const removedIndex = this.data.genres
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    this.data.genres.splice(removedIndex, 1);
  }

  // Submit the update request
  onSubmitMovie() {
    this.isSubmited = true;
    if (this.CreateForm.invalid || this.data.genres.length === 0) {
      return;
    }
    // this.newMovie = {
    //   name: this.CreateForm.get('name').value,
    //   sinopsis: this.CreateForm.get('sinopsis').value,
    //   classification_id: this.CreateForm.get('classifications').value,
    //   genres: this.CreateForm.get('genres').value,
    //   status: true,
    // }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
