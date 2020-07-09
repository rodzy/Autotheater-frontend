import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upcomingmovies',
  templateUrl: './upcomingmovies.component.html',
  styleUrls: ['./upcomingmovies.component.scss'],
})
export class UpcomingmoviesComponent implements OnInit {
  @Input() dataprops;

  constructor() {}

  ngOnInit(): void {}
}
