import { Component, OnInit } from '@angular/core';
import undernav from './undernav';

@Component({
  selector: 'app-undernav',
  templateUrl: './undernav.component.html',
  styleUrls: ['./undernav.component.scss'],
})
export class UndernavComponent implements OnInit {
  heading: string;
  buttonlogin: string;
  buttonsignin: string;
  buttonlogout: string;
  profiletag: string;

  show = false;

  constructor() {
    this.setVars();
  }

  ngOnInit(): void {}

  setVars() {
    this.heading = undernav.undernav.heading;
    this.buttonlogin = undernav.undernav.buttonlogin;
    this.buttonsignin = undernav.undernav.buttonsignin;
    this.buttonlogout = undernav.undernav.buttonlogout;
    this.profiletag = undernav.undernav.profiletag;
  }
}
