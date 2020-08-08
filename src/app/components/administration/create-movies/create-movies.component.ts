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
import { GenericService } from '../../../services/generic.service';
import { Genre } from '../../../models/Genre.interface';

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

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
