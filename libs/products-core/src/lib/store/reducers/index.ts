import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUserReducer from './user.reducer';

export interface DatasetState {
  readonly user: fromUserReducer.UserState;
}

export function reducers(state: DatasetState | undefined, action: Action): DatasetState {
  return combineReducers({
    user: fromUserReducer.reducer,
  })(state, action);
}

export const selectSpectrusFeature = createFeatureSelector<DatasetState>('products-client');

export const selectUserState = createSelector(selectSpectrusFeature, state => state.user);
