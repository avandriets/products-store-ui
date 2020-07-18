import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromUserSelectors from '../selectors/user.selectors';

@Injectable()
export class UserStateService {

  public constructor(
    private store: Store<any>,
  ) { }

  public getUser$(): Observable<any>;
  public getUser$(preserve: boolean = true): Observable<any> {

    const user$ = this.store.pipe(
      select(fromUserSelectors.selectCurrentUser),
    );

    if (preserve) {
      return user$.pipe(filter(u => !!u));
    }

    return user$;

  }

}
