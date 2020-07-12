import { createSelector } from '@ngrx/store';

import { selectUserState } from '../reducers';
import * as fromUserSelector from '../reducers/user.reducer';

export const selectUserEntities = createSelector(
  selectUserState,
  fromUserSelector.selectUserEntities,
);

export const selectCurrentUserId = createSelector(
  selectUserState,
  state => state.selectedUserId,
);

export const selectCurrentUser = createSelector(
  selectCurrentUserId,
  selectUserEntities,
  (id, e) => id && e[id] ? e[id] : null,
);
