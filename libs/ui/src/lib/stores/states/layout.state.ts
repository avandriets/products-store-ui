import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LayoutActions } from '../actions';
import * as fromLayoutSelector from '../selectors/layout.selectors';

@Injectable({
  providedIn: 'root',
})
export class UILayoutStateService {

  public constructor(
    private store: Store<any>,
  ) { }

  public expandAside(): void {
    this.store.dispatch(LayoutActions.asideExpand());
  }

  public collapseAside(): void {
    this.store.dispatch(LayoutActions.asideCollapse());
  }

  public isAsideExpanded$(): Observable<boolean> {
    return this.store.pipe(select(fromLayoutSelector.selectLayoutAsideIsExpanded));
  }

  public isAsideCollapsed$(): Observable<boolean> {
    return this.store.pipe(select(fromLayoutSelector.selectLayoutAsideIsCollapsed));
  }

}
