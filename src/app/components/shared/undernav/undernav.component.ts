import { Component, OnInit, Input } from '@angular/core';
import undernav from './undernav';
import { AuthService } from '../../../services/auth.service';
import { Token } from '../../../models/Token.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';

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
  logdOff: Token;

  @Input() show;

  constructor(
    public authService: AuthService,
    private notification: NotficationService,
    private route: Router
  ) {
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
    this.authService.Logout<Token>().subscribe(
      (logged: Token) => {
        this.logdOff = logged;
        this.route.navigate(['/'], { queryParams: { log: true } });
      },
      (error: any) => {
        this.notification.message(error.name, error.messge, 'error');
      }
    );
    localStorage.removeItem('currentUser');
  }
}
