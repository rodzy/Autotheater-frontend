import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../../../models/Products.interface';

@Component({
  selector: 'app-popcorn',
  templateUrl: './popcorn.component.html',
  styleUrls: ['./popcorn.component.scss'],
})
export class PopcornComponent implements OnInit {
  @Input() dataprop: Products[];
  constructor() {}

  ngOnInit(): void {}
}
