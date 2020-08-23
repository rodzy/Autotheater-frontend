import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token } from '../models/Token.interface';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  server: string = environment.SERVER_URL;
  currentUser: Token;
  headers = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private handler: CustomErrorHandlerService,
    private authService: AuthService
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    // Subcribing to the current user signed in
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    if (this.currentUser) {
      if (this.currentUser.access_token) {
        this.headers = this.headers.append(
          'Authorization',
          'Bearer' + this.currentUser.access_token
        );
      }
    }
  }

  // Listing
  List<T>(endpoint: string, model: T | any): Observable<T | T[]> {
    return this.http
      .get<T | T[]>(this.server + endpoint, { headers: this.headers })
      .pipe(catchError(this.handler.handleErrors.bind(this)));
  }

  // Obtain a resource
  Obtain<T>(
    endpoint: string,
    model: T | any,
    filter: any
  ): Observable<T | T[]> {
    return this.http
      .get<T | T[]>(this.server + endpoint + `/${filter}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handler.handleErrors.bind(this)));
  }

  // Create a resource
  Create<T>(
    endpoint: string,
    model: T | any,
    object: T | any
  ): Observable<T | T[]> {
    return this.http.post<T | T[]>(this.server + endpoint, object, {
      // tslint:disable-next-line: object-literal-key-quotes
      headers: new HttpHeaders({
        // tslint:disable-next-line: object-literal-key-quotes
        Authorization: 'Bearer' + this.currentUser.access_token,
      }),
    });
  }

  // Patch a resource
  Update<T>(
    endpoint: string,
    object: T | any,
    id: number
  ): Observable<T | T[]> {
    return this.http.post<T | T[]>(this.server + endpoint + `/${id}`, object, {
      headers: this.headers,
    });
  }

  Like(endpoint: string, id: number): Observable<any | any[]> {
    return this.http.post<any | any[]>(this.server + endpoint + `/${id}`, {
      headers: this.headers,
    });
  }
}
