import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { Billboard } from '../../../models/Bilboard.interface';
import { Movie } from '../../../models/Movies.interface';
import { Products } from '../../../models/Products.interface';
import { Tickets } from '../../../models/Tickets.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Classificationproduct } from '../../../models/Classificationproduct.interface';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss'],
})
export class CreateReservationComponent implements OnInit {
  CreateForm: FormGroup;
  isSubmited = false;
  billboard: Billboard;
  movie: Movie;
  product: Products;
  productClass: Classificationproduct;
  ticket: Tickets;
  products: Products[] = [];
  productClasses: Classificationproduct[] = [];
  tickets: Tickets[] = [];
  selectedProducts: Products[] = [];
  selectedTickets: Tickets[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotficationService,
    private genericService: GenericService
  ) {}

  ngOnInit(): void {
    this.getInitialView();
    this.getProducts();
    this.getTickets();
    this.reactiveForm();
  }

  // First glance of a reactive form
  reactiveForm() {
    this.CreateForm = this.formBuilder.group({
      products: new FormControl(''),
      productClass: new FormControl(''),
      tickets: new FormControl('', [Validators.required]),
    });
  }

  // Get method for the create form alerts
  get createForm() {
    return this.CreateForm.controls;
  }

  /* This sets the initial state for the
     Create reservations component
  */
  getInitialView() {
    const billboardId = this.route.snapshot.paramMap.get('id');
    if (billboardId.trim() !== '') {
      this.genericService
        .Obtain<Billboard>('billboard', this.billboard, billboardId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (bill: Billboard) => {
            this.billboard = bill;
          },
          (error: any) => {
            this.notification.message(error.name, error.messge, 'error');
          }
        );
    }
    if (this.billboard !== undefined) {
      this.genericService
        .Obtain<Movie>('movies', this.movie, this.billboard.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (movie: Movie) => {
            this.movie = movie;
          },
          (error: any) => {
            this.notification.message(error.name, error.messge, 'error');
          }
        );
    }
  }

  // Get the initial view for products and their classifications
  getProducts() {
    this.genericService
      .List<Products>('products', this.products)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (prod: Products[]) => {
          this.products = prod;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
    if (this.products !== undefined) {
      this.genericService
        .List<Classificationproduct>(
          'products/classification',
          this.productClasses
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (classes: Classificationproduct[]) => {
            this.productClasses = classes;
          },
          (error: any) => {
            this.notification.message(error.name, error.messge, 'error');
          }
        );
    }
  }

  // Get tickets listing
  getTickets() {
    this.genericService
      .List<Tickets>('tickets', this.tickets)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (tick: Tickets[]) => {
          this.tickets = tick;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  /* This saves products on behalf of
     the user needs, validating on the database
     that the product still exists
  */
  saveProducts(event) {
    event.preventDefault();
    const id = this.CreateForm.get('products').value;
    this.genericService
      .Obtain<Products>('products', this.product, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (p: Products) => {
          this.product = p;
          this.selectedProducts.push(this.product);
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  /* This deletes products on behalf of
     the user needs
  */
  deleteProducts(event) {
    event.preventDefault();
    const removedIndex = this.selectedProducts
      .map((item) => {
        return item.id;
      })
      .indexOf(1);
    this.selectedProducts.splice(removedIndex, 1);
  }

  /* This deletes products on behalf of
     the user needs
  */
  saveTickets(event) {
    event.preventDefault();
    const id = this.CreateForm.get('tickets').value;
    this.genericService
      .Obtain<Tickets>('tickets', this.ticket, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (t: Tickets) => {
          this.ticket = t;
          this.selectedTickets.push(this.ticket);
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  /* This deletes products on behalf of
     the user needs
  */
  deleteTickets(event) {
    event.preventDefault();
    const removedIndex = this.selectedTickets
      .map((item) => {
        return item.id;
      })
      .indexOf(1);
    this.selectedTickets.splice(removedIndex, 1);
  }

  /* Submiting reservations after the
     users product insertions and tickets selections
  */
  onSubmitedReservation() {
    this.isSubmited = true;
    if (this.CreateForm.invalid) {
      return;
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
