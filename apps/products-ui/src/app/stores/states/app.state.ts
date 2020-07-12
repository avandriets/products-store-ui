import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserStateService } from '@products-store-ui/products-core';
import { Observable, combineLatest } from 'rxjs';
import { filter, mapTo, take } from 'rxjs/operators';

import { AppActions } from '../actions';
import { selectAppError } from '../selectors';

/**
 * Provides App State Service.
 */
@Injectable()
export class AppStateService {

  public constructor(
    private store: Store<any>,
    private userState: UserStateService,
  ) { }

  public load(): void {

    this.store.dispatch(
      AppActions.load(),
    );

  }

  public ready$(): Observable<boolean> {

    return combineLatest([
      this.userState.getUser$(),
    ]).pipe(
      filter((res: any) => (res[0]) ? true : false),
      take(1),
      mapTo(true),
    );

  }

  public getError$(): Observable<any> {

    return this.store.pipe(select(selectAppError));

  }

}
