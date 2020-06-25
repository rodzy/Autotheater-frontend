import { Component, OnInit } from '@angular/core';
import header from './header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logo: any;
  home: string;
  about: string;
  pageone: string;
  pagetwo: string;
  pagethree: string;
  pagefour: string;
  locations: string;

  constructor() {
    this.varSetter();
  }

  ngOnInit(): void {}

  varSetter() {
    this.logo = header.header.logo;
    this.home = header.header.home;
    this.about = header.header.about;
    this.pageone = header.header.pageone;
    this.pagetwo = header.header.pagetwo;
    this.pagethree = header.header.pagethree;
    this.pagefour = header.header.pagefour;
    this.locations = header.header.dropdowntitle;
  }
}
