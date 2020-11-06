import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import { Action, ActionReducerMap } from '@ngrx/store';
import { StateRoute } from '@products-store-ui/products-core';

import * as fromMainReducer from './main.reducer';

export interface State {
  readonly app: fromMainReducer.MainState;
  readonly router: fromRouter.RouterReducerState<StateRoute>;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token', {
  factory: () => ({
    app: fromMainReducer.reducer,
    router: fromRouter.routerReducer,
  }),
});

export const selectAppMain = (state: State) => state.app;
