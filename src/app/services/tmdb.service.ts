import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  api: string = environment.MOVIES_API;
  headers = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private handler: CustomErrorHandlerService
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set(
      'content-type',
      'application/json;charset=utf-8'
    );
  }

  // Getting the data from TMDB API for forms injection
  RetrieveData({
    endpoint,
    key,
    language,
  }: {
    endpoint: string;
    key: any;
    language: string;
  }): Observable<any> {
    return this.http
      .get<any>(`${this.api + endpoint}api_key=${key}&${language}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handler.handleErrors.bind(this)));
  }
}
