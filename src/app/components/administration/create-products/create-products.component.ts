import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  reactiveForm() {}
}
