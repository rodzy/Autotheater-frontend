import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomErrorHandlerService } from './custom-error-handler.service';

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
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Getting the current user information
  public getCurrentUserInfo(): any {
    return this.currentUserSubject.value;
  }

  // Create/Register users
  // @TODO REWRITE DOCS FOR THE ROUTING IN THE SERVER
  CreateUser(user: any): Observable<any> {
    return this.http
      .post<any>(this.server + 'app/auth/register', user, this.httpOptions)
      .pipe(catchError(this.handler.handleErrors.bind(this)));
  }

  // Login registered users
  // @TODO REWRITE DOCS FOR THE ROUTING IN THE SERVER
  LoginUser(user: any): Observable<any> {
    return this.http
      .post<any>(this.server + 'app/auth/login', user, this.httpOptions)
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
  // @TODO REWRITE DOCS FOR THE ROUTING IN THE SERVER
  Logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
