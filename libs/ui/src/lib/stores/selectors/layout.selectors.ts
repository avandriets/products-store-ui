import { createSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';

export const selectLayoutAside = createSelector(fromReducer.selectLayout, state => state.aside);
export const selectLayoutAsideIsExpanded = createSelector(selectLayoutAside, state => state === 'expanded');
export const selectLayoutAsideIsCollapsed = createSelector(selectLayoutAside, state => state === 'collapsed');
