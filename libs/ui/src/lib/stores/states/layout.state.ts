import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LayoutActions } from '../actions';
import * as fromLayoutSelector from '../selectors/layout.selectors';

@Injectable({
  providedIn: 'root',
})
export class UILayoutStateService {

  /**
   * Constructor.
   */
  public constructor(
    private store: Store<any>,
  ) { }

  /**
   * Expand aside.
   */
  public expandAside(): void {

    this.store.dispatch(
      LayoutActions.asideExpand(),
    );

  }

  /**
   * Collapse aside.
   */
  public collapseAside(): void {

    this.store.dispatch(
      LayoutActions.asideCollapse(),
    );

  }

  /**
   * Determine if aside is expanded.
   */
  public isAsideExpanded$(): Observable<boolean> {

    return this.store.pipe(
      select(fromLayoutSelector.selectLayoutAsideIsExpanded),
    );

  }

  /**
   * Determine if aside is collapsed.
   */
  public isAsideCollapsed$(): Observable<boolean> {

    return this.store.pipe(
      select(fromLayoutSelector.selectLayoutAsideIsCollapsed),
    );

  }

}
