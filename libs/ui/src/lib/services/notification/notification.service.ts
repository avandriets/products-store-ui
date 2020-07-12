import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';
import { ActiveToast } from 'ngx-toastr/toastr/toastr.service';

@Injectable()
export class UINotificationService {

  /**
   * Constructor.
   */
  public constructor(
    private readonly toastr: ToastrService,
  ) { }

  /**
   * Show notification.
   */
  public show(message: string, title: string, type: string, options: Partial<IndividualConfig> = { }): ActiveToast<any> {

    const params = {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      tapToDismiss: true,
      ...options,
    };

    return this.toastr.show(message, title, params, type);

  }

}
