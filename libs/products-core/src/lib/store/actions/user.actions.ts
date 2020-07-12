import { createAction, props } from '@ngrx/store';
import { ApplicationUser } from '@products-store-ui/products-core';

export const addUser = createAction(
  '[Products Auth] Add User',
  props<{
    user: ApplicationUser;
  }>(),
);

export const setUser = createAction(
  '[Products Auth] Set User',
  props<{
    userId: string;
  }>(),
);
