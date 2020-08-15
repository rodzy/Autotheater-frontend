import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { Subject } from 'rxjs';
import { Billboard } from '../../../models/Bilboard.interface';
import { Movie } from '../../../models/Movies.interface';
import { Locations } from '../../../models/Locations.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-billboard',
  templateUrl: './create-billboard.component.html',
  styleUrls: ['./create-billboard.component.scss'],
})
export class CreateBillboardComponent implements OnInit {
  CreateForm: FormGroup;
  billboard: Billboard;
  movies: Movie[];
  locations: Locations[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private notification: NotficationService,
    private genericService: GenericService
  ) {}

  ngOnInit(): void {
    this.initialValuesCheck();
  }

  initialValuesCheck() {
    this.billboard = {
      capacity: 0,
      date_now: '',
      show_date: '',
      movie_id: 0,
      location_id: 0,
      status: false,
    };
  }

  reactiveForm() {
    this.CreateForm = this.formBuilder.group({
      capacity: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      date_now: new FormControl('', [Validators.required]),
      show_date: new FormControl('', [Validators.required]),
      movie_id: new FormControl('', [Validators.required]),
      location_id: new FormControl('', [Validators.required]),
    });
  }

  get createForm() {
    return this.CreateForm.controls;
  }

  listActiveMovies() {
    this.genericService
      .List<Movie>('movies', this.movies)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (movie: Movie[]) => {
          this.movies = movie;
        },
        (error: any) => {
          this.notification.message(error.name, error.message, 'error');
        }
      );
  }

  listActiveLocations() {
    this.genericService
      .List<Locations>('locations', this.locations)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (location: Locations[]) => {
          this.locations = location;
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
