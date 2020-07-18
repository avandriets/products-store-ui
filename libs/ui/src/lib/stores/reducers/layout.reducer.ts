import { createReducer, on } from '@ngrx/store';
import * as store from 'store2';

import { LayoutActions } from '../actions';

export interface LayoutState {
  readonly leftSideBar: string;
}

export const layoutInitialState = {
  leftSideBar: store.get('layout-leftSideBar', 'expanded'),
};

export const reducer = createReducer(
  layoutInitialState,
  on(LayoutActions.asideExpand,
    state => ({
      ...state,
      leftSideBar: 'expanded',
    }),
  ),
  on(LayoutActions.asideCollapse,
    state => ({
      ...state,
      leftSideBar: 'collapsed',
    }),
  ),
);
