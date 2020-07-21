import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { takeUntil } from 'rxjs/operators';
import { Products } from '../../../models/Products.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  data: Products[];
  errors: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    this.listingProducts();
    // this.listingMostRatedProducts();
  }

  // Listing products
  listingProducts() {
    this.gService
      .List<Products>('products/', this.data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Products[]) => {
          this.data = data;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  // Listing most popular products
  // listingMostRatedProducts(){
  //   this.gService
  //   .List('products/popular/')
  //   .pipe(takeUntil(this.destroy$))
  //   .subscribe(
  //     (data: any) => {
  //       this.data = data;
  //     },
  //     (error: any) => {
  //       this.notification.message(error.name, error.messge, 'error');
  //     }
  //   );
  // }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
