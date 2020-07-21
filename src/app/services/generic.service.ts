import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  server: string = environment.SERVER_URL;
  currentUser: any;
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
      headers: this.headers,
    });
  }

  // Patch a resource
  Update<T>(
    endpoint: string,
    model: T | any,
    object: T | any
  ): Observable<T | T[]> {
    return this.http.patch<T | T[]>(
      this.server + endpoint + `/${object.id}`,
      object,
      { headers: this.headers }
    );
  }
}
