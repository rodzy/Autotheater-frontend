import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../../../models/Products.interface';

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss'],
})
export class SnacksComponent implements OnInit {
  @Input() dataprop: Products[];
  constructor() {}

  ngOnInit(): void {}
}
