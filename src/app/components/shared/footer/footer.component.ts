import { Component, OnInit } from '@angular/core';
import footer from './footer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  copyright: string;
  owner: string;
  license: string;
  title: string;

  constructor() {
    this.varSetter();
  }

  ngOnInit(): void {}

  varSetter() {
    this.copyright = footer.footer.copyright;
    this.owner = footer.footer.owner;
    this.license = footer.footer.license;
    this.title = footer.footer.title;
  }
}
