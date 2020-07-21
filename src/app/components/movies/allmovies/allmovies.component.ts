import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../models/Movies.interface';

@Component({
  selector: 'app-allmovies',
  templateUrl: './allmovies.component.html',
  styleUrls: ['./allmovies.component.scss'],
})
export class AllmoviesComponent implements OnInit {
  @Input() data: Movie[];
  constructor() {}

  ngOnInit(): void {}
}
