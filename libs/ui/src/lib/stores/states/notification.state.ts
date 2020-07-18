import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';

import { NotificationActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class UINotificationStateService {

  public constructor(
    private store: Store<any>,
  ) { }

  public success(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.success({
        message,
        options,
      }),
    );

  }

  public error(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.error({
        message,
        options,
      }),
    );

  }

  public primary(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.primary({
        message,
        options,
      }),
    );

  }

  public danger(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.danger({
        message,
        options,
      }),
    );

  }

  public warning(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.warning({
        message,
        options,
      }),
    );

  }

}
