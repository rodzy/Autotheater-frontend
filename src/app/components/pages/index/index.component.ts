import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public slides = [
    {
      src:
        'https://images.unsplash.com/photo-1559813800-e72c62ba08e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    },
    {
      src:
        'https://images.unsplash.com/photo-1565098772267-60af42b81ef2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1384&q=80',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
