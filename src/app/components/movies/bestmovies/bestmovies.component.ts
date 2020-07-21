import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../models/Movies.interface';

@Component({
  selector: 'app-bestmovies',
  templateUrl: './bestmovies.component.html',
  styleUrls: ['./bestmovies.component.scss'],
})
export class BestmoviesComponent implements OnInit {
  @Input() data: Movie[];

  constructor() {}

  ngOnInit(): void {}
}
