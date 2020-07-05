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
  List(endpoint: string): Observable<any> {
    console.log('HERE DUDE');
    return this.http
      .get<any>(this.server + endpoint, { headers: this.headers })
      .pipe(catchError(this.handler.handleErrors.bind(this)));
  }

  // Obtain a resource
  Obtain(endpoint: string, filter: any): Observable<any | any[]> {
    return this.http
      .get<any | any[]>(this.server + endpoint + `/${filter}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handler.handleErrors.bind(this)));
  }

  // Create a resource
  Create(endpoint: string, object: any | any): Observable<any | any[]> {
    return this.http.post<any | any[]>(this.server + endpoint, object, {
      headers: this.headers,
    });
  }

  // Patch a resource
  Update(endpoint: string, object: any | any[]): Observable<any | any[]> {
    return this.http.patch<any | any[]>(
      this.server + endpoint + `/${object.id}`,
      object,
      { headers: this.headers }
    );
  }
}
