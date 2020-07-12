import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap } from '@ngrx/store';

import * as fromAppReducer from './app.reducer';

/**
 * Provides State.
 */
export interface State {
  readonly app: fromAppReducer.AppState;
}

/**
 * Provides Reducers.
 */
export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    app: fromAppReducer.reducer,
  }),
});

/**
 * Provides Selectors.
 */
export const selectAppState = (state: State) => state.app;
