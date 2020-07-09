import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {
  @Input() dataprop;
  constructor() { }

  ngOnInit(): void {
  }

}
