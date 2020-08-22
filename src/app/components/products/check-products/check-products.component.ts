import { Component, OnInit } from '@angular/core';
import { Products } from '../../../models/Products.interface';
import { Subject } from 'rxjs';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-check-products',
  templateUrl: './check-products.component.html',
  styleUrls: ['./check-products.component.scss'],
})
export class CheckProductsComponent implements OnInit {
  data: Products[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    this.listingProducts();
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

  // Select the desired product and redirect
  onSelectedRedirect() {}

  // Deactivate product from the actual cinema
  deactivateMovie() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
