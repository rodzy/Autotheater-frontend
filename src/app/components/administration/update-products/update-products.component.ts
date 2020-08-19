import { Component, OnInit } from '@angular/core';
import { Products } from '../../../models/Products.interface';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss'],
})
export class UpdateProductsComponent implements OnInit {
  data: Products;
  destroy$: Subject<boolean> = new Subject<boolean>();
  id = this.route.snapshot.paramMap.get('id');
  show = false;
  CreateForm: FormGroup;
  isSubmited = false;
  newProduct: Products;
  constructor(
    public formBuilder: FormBuilder,
    private genericService: GenericService,
    private notification: NotficationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.show = true;
    }
    this.ObtainProductDetails(this.id);
    this.reactiveForm();
  }

  // Obtaining products using the generic service and the notifying service
  ObtainProductDetails(id: any) {
    this.genericService
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

  reactiveForm() {
    this.CreateForm = this.formBuilder.group({
      name: new FormControl(this.data.name, [Validators.required, Validators.minLength(5)]),
      description: new FormControl(this.data.description, [
        Validators.required,
        Validators.minLength(15),
      ]),
      price: new FormControl(this.data.price, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      type_id: new FormControl(this.data.type_id, Validators.required),
      classifications: new FormArray([], Validators.required),
    });
  }

  get createForm() {
    return this.CreateForm.controls;
  }

  // Event checker for the reactive form
  onCheckChecked(event) {
    const classArray: FormArray = this.CreateForm.get(
      'classifications'
    ) as FormArray;
    if (event.target.checked) {
      classArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;
      classArray.controls.forEach((control: FormControl) => {
        if (control.value === event.target.value) {
          classArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmitedProduct() {
    this.isSubmited = true;
    if (this.CreateForm.invalid) {
      return;
    }
    this.newProduct = {
      name: this.CreateForm.get('name').value,
      description: this.CreateForm.get('description').value,
      price: this.CreateForm.get('price').value,
      type_id: this.CreateForm.get('type_id').value,
      classificationproducts: this.CreateForm.get('classifications').value,
      status: true,
    };
    this.genericService
      .Update<Products>('products', this.newProduct, this.data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: any) => {
          this.notification.message(res.name, res.message, 'success');
          this.router.navigate(['/dashboard'], {
            queryParams: { productSuccess: true },
          });
        },
        (error: any) => {
          this.notification.message(error.name, error.message, 'error');
        }
      );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
