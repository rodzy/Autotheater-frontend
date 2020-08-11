import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/Users.interface';
import { AuthService } from '../../../services/auth.service';
import { NotficationService } from '../../../services/notfication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: Users;
  constructor(
    private authService: AuthService,
    private notification: NotficationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUserInfo().user;
    this.messages();
  }

  messages() {
    let movieSuccess = false;
    let productSuccess = false;
    this.route.queryParams.subscribe((params) => {
      movieSuccess = params.movieSuccess || false;
      productSuccess = params.productSuccess || false;
    });
    if (movieSuccess) {
      this.notification.message(
        'Success, movie registered successfully',
        `Movie registered successfully 📔🎬`,
        'success'
      );
    }
    if (productSuccess) {
      this.notification.message(
        'Success, product registered successfully',
        `Product registered successfully 🍿🥤`,
        'success'
      );
    }
  }
}
