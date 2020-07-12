import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromUserSelectors from '../selectors/user.selectors';

/**
 * Provides User State Service.
 */
@Injectable()
export class UserStateService {

  /**
   * Constructor.
   */
  public constructor(
    private store: Store<any>,
  ) { }

  /**
   * Get user.
   */
  public getUser$(): Observable<any>;
  public getUser$(preserve: boolean = true): Observable<any> {

    const user$ = this.store.pipe(
      select(fromUserSelectors.selectCurrentUser),
    );

    if (preserve) {
      return user$.pipe(filter(u => {

        return u ? true : false;
      }));
    }

    return user$;

  }

}
