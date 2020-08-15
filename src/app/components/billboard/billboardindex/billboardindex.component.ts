import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { Billboard } from 'src/app/models/Bilboard.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-billboardindex',
  templateUrl: './billboardindex.component.html',
  styleUrls: ['./billboardindex.component.scss'],
})
export class BillboardindexComponent implements OnInit {
  data: Billboard[];
  location1: Billboard[];
  location2: Billboard[];
  show = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.show = localStorage.getItem('currentUser');
    }
  }

  // Listing billboards, separatelly for each location in mind
  listBillboards() {
    this.gService
      .List<Billboard>('billboard', this.data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((billboards: Billboard[]) => {
        this.data = billboards;
        this.location1 = this.data.filter((item) => item.location_id === 1);
        this.location2 = this.data.filter((item) => item.location_id === 2);
      });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
