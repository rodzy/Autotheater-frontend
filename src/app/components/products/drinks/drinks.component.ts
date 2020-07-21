import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../../../models/Products.interface';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})
export class DrinksComponent implements OnInit {
  @Input() dataprop: Products[];
  constructor() {}

  ngOnInit(): void {}
}
