import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap } from '@ngrx/store';

import * as fromMainReducer from './main.reducer';

export interface State {
  readonly app: fromMainReducer.MainState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token', {
  factory: () => ({
    app: fromMainReducer.reducer,
  }),
});

export const selectAppMain = (state: State) => state.app;
