import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ApplicationUser } from '@products-store-ui/products-core';

export const load = createAction(
  '[Main] Load',
);

export const loadSuccess = createAction(
  '[Main] Load Success',
  props<{
    user: ApplicationUser;
  }>(),
);

export const loadFailure = createAction(
  '[Main] Load Failure',
  props<{
    err: HttpErrorResponse;
  }>(),
);
