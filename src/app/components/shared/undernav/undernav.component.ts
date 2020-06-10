import { Component, OnInit } from '@angular/core';
import undernav from './undernav';

@Component({
  selector: 'app-undernav',
  templateUrl: './undernav.component.html',
  styleUrls: ['./undernav.component.scss'],
})
export class UndernavComponent implements OnInit {
  heading: string;
  constructor() {
    this.setVars();
  }

  ngOnInit(): void {}

  setVars() {
    this.heading = undernav.undernav.heading;
  }
}
