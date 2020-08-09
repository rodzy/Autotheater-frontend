import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { Products } from '../../../models/Products.interface';
import { Classificationproduct } from '../../../models/Classificationproduct.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
})
export class CreateProductsComponent implements OnInit {
  CreateForm: FormGroup;
  isSubmited = false;
  product: Products;
  classifications: Classificationproduct[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private notification: NotficationService,
    private genericService: GenericService
  ) {}

  ngOnInit(): void {
    this.defaultValuesCheck();
    this.reactiveForm();
    this.listClassifications();
  }

  defaultValuesCheck() {
    if (this.product === undefined) {
      this.product = {
        name: '',
        description: '',
        price: 0,
        type_id: 0,
        status: false,
        classificationproducts: [],
      };
    }
    if (this.classifications === undefined) {
      this.classifications = [
        {
          id: 0,
          description: '',
          pricetotal: '',
          type: '',
        },
      ];
    }
  }

  reactiveForm() {
    this.CreateForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      type: new FormControl('', Validators.required),
      classifications: new FormArray([], Validators.required),
    });
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

  listClassifications() {
    this.genericService
      .List<Classificationproduct>(
        'products/classification',
        this.classifications
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (classy: Classificationproduct[]) => {
          this.classifications = classy;
        },
        (error: any) => {
          this.notification.message(error.name, error.message, 'error');
        }
      );
  }

  onSubmitedProduct() {
    this.isSubmited = true;
    if (this.CreateForm.invalid) {
      return;
    }
    this.product = {
      name: this.CreateForm.get('name').value,
      description: this.CreateForm.get('description').value,
      price: this.CreateForm.get('price').value,
      type_id: this.CreateForm.get('type').value,
      classificationproducts: this.CreateForm.get('classifications').value,
      status: true,
    };
    this.genericService
      .Create<Products>('products', this.product, this.product)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (product: Products) => {
          (this.product = product), this.router.navigate(['/']);
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
