import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { Products } from '../../../models/Products.interface';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
})
export class CreateProductsComponent implements OnInit {
  CreateForm: FormGroup;
  isSubmited = false;
  product: Products;
  constructor(
    public formBuilder: FormBuilder,
    private notification: NotficationService,
    private genericService: GenericService
  ) {}

  ngOnInit(): void {}

  reactiveForm() {}
}
