import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss'],
})
export class SnacksComponent implements OnInit {
  @Input() dataprop;
  constructor() {}

  ngOnInit(): void {}
}
