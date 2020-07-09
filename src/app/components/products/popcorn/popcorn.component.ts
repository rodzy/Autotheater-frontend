import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popcorn',
  templateUrl: './popcorn.component.html',
  styleUrls: ['./popcorn.component.scss'],
})
export class PopcornComponent implements OnInit {
  @Input() dataprop;
  constructor() {}

  ngOnInit(): void {}
}
