import { createSelector } from '@ngrx/store';

import { selectAppMain } from '../reducers';

export const selectMainError = createSelector(
  selectAppMain,
  state => state.status.err,
);
