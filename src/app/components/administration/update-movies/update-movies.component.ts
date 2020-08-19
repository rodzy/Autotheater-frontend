import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { Movie } from '../../../models/Movies.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
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
    this.reactiveForm();
  }

  // Obtaining movies using the generic service and the notifying service
  ObtainMovieDetails(id: any) {
    this.gService
      .Obtain<Movie>('movies', this.data, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Movie) => {
          this.data = data;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
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

  // Submit the update request
  onSubmitMovie() {
    this.isSubmited = true;
    if (this.CreateForm.invalid) {
      return;
    }
    this.newMovie = {
      name: this.CreateForm.get('name').value,
      sinopsis: this.CreateForm.get('sinopsis').value,
      classification_id: this.CreateForm.get('classifications').value,
      genres: this.CreateForm.get('genres').value,
      status: true,
    }
  }
}
