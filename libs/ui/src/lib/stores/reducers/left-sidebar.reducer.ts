import { createReducer, on } from '@ngrx/store';
import * as store from 'store2';

import { LeftSidebarActions } from '../actions';

export interface LayoutState {
  readonly leftSideBar: string;
}

export const layoutInitialState = {
  leftSideBar: store.get('layout-leftSideBar', 'opened'),
};

export const reducer = createReducer(
  layoutInitialState,
  on(LeftSidebarActions.leftSidebarOpened,
    state => ({
      ...state,
      leftSideBar: 'opened',
    }),
  ),
  on(LeftSidebarActions.leftSidebarClosed,
    state => ({
      ...state,
      leftSideBar: 'closed',
    }),
  ),
);
