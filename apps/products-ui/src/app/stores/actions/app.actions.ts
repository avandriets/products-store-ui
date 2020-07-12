import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ApplicationUser } from '@products-store-ui/products-core';

export const load = createAction(
  '[App] Load',
);

export const loadSuccess = createAction(
  '[App] Load Success',
  props<{
    user: ApplicationUser;
  }>(),
);

export const loadFailure = createAction(
  '[App] Load Failure',
  props<{
    err: HttpErrorResponse;
  }>(),
);
