import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { ApplicationUser } from '../../interfaces';
import { UserActions } from '../actions';

export const adapter: EntityAdapter<ApplicationUser> = createEntityAdapter<ApplicationUser>({
  selectId: a => a.id,
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});

export interface UserState extends EntityState<ApplicationUser> {
  selectedUserId: string | null;
}

export const initialState: UserState = adapter.getInitialState({
  selectedUserId: null,
});

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

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectUsers = selectAll;
export const selectUserEntities = selectEntities;
