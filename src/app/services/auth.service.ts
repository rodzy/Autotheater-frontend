import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
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
}
