import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MergeStrategy } from '@ngrx/data';
import { Product, ProductService } from '@products-store-ui/products-catalog-store';
import {
  MessagingService,
  Pagination,
  Params,
  RouterStateService,
  SortingDirection,
  SortingParam,
  Status,
  removeFalsyValues,
  replaceFalsyValuesWithNull,
} from '@products-store-ui/products-core';
import isEqualWith from 'lodash.isequalwith';
import { Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { ProductFilter } from '../../interfaces';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'products-store-ui-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  @ViewChild(MatSort) public sort: MatSort;

  public products$: Observable<Product[]>;
  public status$!: Observable<Status>;

  public sorting$!: Observable<SortingParam>;
  public pagination$!: Observable<Pagination>;
  public filter$!: Observable<ProductFilter>;

  public paginationLimit = 5;
  public paginationLimits = [5, 10, 25, 50];

  public displayedColumns: string[] = ['title', 'description', '_id'];

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly routerState: RouterStateService,
    private readonly dialog: MatDialog,
    private readonly messagingService: MessagingService,
  ) {
  }

  public ngOnInit(): void {

    this.messagingService.getNewMessage('serverEvent').subscribe(
      data => {
        console.log('### message from server ###:', data);
      });

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
      distinctUntilChanged(isEqualWith),
      map(([_, filterContent, sorting, pagination]) =>
        removeFalsyValues({
          q: filterContent.title,
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

  public onFilterUpdate(contentFilter: ProductFilter): void {

    const params = {
      ...contentFilter,
      start: null,
    };

    this.updateParams(params);

  }

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

  public onSortingClick(event: Sort): void {

    const { active, direction } = event;

    const params = {
      sort_field: direction ? active : null,
      sort: direction ?? null,
    };

    this.updateParams(params);

  }

  public pageChangeEvent(event: PageEvent): void {

    if (event.previousPageIndex === event.pageIndex) {
      this.onPaginationLimitUpdate(event.pageSize);
    } else {
      this.onPaginationUpdate({ pageSize: event.pageSize, pageIndex: event.pageIndex });
    }

  }

  public getTotalCount(): Observable<number> {
    return this.productService.getTotalCount$();
  }

  public onDelete(product: Product): void {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: { product },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(product);
      }
    });

  }

  private updateParams(params: Params): void {

    this.routerState.navigate([],
      replaceFalsyValuesWithNull({ ...params }),
      {
        queryParamsHandling: 'merge',
        relativeTo: this.route,
      });

  }

  private getPagination(): Observable<Pagination> {

    return this.routerState.getQueryParams$().pipe(
      map(queryParams => {

        const offset = +(queryParams.offset ?? 0);
        const limit = +(queryParams.limit ?? this.paginationLimit);

        return {
          index: offset / limit,
          offset,
          limit,
        };

      }));

  }

  private getFilter(): Observable<ProductFilter> {

    return this.routerState.getQueryParam$('name')
      .pipe(
        map(name => ({ title: name || '' })),
      );

  }

  private getSorting(): Observable<SortingParam> {

    return this.routerState.getQueryParams$()
      .pipe(
        map(queryParams => {

          const field = queryParams.sort_field ?? 'title';
          const direction = <SortingDirection> queryParams.sort ?? 'desc';

          return { field, direction };

        }));

  }

}
