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
import { DatePipe } from '@angular/common';

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
  isSubmited = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private notification: NotficationService,
    private genericService: GenericService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initialValuesCheck();
    this.listActiveMovies();
    this.listActiveLocations();
    this.reactiveForm();
    const date = new Date().toISOString().split('T')[0];
    document.getElementById('show-date').setAttribute('min', date);
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
      show_date: new FormControl('', [Validators.required]),
      hour: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      minutes: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
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

  // This will create a new session for the solicited movie
  onSubmitToBillboard() {
    this.isSubmited = true;
    if (this.CreateForm.invalid) {
      return;
    }
    const dateToday = new Date();
    const showDated = (this.CreateForm.get('show_date').value as string).concat(
      ` ${this.CreateForm.get('hour').value}:${
        this.CreateForm.get('minutes').value
      }:00`
    );
    const formatedDate = this.datePipe.transform(
      dateToday,
      'yyyy-MM-dd HH:mm:ss',
      'GMT-0600'
    );

    this.billboard = {
      capacity: this.CreateForm.get('capacity').value,
      date_now: formatedDate,
      show_date: showDated,
      movie_id: this.CreateForm.get('movie_id').value,
      location_id: this.CreateForm.get('location_id').value,
      status: true,
    };
    if (this.billboard !== undefined) {
      this.genericService
        .Create<Billboard>('billboard', this.billboard, this.billboard)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res: any) => {
            this.notification.message(
              `Success, ${res.message}`,
              `Added to the billboard successfully ✅✨`,
              'success'
            );
          },
          (error: any) => {
            this.notification.message(error.name, error.message, 'error');
          }
        );
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
