import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { AuthService } from './auth.service';

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
}
