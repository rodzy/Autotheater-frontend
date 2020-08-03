import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  isSubmited = false;
  equals = false;

  constructor(
    public fromBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.RegisterForm = this.fromBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.email,
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
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
    return password === confirmedPassword ? null : !this.equals;
  }

  onSubmited() {
    this.isSubmited = true;
    if (this.RegisterForm.invalid) {
      return;
    }
  }
}
