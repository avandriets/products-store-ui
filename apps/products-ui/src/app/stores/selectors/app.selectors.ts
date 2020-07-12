import { createSelector } from '@ngrx/store';

import { selectAppState } from '../reducers';

export const selectAppError = createSelector(
  selectAppState,
  state => state.status.err,
);
