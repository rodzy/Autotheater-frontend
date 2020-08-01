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
import { Users } from '../../../models/Users.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: Users;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  login: Login;
  LoginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    if (!this.authService.currentUser) {
      this.router.navigate(['/']);
    }
    this.reactiveForm();
  }

  ngOnInit(): void {}

  reactiveForm() {
    this.LoginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
    });
  }

  onSubmited() {
    this.reactiveForm();
    if (this.LoginForm.invalid) {
      return;
    }
    this.authService
      .LoginUser(this.LoginForm.value)
      .subscribe((res: any) => {});
  }
}
