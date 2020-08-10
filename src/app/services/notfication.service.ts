import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotficationService {
  options: IndividualConfig;
  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
    this.options.enableHtml = true;
    this.options.positionClass = 'toast-top-full-width';
    this.options.disableTimeOut = true;
    this.options.closeButton = true;
  }

  public message(title: string, message: string, type: string) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  msgValidate(error: any) {
    let message = '';
    if (error != null) {
      if (error.error.errors) {
        for (const item of error.error.errors) {
          message += item.message + ' <br />';
        }
      }
      this.message(message, error.error.message, 'warning ');
    } else {
      if (error.error) {
        message += error.error + ' <br />';
      }
    }
    this.toastr.show('', message, this.options, 'toast-warning');
  }
}
