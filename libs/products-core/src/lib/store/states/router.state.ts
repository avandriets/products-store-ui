import { Injectable } from '@angular/core';
import { NavigationExtras, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RouterActions } from '../actions';
import {
  selectRouteParam,
  selectRouteParams,
  selectRouteQueryParam,
  selectRouteQueryParams,
} from '../selectors';

@Injectable()
export class RouterStateService {

  public constructor(
    private store: Store<any>,
  ) { }

  public getParam$(paramName: string): Observable<string> {
    return this.store.pipe(select(selectRouteParam, { paramName }));
  }

  public getParams$(): Observable<Params> {
    return this.store.pipe(select(selectRouteParams));
  }

  public getQueryParam$(queryParamName: string): Observable<any> {
    return this.store.pipe(select(selectRouteQueryParam, { queryParamName }));
  }

  public getQueryParams$(): Observable<Params> {
    return this.store.pipe(select(selectRouteQueryParams));
  }

  public navigate(path: any[], query?: Params, extras?: NavigationExtras): void {
    this.store.dispatch(RouterActions.navigate({ path, query, extras }));

  }

  public navigateByUrl(url: string, extras?: NavigationExtras): void {
    this.store.dispatch(RouterActions.navigateByUrl({ url, extras }));
  }

}
