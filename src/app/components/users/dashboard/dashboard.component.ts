import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/Users.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: Users;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUserInfo().user;
    console.log(this.user);
  }
}
