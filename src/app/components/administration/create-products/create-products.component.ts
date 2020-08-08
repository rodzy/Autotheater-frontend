import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { Products } from '../../../models/Products.interface';
import { Classificationproduct } from '../../../models/Classificationproduct.interface';

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
  constructor(
    public formBuilder: FormBuilder,
    private notification: NotficationService,
    private genericService: GenericService
  ) {}

  ngOnInit(): void {
    this.defaultValuesCheck();
    this.reactiveForm();
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
      type_id: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ])
    });
  }
}
