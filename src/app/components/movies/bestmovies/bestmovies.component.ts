import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bestmovies',
  templateUrl: './bestmovies.component.html',
  styleUrls: ['./bestmovies.component.scss'],
})
export class BestmoviesComponent implements OnInit {
  @Input() data;

  constructor() {}

  ngOnInit(): void {}
}
