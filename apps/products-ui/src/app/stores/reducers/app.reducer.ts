import { createReducer, on } from '@ngrx/store';
import { Status } from '@products-store-ui/products-core';

import { AppActions } from '../actions';

/**
 * Provides App State Interface.
 */
export interface AppState {
  readonly status: Status;
}

/**
 * Provides App State Initial State.
 */
export const initialState: AppState = {
  status: {
    resolved: false,
    rejected: false,
    pending: false,
    err: null,
  },
};

/**
 * Provides App Reducer.
 */
export const reducer = createReducer(
  initialState,
  on(AppActions.load,
    state => ({
      ...state,
      status: {
        ...state.status,
        pending: true,
      },
    }),
  ),
  on(AppActions.loadSuccess,
    state => ({
      ...state,
      status: {
        resolved: true,
        rejected: false,
        pending: false,
        err: null,
      },
    }),
  ),
  on(AppActions.loadFailure,
    (state, { err }) => ({
      ...state,
      status: {
        resolved: false,
        rejected: true,
        pending: false,
        err,
      },
    }),
  ),
);
