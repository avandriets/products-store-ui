import { createReducer, on } from '@ngrx/store';
import * as store from 'store2';

import { LayoutActions } from '../actions';

export interface LayoutState {
  readonly aside: string;
}

export const layoutInitialState = {
  aside: store.get('layout-aside', 'expanded'),
};

export const reducer = createReducer(
  layoutInitialState,
  on(LayoutActions.asideExpand,
    state => ({
      ...state,
      aside: 'expanded',
    }),
  ),
  on(LayoutActions.asideCollapse,
    state => ({
      ...state,
      aside: 'collapsed',
    }),
  ),
);
