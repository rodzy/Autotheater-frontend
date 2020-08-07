import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'autotheater-frontend';

  constructor(public router: Router) {}
}
