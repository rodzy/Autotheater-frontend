import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';
import { GenericService } from '../../../services/generic.service';
import { Billboard } from '../../../models/Bilboard.interface';
import { Movie } from '../../../models/Movies.interface';
import { Products } from '../../../models/Products.interface';

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
  products: Products[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private notification: NotficationService,
    private genericService: GenericService
  ) {}

  ngOnInit(): void {}

  /* This sets the initial state for the
     Create reservations component
  */
  getInitialView() {}

  /* This saves products on behalf of
     the user needs
  */
  saveProducts() {}

  /* This deletes products on behalf of
     the user needs
  */
  deleteProducts() {}

  /* This deletes products on behalf of
     the user needs
  */
  saveTickets() {}

  /* This deletes products on behalf of
     the user needs
  */
  deleteTickets() {}

  /* Submiting reservations after the
     users product insertions
  */
  onSubmitedReservation() {}
}
