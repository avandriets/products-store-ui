import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  EntityOp,
  ofEntityOp,
} from '@ngrx/data';
import { Status } from '@products-store-ui/products-core';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Product } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ProductService extends EntityCollectionServiceBase<Product> {

  public constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    ) {
    super('Product', serviceElementsFactory);
  }

  public get status$(): Observable<Status> {
    return combineLatest([
      this.loaded$,
      this.loading$,
      this.errors$.pipe(
        map(errors => errors.payload.data?.error?.error),
        startWith(null),
      ),
    ]).pipe(
      map(([resolved, pending, err]) => ({
        resolved,
        pending,
        rejected: !!err,
        err,
      })),
    );
  }

  /**
   * Get server data changed
   */
  public get serverDataChanged$(): Observable<any> {
    return this.entityActions$.pipe(
      ofEntityOp([
        EntityOp.SAVE_ADD_ONE_SUCCESS,
        EntityOp.SAVE_ADD_MANY_SUCCESS,
        EntityOp.SAVE_UPDATE_ONE_SUCCESS,
        EntityOp.SAVE_UPDATE_MANY_SUCCESS,
        EntityOp.SAVE_DELETE_ONE_SUCCESS,
        EntityOp.SAVE_DELETE_MANY_SUCCESS,
      ]),
      startWith(null),
    );
  }

  // public createNew(): Observable<Product> {
  //
  //   const result: Product = {
  //     id: '',
  //     title: '',
  //     description: '',
  //   };
  //
  //   this.setLoaded(true);
  //
  //   return of(result);
  //
  // }

  // public getWithQuery(queryParams: QueryParams): Observable<Product[]> {
  //
  //   this.clearCache();
  //
  //   return super.getWithQuery(queryParams);
  //
  // }
  //
  // public createOrUpdate(site: Product): void {
  //   this.createAndDispatch(EntityOp.SAVE_ADD_MANY, [site]);
  // }

}
