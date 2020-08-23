import { Component, OnInit } from '@angular/core';
import { Products } from '../../../models/Products.interface';
import { Subject } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ProductTypes } from '../../../models/ProductTypes.interface';
import { Classificationproduct } from '../../../models/Classificationproduct.interface';

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
  pTypes: ProductTypes[] = [];
  classifications: Classificationproduct[] = [];
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
    this.listClassifications();
    this.listProductTypes();
  }

  // Obtaining products using the generic service and the notifying service
  ObtainProductDetails(id: any) {
    this.genericService
      .Obtain<Products>('products', this.data, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Products) => {
          this.data = data;
          this.reactiveForm();
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
  }

  listProductTypes() {
    this.genericService
      .List<ProductTypes>('products/types', this.pTypes)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (types: ProductTypes[]) => {
          this.pTypes = types;
        },
        (error: any) => {
          this.notification.message(error.name, error.message, 'error');
        }
      );
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

  reactiveForm() {
    this.CreateForm = this.formBuilder.group({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl(this.data.description, [
        Validators.required,
        Validators.minLength(15),
      ]),
      price: new FormControl(this.data.price, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      type_id: new FormControl(this.data.type_id, Validators.required),
      classifications: new FormControl(''),
    });
  }

  get createForm() {
    return this.CreateForm.controls;
  }

  saveGenres(event) {
    event.preventDefault();
    const id = this.CreateForm.get('classifications').value;
    const foundG = this.data.classificationproducts.find(
      (value) => value.id === id
    );
    if (foundG === undefined) {
      this.data.classificationproducts.push(
        this.classifications.find((value) => value.id === id)
      );
    }
  }

  deleteGenres(event, id: number) {
    event.preventDefault();
    const removedIndex = this.data.classificationproducts
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    this.data.classificationproducts.splice(removedIndex, 1);
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
    // this.genericService
    //   .Update<Products>('products', this.newProduct, this.data)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     (res: any) => {
    //       this.notification.message(res.name, res.message, 'success');
    //       this.router.navigate(['/dashboard'], {
    //         queryParams: { productSuccess: true },
    //       });
    //     },
    //     (error: any) => {
    //       this.notification.message(error.name, error.message, 'error');
    //     }
    //   );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
