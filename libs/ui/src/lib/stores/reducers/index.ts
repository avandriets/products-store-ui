import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromLayout from './left-sidebar.reducer';

export interface State {
  readonly layout: fromLayout.LayoutState;
}

export function reducers(state: State | undefined, action: Action): State {
  return combineReducers({
    layout: fromLayout.reducer,
  })(state, action);
}

export const selectFeature = createFeatureSelector<State>('ui');
export const selectLayout = createSelector(selectFeature, state => state.layout);
