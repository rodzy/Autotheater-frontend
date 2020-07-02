import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export interface IError {
  error: {
    message: string;
    errors: {
      field: string;
      message: string;
    }[];
  };
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandlerService {
  constructor() {}

  public handleErrors(error: IError | HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.error('Error', error.message);
    }
    if (error.status === 404) {
      error.error.message = 'Recurso no encontrado';
    }
    if (error.status === 401) {
      error.error.message = 'No autorizado';
    }
    if (error.status === 400) {
      error.error.message = 'Solicitud incorrecta';
    }
    return throwError(error);
  }
}
