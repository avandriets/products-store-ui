import { createAction } from '@ngrx/store';

export const leftSidebarOpened = createAction(
  '[UI] Layout Aside Opened',
);

export const leftSidebarClosed = createAction(
  '[UI] Layout Aside Closed',
);
