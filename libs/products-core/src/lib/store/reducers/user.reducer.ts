import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { ApplicationUser } from '../../interfaces';
import { UserActions } from '../actions';

/**
 * Provides User Adapter.
 */
export const adapter: EntityAdapter<ApplicationUser> = createEntityAdapter<ApplicationUser>({
  selectId: a => a.id,
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});

/**
 * Provides User State.
 */
export interface UserState extends EntityState<ApplicationUser> {
  selectedUserId: string | null;
}

/**
 * Provides User Initial State.
 */
export const initialState: UserState = adapter.getInitialState({
  selectedUserId: null,
});

/**
 * Provides User Reducer.
 */
export const reducer = createReducer(
  initialState,
  on(UserActions.addUser,
    (state, { user }) => {
      return adapter.upsertOne(user, state);
    },
  ),
  on(UserActions.setUser,
    (state, { userId }) => ({
      ...state,
      selectedUserId: userId,
    }),
  ),
);

/**
 * Provides User Selectors.
 */
const { selectAll, selectEntities } = adapter.getSelectors();

export const selectUsers = selectAll;
export const selectUserEntities = selectEntities;
