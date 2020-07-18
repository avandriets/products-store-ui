import { createSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';

export const selectLayoutLeftSidebar = createSelector(fromReducer.selectLayout, state => state.leftSideBar);
export const selectLayoutLeftSidebarIsExpanded = createSelector(selectLayoutLeftSidebar, state => state === 'opened');
export const selectLayoutLeftSidebarIsCollapsed = createSelector(selectLayoutLeftSidebar, state => state === 'closed');
