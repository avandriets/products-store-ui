import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as store from 'store2';

import { LeftSidebarActions } from '../actions';

@Injectable()
export class LeftSidebarEffects {

  public handleAsideExpand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LeftSidebarActions.leftSidebarOpened,
      ),
      tap(() => {

        store.set('layout-leftSideBar', 'opened');

      }),
    ),
    { dispatch: false },
  );

  public handleAsideCollapse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LeftSidebarActions.leftSidebarClosed,
      ),
      tap(() => {

        store.set('layout-leftSideBar', 'closed');

      }),
    ),
    { dispatch: false },
  );

  public constructor(
    private actions$: Actions,
  ) { }

}
