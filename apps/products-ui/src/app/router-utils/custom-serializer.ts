import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { StateRoute } from '@products-store-ui/products-core';

@Injectable()
export class CustomRouterStateSerializer implements RouterStateSerializer<StateRoute> {

  public serialize(routerState: RouterStateSnapshot): StateRoute {

    return {
      url: routerState.url || '/',
      params: this.mergeRouteParams(routerState.root), // recursively add params from all routes
      queryParams: routerState.root.queryParams, // query params are shared by all routes
    };

  }

  private mergeRouteParams(route: ActivatedRouteSnapshot | null): Params {
    if (!route) {
      return { };
    }
    const currentParams = route.params;
    const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;

    return { ...currentParams, ...this.mergeRouteParams(primaryChild) };
  }

}
