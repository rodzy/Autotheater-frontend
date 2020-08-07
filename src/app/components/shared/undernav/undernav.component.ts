import { Component, OnInit, Input } from '@angular/core';
import undernav from './undernav';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-undernav',
  templateUrl: './undernav.component.html',
  styleUrls: ['./undernav.component.scss'],
})
export class UndernavComponent implements OnInit {
  heading: string;
  buttonlogin: string;
  buttonsignin: string;
  buttonlogout: string;
  profiletag: string;
  message: string;

  @Input() show;

  constructor(public authService: AuthService) {
    this.setVars();
  }

  ngOnInit(): void {}

  setVars() {
    this.heading = undernav.undernav.heading;
    this.buttonlogin = undernav.undernav.buttonlogin;
    this.buttonsignin = undernav.undernav.buttonsignin;
    this.buttonlogout = undernav.undernav.buttonlogout;
    this.profiletag = undernav.undernav.profiletag;
  }

  logout() {
    this.authService.Logout();
  }
}
