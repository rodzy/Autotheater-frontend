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
  isSubmited = false;
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
    const datetime = new Date();
    this.CreateForm = this.formBuilder.group({
      capacity: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      show_date: new FormControl(datetime.toISOString().substring(0, 16), [
        Validators.required,
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
    this.billboard = {
      capacity: this.CreateForm.get('capacity').value,
      date_now: new Date().toLocaleString(),
      show_date: this.CreateForm.get('show_date').value,
      movie_id: this.CreateForm.get('movie_id').value,
      location_id: this.CreateForm.get('location_id').value,
      status: true,
    };
    this.genericService
      .Create<Billboard>('billboard', this.billboard, this.billboard)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: any) => {
          this.notification.message(res.name, res.message, 'success');
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
