import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-allmovies',
  templateUrl: './allmovies.component.html',
  styleUrls: ['./allmovies.component.scss'],
})
export class AllmoviesComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit(): void {}
}
