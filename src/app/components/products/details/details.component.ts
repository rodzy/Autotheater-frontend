import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Products } from '../../../models/Products.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  data: Products;
  errors: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  id = this.route.snapshot.paramMap.get('id');
  rating;
  show = false;

  constructor(
    private gService: GenericService,
    private notification: NotficationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.show = true;
    }
    this.ObtainProductDetails(this.id);
  }

  // Listing movies using the generic service and the notifying service
  ObtainProductDetails(id: any) {
    this.gService
      .Obtain<Products>('products', this.data, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Products) => {
          this.data = data;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  // Like the current movie
  likeProduct(e) {
    e.preventDefault();
    this.gService
      // tslint:disable-next-line: radix
      .Like('rating', parseInt(this.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (rate: any) => {
          this.rating = rate;
          console.log(this.rating);
          if (this.rating === 'Product succesfully rated!') {
            this.ObtainProductDetails(this.id);
          }
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
