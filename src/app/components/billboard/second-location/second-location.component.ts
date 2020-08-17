import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../models/Movies.interface';

@Component({
  selector: 'app-second-location',
  templateUrl: './second-location.component.html',
  styleUrls: ['./second-location.component.scss'],
})
export class SecondLocationComponent implements OnInit {
  @Input() data: Movie[];
  constructor() {}

  ngOnInit(): void {}
}
