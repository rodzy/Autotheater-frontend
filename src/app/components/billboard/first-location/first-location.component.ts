import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../models/Movies.interface';

@Component({
  selector: 'app-first-location',
  templateUrl: './first-location.component.html',
  styleUrls: ['./first-location.component.scss'],
})
export class FirstLocationComponent implements OnInit {
  @Input() data: Movie[];
  constructor() {}

  ngOnInit(): void {}
}
