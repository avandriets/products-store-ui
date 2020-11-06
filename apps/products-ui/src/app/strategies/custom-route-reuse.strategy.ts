import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {

  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {

    if (future.routeConfig && future.routeConfig.path === ':accountId') {
      return future.params.accountId === current.params.accountId;
    }

    return future.routeConfig === current.routeConfig;

  }

}
