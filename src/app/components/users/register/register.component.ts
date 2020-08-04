import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Users } from '../../../models/Users.interface';
import { NotficationService } from '../../../services/notfication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  isSubmited = false;
  equals = false;
  errors: any;
  user: Users;

  constructor(
    public fromBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    if (this.user === undefined) {
      this.user = {
        id: 0,
        email: '',
        name: '',
        lastname: '',
        password: '',
        role_id: 0,
      };
    }
    this.reactiveForm();
  }

  reactiveForm() {
    this.RegisterForm = this.fromBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
    });
  }

  passwordVerification() {
    const password = this.RegisterForm.get('password').value;
    const confirmedPassword = this.RegisterForm.get('confirmPassword').value;
    return password === confirmedPassword
      ? (this.equals = false)
      : (this.equals = true);
  }

  get formControls() {
    return this.RegisterForm.controls;
  }

  onSubmited() {
    this.isSubmited = true;
    if (this.RegisterForm.invalid) {
      return;
    }
    if (this.passwordVerification()) {
      return;
    }
    this.user = {
      email: this.RegisterForm.get('email').value,
      name: this.RegisterForm.get('firstName').value,
      lastname: this.RegisterForm.get('lastName').value,
      password: this.RegisterForm.get('password').value,
      role_id: 2,
    };
    this.authService.CreateUser<Users>(this.user).subscribe(
      (data: Users) => {
        (this.user = data), this.router.navigate(['/']);
        console.log(this.user);
      },
      (error: any) => {
        this.errors = error;
        this.notification.msgValidate(this.errors);
      }
    );
  }
}
