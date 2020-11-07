import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';
import { ActiveToast } from 'ngx-toastr/toastr/toastr.service';

@Injectable()
export class NotificationService {

  public constructor(
    private readonly toastr: ToastrService,
  ) {
  }

  public show(message: string, title: string, type: string, options: Partial<IndividualConfig> = { }): ActiveToast<any> {

    const params = {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      tapToDismiss: true,
      ...options,
    };

    switch (type) {
      case 'success':
        return this.toastr.success(message, title, params);
      case 'error':
        return this.toastr.error(message, title, params);
      case 'info':
        return this.toastr.info(message, title, params);
      case 'warning':
        return this.toastr.warning(message, title, params);
      default:
        return undefined;
    }

  }

}
