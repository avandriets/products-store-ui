import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';

import { NotificationActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class UINotificationStateService {

  /**
   * Constructor.
   */
  public constructor(
    private store: Store<any>,
  ) { }

  /**
   * Display a success notification.
   */
  public success(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.success({
        message,
        options,
      }),
    );

  }

  /**
   * Display an error notification.
   */
  public error(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.error({
        message,
        options,
      }),
    );

  }

  /**
   * Display a primary notification.
   */
  public primary(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.primary({
        message,
        options,
      }),
    );

  }

  /**
   * Display a danger notification
   */
  public danger(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.danger({
        message,
        options,
      }),
    );

  }

  /**
   * Display a warning notification.
   */
  public warning(message: string, options: Partial<IndividualConfig> = { }): void {

    this.store.dispatch(
      NotificationActions.warning({
        message,
        options,
      }),
    );

  }

}
