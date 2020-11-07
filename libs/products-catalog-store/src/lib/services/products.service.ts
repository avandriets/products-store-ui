import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { createSelector, select } from '@ngrx/store';
import { BaseEntityCollectionService } from '@products-store-ui/products-core';
import { Observable, of } from 'rxjs';

import { Product } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseEntityCollectionService<Product> {

  public constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    ) {
    super('Product', serviceElementsFactory);
  }

  public getTotalCount$(): Observable<number> {

    const paginationSelector =
      createSelector(
        this.selectors.selectEntityCache, state => (state.Product as any)?.pagination?.count ?? 0,
      );

    return this.store.pipe(
      select(paginationSelector),
    );
  }

  public createNew(): Observable<Product> {

    const product: Product = {
      id: '',
      title: '',
      description: '',
    };

    this.setLoaded(true);

    return of(product);
  }

}
