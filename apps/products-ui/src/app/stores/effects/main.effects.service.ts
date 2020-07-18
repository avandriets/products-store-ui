import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthService } from '@products-store-ui/products-auth';
import { ApplicationUser, UserActions } from '@products-store-ui/products-core';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AppActions } from '../actions';

@Injectable()
export class MainEffects {

  public handleBoot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AppActions.load,
      ),
      switchMap(() => {

        return this.auth.getUser().pipe(
          switchMap(user => {

            let actions: Action[];

            if (user) {

              const appUser: ApplicationUser = {
                id: user.profile.sub,
                email: user.profile.email || '',
                name: `${user.profile.family_name || ''} ${user.profile.given_name || ''}`,
              };

              actions = [
                UserActions.addUser({ user: appUser }),
                AppActions.loadSuccess({ user: appUser }),
              ];

            } else {

              const emptyUser: ApplicationUser = {
                id: 'anonymous',
                name: null,
                email: null,
                anonymous: true,
              };

              actions = [
                UserActions.addUser({ user: emptyUser }),
                AppActions.loadSuccess({ user: emptyUser }),
              ];

            }

            return actions;

          }),
          catchError(err => {
            return of(
              AppActions.loadFailure({ err }),
            );
          }),
        );

      }),
    ));

  public handleBootSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AppActions.loadSuccess,
      ),
      switchMap(({ user }) => {

        return [
          UserActions.setUser({ userId: user.id }),
        ];

      }),
    ),
  );

  public constructor(
    private actions$: Actions,
    private auth: AuthService,
  ) { }

}
