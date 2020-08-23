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
import { Tickets } from '../../../models/Tickets.interface';

@Component({
  selector: 'app-create-billboard',
  templateUrl: './create-billboard.component.html',
  styleUrls: ['./create-billboard.component.scss'],
})
export class CreateBillboardComponent implements OnInit {
  CreateForm: FormGroup;
  billboard: Billboard;
  movies: Movie[] = [];
  locations: Locations[] = [];
  tickets: Tickets[] = [];
  selectedTickets: Tickets[] = [];
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
    this.listTickets();
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
      tickets: [],
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
      tickets: new FormControl(),
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

  listTickets() {
    this.genericService
        .List<Tickets>('tickets', this.tickets)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (t: Tickets[]) => {
            this.tickets = t;
          },
          (error: any) => {
            this.notification.message(error.name, error.messge, 'error');
          }
        );
  }

  saveTickets(event) {
    event.preventDefault();
    const id = this.CreateForm.get('tickets').value;
    const foundT = this.selectedTickets.find((value) => value.id === id);
    if (foundT === undefined) {
      this.selectedTickets.push(this.tickets.find((value) => value.id === id));
    }
  }

  deleteTickets(event, id: number) {
    event.preventDefault();
    const removedIndex = this.selectedTickets
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    this.selectedTickets.splice(removedIndex, 1);
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

    const goToTickets = [];
    this.selectedTickets.forEach((item) => {
      goToTickets.push(item.id);
    });

    this.billboard = {
      capacity: this.CreateForm.get('capacity').value,
      date_now: formatedDate,
      show_date: showDated,
      movie_id: this.CreateForm.get('movie_id').value,
      location_id: this.CreateForm.get('location_id').value,
      tickets: goToTickets,
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
