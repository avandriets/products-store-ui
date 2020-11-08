import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { NotificationService } from '../../services';
import { NotificationActions } from '../actions';

@Injectable()
export class NotificationEffects {

  public handleSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NotificationActions.success,
      ),
      tap(({ message, options }) => {

        this.notification.show(message, '', 'success', options );

      }),
    ),
    { dispatch: false },
  );

  public handleError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NotificationActions.error,
      ),
      tap(({ message, options }) => {

        this.notification.show(message, '', 'error', options );

      }),
    ),
    { dispatch: false },
  );

  public handlePrimary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NotificationActions.primary,
      ),
      tap(({ message, options }) => {

        this.notification.show(message, '', 'info', options );

      }),
    ),
    { dispatch: false },
  );

  public handleDanger$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NotificationActions.danger,
      ),
      tap(({ message, options }) => {

        this.notification.show(message, '', 'error', options );

      }),
    ),
    { dispatch: false },
  );

  public handleWarning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NotificationActions.warning,
      ),
      tap(({ message, options }) => {

        this.notification.show(message, '', 'warning', options);

      }),
    ),
    { dispatch: false },
  );

  public constructor(
    private actions$: Actions,
    private notification: NotificationService,
  ) { }

}
