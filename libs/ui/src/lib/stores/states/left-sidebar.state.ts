import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LeftSidebarActions } from '../actions';
import * as fromLayoutSelector from '../selectors/left-sidebar.selectors';

@Injectable({
  providedIn: 'root',
})
export class UILayoutStateService {

  public constructor(
    private store: Store<any>,
  ) { }

  public expandAside(): void {
    this.store.dispatch(LeftSidebarActions.leftSidebarOpened());
  }

  public collapseAside(): void {
    this.store.dispatch(LeftSidebarActions.leftSidebarClosed());
  }

  public isAsideExpanded$(): Observable<boolean> {
    return this.store.pipe(select(fromLayoutSelector.selectLayoutLeftSidebarIsExpanded));
  }

  public isAsideCollapsed$(): Observable<boolean> {
    return this.store.pipe(select(fromLayoutSelector.selectLayoutLeftSidebarIsCollapsed));
  }

}
