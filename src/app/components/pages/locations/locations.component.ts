import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  data: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gServirce: GenericService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {}
}
