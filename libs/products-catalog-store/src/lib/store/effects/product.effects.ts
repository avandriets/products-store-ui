import { Injectable } from '@angular/core';
import {
  EntityAction,
  EntityOp,
  ofEntityOp,
  ofEntityType,
} from '@ngrx/data';
import { Actions, createEffect } from '@ngrx/effects';
import { RouterActions } from '@products-store-ui/products-core';
import { NotificationActions } from '@products-store-ui/ui';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ProductEffects {

  public handleSaveSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityType('Product'),
      ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS, EntityOp.SAVE_UPDATE_ONE_SUCCESS),
      switchMap(action => of(action.payload.data)),
      switchMap(product => ([
        RouterActions.navigate({
          path: ['products', product.id],
          extras: {
            queryParamsHandling: 'merge',
          },
        }),
        NotificationActions.success({
          message: 'Product saved!',
        }),
      ])),
    ),
  );

  public handleDeleteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityType('Product'),
      ofEntityOp(EntityOp.SAVE_DELETE_ONE_SUCCESS),
      switchMap(() => ([
        RouterActions.navigate({
          path: ['products'],
          extras: {
            queryParamsHandling: 'merge',
          },
        }),
        NotificationActions.success({
          message: 'Product deleted!',
        }),
      ])),
    ),
  );

  public constructor(
    private readonly actions$: Actions<EntityAction>,
  ) { }

}
