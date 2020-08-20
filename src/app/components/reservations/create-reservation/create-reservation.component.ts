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
import { Reservation } from '../../../models/Reservation.interface';
import { AuthService } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';

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
  selectedClassifications: Classificationproduct[] = [];
  selectedTickets: Tickets[] = [];
  reservation: Reservation;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotficationService,
    private genericService: GenericService,
    private authService: AuthService,
    public datepipe: DatePipe
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
            if (this.billboard !== undefined) {
              this.genericService
                .Obtain<Movie>('movies', this.movie, this.billboard.movie_id)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  (movie: Movie) => {
                    this.movie = movie;
                  },
                  (error: any) => {
                    this.notification.message(
                      error.name,
                      error.messge,
                      'error'
                    );
                  }
                );
            }
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
    const idCl = this.CreateForm.get('productClass').value;
    if (id !== '' && idCl !== '') {
      this.genericService
        .Obtain<Products>('products', this.product, id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (p: Products) => {
            this.product = p;
            this.selectedProducts.push(this.product);
            this.genericService
              .Obtain<Classificationproduct>(
                'products/classification',
                this.productClass,
                idCl
              )
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                (clp: Classificationproduct) => {
                  this.productClass = clp;
                  this.selectedClassifications.push(this.productClass);
                },
                (error: any) => {
                  this.notification.message(error.name, error.messge, 'error');
                }
              );
          },
          (error: any) => {
            this.notification.message(error.name, error.messge, 'error');
          }
        );
    } else {
      return;
    }
  }

  /* This deletes products on behalf of
     the user needs
  */
  deleteProducts(event, id: number, idCL: number) {
    event.preventDefault();
    const removedIndex = this.selectedProducts
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    const removedClass = this.selectedClassifications
      .map((item) => {
        return item.id;
      })
      .indexOf(idCL);
    this.selectedProducts.splice(removedIndex, 1);
    this.selectedClassifications.splice(removedClass, 1);
  }

  /* This deletes products on behalf of
     the user needs
  */
  saveTickets(event) {
    event.preventDefault();
    const id = this.CreateForm.get('tickets').value;
    if (id !== '') {
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
  }

  /* This deletes products on behalf of
     the user needs
  */
  deleteTickets(event, id: number) {
    event.preventDefault();
    const removedIndex = this.selectedTickets
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
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
    // Calculated values of the screen logic
    // Destructure the arrays
    let subtotalTickets = 0;
    let subtotalProducts = 0;
    let subtotalAddons = 0;
    const goToTickets = [];
    const goToProducts = [];
    this.selectedTickets.forEach((item) => {
      goToTickets.push(item.id);
      subtotalTickets += parseFloat(item.pricing.toString());
    });
    this.selectedProducts.forEach((item) => {
      goToProducts.push(item.id);
      subtotalProducts += parseFloat(item.price.toString());
    });
    this.selectedClassifications.forEach((item) => {
      subtotalAddons += parseFloat(item.pricetotal.toString());
    });
    const total = subtotalTickets + subtotalProducts + subtotalAddons;
    // Set up taxing
    const finalTotal = total * 1.13;
    const currentDate = new Date();
    this.reservation = {
      billboard_id: this.billboard.id,
      date_now: this.datepipe.transform(
        currentDate,
        'yyyy-MM-dd HH:mm:ss',
        'GMT-0600'
      ),
      user_id: this.authService.getCurrentUserInfo().user.id,
      products: goToProducts,
      tickets: goToTickets,
      tax: 13,
      total: parseFloat(finalTotal.toPrecision(2)),
    };
    // Removing from localStorage residual data
    if (localStorage.getItem('reservationDetails')) {
      localStorage.removeItem('reservationDetails');
    }

    // Pulling the actual request to the database
    if (this.reservation !== undefined) {
      // this.genericService.Update<Billboard>('billboard',this.billboard,this.billboard).pipe(takeUntil(this.destroy$)).subscribe(())
      this.genericService
      .Create<Reservation>('reservation', this.reservation, this.reservation)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: any) => {
            localStorage.setItem('reservationDetails', JSON.stringify(this.reservation));
            this.notification.message(res.name, res.message, 'success');
            this.router.navigate(['reservation-details'], {
              queryParams: { done: true },
            });
          },
          (error: any) => {
            this.notification.message(error.name, error.message, 'error');
          }
        );
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
