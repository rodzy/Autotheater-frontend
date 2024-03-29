import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Login } from '../../../models/Login.interface';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NotficationService } from '../../../services/notfication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isError: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  login: Login;
  LoginForm: FormGroup;
  isSubmited = false;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotficationService
  ) {
    if (!this.authService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (this.login === undefined) {
      this.login = {
        email: '',
        password: '',
      };
    }
    this.reactiveForm();
  }

  reactiveForm() {
    this.LoginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
    });
  }

  get formControls() {
    return this.LoginForm.controls;
  }

  onSubmited() {
    this.isSubmited = true;
    if (this.LoginForm.invalid) {
      return;
    }
    this.login = {
      email: this.LoginForm.get('email').value,
      password: this.LoginForm.get('password').value,
    };

    try {
      this.authService.LoginUser<Login>(this.login).subscribe(
        (res: any) => {
          this.login = res;
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.isError = error.error.message;
          return;
        }
      );
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
