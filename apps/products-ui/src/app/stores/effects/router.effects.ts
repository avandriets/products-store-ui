import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterActions } from '@products-store-ui/products-core';
import { tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {

  public handleNavigateByUrl$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.navigateByUrl),
      tap(({ url, extras }) => {

        this.router.navigateByUrl(url, {
          ...extras,
        });

      }),
    ),
    { dispatch: false },
  );

  public handleNavigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.navigate),
      tap(({ path, query, extras }) => {

        this.router.navigate(path, {
          queryParams: query,
          ...extras,
        });

      }),
    ),
    { dispatch: false },
  );

  public handleBack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.back),
      tap(() => {

        this.location.back();

      }),
    ),
    { dispatch: false },
  );

  public handleForward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.forward),
      tap(() => {

        this.location.forward();

      }),
    ),
    { dispatch: false },
  );

  public constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) { }

}
