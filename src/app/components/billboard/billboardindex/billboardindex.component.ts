import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billboardindex',
  templateUrl: './billboardindex.component.html',
  styleUrls: ['./billboardindex.component.scss'],
})
export class BillboardindexComponent implements OnInit {
  data: any;
  show = null;
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.show = localStorage.getItem('currentUser');
    }
  }
}
