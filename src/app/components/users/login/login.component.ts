import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../../models/Login.interface';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  login: Login;
  LoginForm: FormGroup;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  reactiveForm() {
    this.LoginForm = new FormGroup({
      email: new FormControl(this.login.email, [
        Validators.required,
        Validators.minLength(10),
        Validators.email,
      ]),
      password: new FormControl(this.login.password, [
        Validators.required,
        Validators.minLength(12),
      ]),
    });
  }

  onSubmited() {
    if (this.LoginForm.invalid) {
      return;
    }
    this.authService
      .LoginUser(this.LoginForm.value)
      .subscribe((res: any) => {});
  }
  updateValues() {}
}
