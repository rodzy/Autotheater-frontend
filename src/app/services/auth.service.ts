import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { Token } from '../models/Token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Stablishing headers for the http requests
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  server = environment.SERVER_URL;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private handler: CustomErrorHandlerService
  ) {
    this.currentUserSubject = new BehaviorSubject<Token>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Getting the current user information
  public getCurrentUserInfo(): Token {
    return this.currentUserSubject.value;
  }

  // Create/Register users
  CreateUser<T>(user: T): Observable<T> {
    return this.http
      .post<T>(this.server + 'auth/register', user, this.httpOptions)
      .pipe(catchError(this.handler.handleErrors.bind(this)));
  }

  // Login registered users
  LoginUser<T>(user: T): Observable<T> {
    return this.http
      .post<T>(this.server + 'auth/login', user, this.httpOptions)
      .pipe(
        // tslint:disable-next-line: no-shadowed-variable
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  // Logout
  Logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.http.post(
      this.server + 'auth/logout',
      this.currentUser,
      this.httpOptions
    );
  }
}
