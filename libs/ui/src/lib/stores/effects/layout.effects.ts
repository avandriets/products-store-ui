import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as store from 'store2';

import { LayoutActions } from '../actions';

/**
 * Provides Layout Effects.
 */
@Injectable()
export class LayoutEffects {

  /**
   * Handle Aside Expand.
   */
  public handleAsideExpand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LayoutActions.asideExpand,
      ),
      tap(() => {

        store.set('layout-aside', 'expanded');

      }),
    ),
    { dispatch: false },
  );

  /**
   * Handle Aside Collapse.
   */
  public handleAsideCollapse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LayoutActions.asideCollapse,
      ),
      tap(() => {

        store.set('layout-aside', 'collapsed');

      }),
    ),
    { dispatch: false },
  );

  /**
   * Constructor.
   */
  public constructor(
    private actions$: Actions,
  ) { }

}
