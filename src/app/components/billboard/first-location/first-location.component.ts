import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../models/Movies.interface';
import { Billboard } from '../../../models/Bilboard.interface';

@Component({
  selector: 'app-first-location',
  templateUrl: './first-location.component.html',
  styleUrls: ['./first-location.component.scss'],
})
export class FirstLocationComponent implements OnInit {
  @Input() data: Movie[];
  @Input() billboard: Billboard[];

  constructor() {}

  ngOnInit(): void {}
}
