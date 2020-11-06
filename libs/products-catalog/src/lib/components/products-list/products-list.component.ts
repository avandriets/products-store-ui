import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MergeStrategy } from '@ngrx/data';
import { Product, ProductService } from '@products-store-ui/products-catalog-store';
import {
  Pagination,
  Params,
  RouterStateService,
  SortingDirection,
  SortingParam,
  Status,
  removeFalsyValues,
  replaceFalsyValuesWithNull,
} from '@products-store-ui/products-core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProductFilter } from '../../interfaces';

@Component({
  selector: 'products-store-ui-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  public products$: Observable<Product[]>;
  public status$!: Observable<Status>;

  public sorting$!: Observable<SortingParam>;
  public pagination$!: Observable<Pagination>;
  public filter$!: Observable<ProductFilter>;

  public paginationLimit = 10;
  public paginationLimits = [5, 10, 25, 50];

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly routerState: RouterStateService,
  ) {
  }

  public ngOnInit(): void {

    this.status$ = this.productService.status$;

    this.filter$ = this.getFilter();
    this.sorting$ = this.getSorting();
    this.pagination$ = this.getPagination();

    this.products$ = combineLatest(
      [
        this.productService.serverDataChanged$,
        this.filter$,
        this.sorting$,
        this.pagination$,
      ],
    ).pipe(
      map(([_, filterContent, sorting, pagination]) =>
        removeFalsyValues({
          q: filterContent.name,
          sort_field: sorting.field,
          sort: sorting.direction,
          limit: pagination.limit,
          offset: pagination.offset,
        }),
      ),
      switchMap(params =>
        this.productService.getWithQuery({
          ...params,
        }, { mergeStrategy: MergeStrategy.OverwriteChanges }),
      ),
    );

  }

  private getFilter(): Observable<ProductFilter> {

    return this.routerState.getQueryParam$('name')
      .pipe(
        map(name => ({ name: name || '' })),
      );

  }

  private getSorting(): Observable<SortingParam> {

    return combineLatest(
      [
        this.routerState.getQueryParam$('sort_field'),
        this.routerState.getQueryParam$('sort'),
      ],
    )
      .pipe(
        map(([sort_field, sort]) => {

          const field = sort_field || 'title';
          const direction = <SortingDirection> sort || 'desc';

          return {
            field,
            direction,
          };

        }));

  }

  private getPagination(): Observable<Pagination> {

    return combineLatest([
      this.productService.getTotalCount$(),
      this.routerState.getQueryParam$('offset').pipe(map(qp => +(qp ?? 0))),
      this.routerState.getQueryParam$('limit').pipe(map(qp => +(qp ?? this.paginationLimit))),
    ]).pipe(map(([total, start, rows]) => {

      return {
        index: start / rows,
        offset: start,
        limit: rows,
        count: total,
      };

    }));

  }

  public onFilterUpdate(contentFilter: ProductFilter): void {

    const params = {
      ...contentFilter,
      start: null,
    };

    this.updateParams(params);

  }

  /**
   * On Pagination Update.
   */
  public onPaginationUpdate(pageEvent: { pageIndex: number; pageSize: number; }): void {

    const params = {
      offset: (pageEvent.pageIndex * pageEvent.pageSize) || null,
      limit: pageEvent.pageSize,
    };

    this.updateParams(params);

  }

  public onPaginationLimitUpdate(rows: number): void {

    const params = {
      offset: null,
      limit: rows,
    };

    this.updateParams(params);

  }

  public onSortingClick(sorting: SortingParam, field: string): void {

    const direction =
      sorting.field === field && sorting.direction === 'asc'
        ? 'desc'
        : 'asc';

    const params = {
      sort_field: field,
      sort: direction,
    };

    this.updateParams(params);

  }

  private updateParams(params: Params): void {

    this.routerState.navigate([],
      replaceFalsyValuesWithNull({ ...params }),
      {
        queryParamsHandling: 'merge',
        relativeTo: this.route,
      });

  }

}
