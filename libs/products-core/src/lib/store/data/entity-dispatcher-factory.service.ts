import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
  CorrelationIdGenerator,
  ENTITY_CACHE_SELECTOR_TOKEN,
  EntityAction,
  EntityActionFactory,
  EntityActionOptions,
  EntityCache,
  EntityCacheSelector,
  EntityCollection,
  EntityDispatcher,
  EntityDispatcherBase,
  EntityDispatcherDefaultOptions,
  EntityDispatcherFactory,
  EntityOp,
  OP_ERROR,
  OP_SUCCESS,
  PersistanceCanceled,
  QueryParams,
  defaultSelectId,
} from '@ngrx/data';
import { IdSelector } from '@ngrx/entity';
import { Action, ScannedActionsSubject, Store } from '@ngrx/store';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { filter, map, mergeMap, shareReplay, take, withLatestFrom } from 'rxjs/operators';

export class ProductsStoreEntityDispatcherBase<T> extends EntityDispatcherBase<T> {

  public constructor(
    entityName: string,
    entityActionFactory: EntityActionFactory,
    store: Store<EntityCache>,
    selectId: IdSelector<T> = defaultSelectId,
    defaultDispatcherOptions: EntityDispatcherDefaultOptions,
    reducedActions$: Observable<Action>,
    entityCacheSelector: EntityCacheSelector,
    correlationIdGenerator: CorrelationIdGenerator,
  ) {
    super(
      entityName,
      entityActionFactory,
      store,
      selectId,
      defaultDispatcherOptions,
      reducedActions$,
      entityCacheSelector,
      correlationIdGenerator,
    );
  }

  public getAll(options?: EntityActionOptions): Observable<T[]> {

    const opts = this['setQueryEntityActionOptions'](options);

    const action = this.createEntityAction(EntityOp.QUERY_ALL, null, opts);

    this.dispatch(action);

    return this.getResponseDataForCollection$<T[]>(opts.correlationId).pipe(
      withLatestFrom(this['entityCollection$'] as Observable<EntityCollection<T>>),
      map(([entities, collection]) =>
        entities.reduce(
          (acc, e) => {
            const entity = collection.entities[this.selectId(e)];
            if (entity) {
              acc.push(entity); // only return an entity found in the collection
            }

            return acc;
          },
          [] as T[],
        ),
      ),
      shareReplay(1),
    );
  }

  public getWithQuery(
    queryParams: QueryParams | string,
    options?: EntityActionOptions,
  ): Observable<T[]> {

    const opts = this['setQueryEntityActionOptions'](options);

    const action = this.createEntityAction(
      EntityOp.QUERY_MANY,
      queryParams,
      opts,
    );

    this.dispatch(action);

    return this.getResponseDataForCollection$<T[]>(opts.correlationId).pipe(
      // Use the returned entity ids to get the entities from the collection
      // as they might be different from the entities returned from the server
      // because of unsaved changes (deletes or updates).
      withLatestFrom(this['entityCollection$'] as Observable<EntityCollection<T>>),
      map(([entities, collection]) =>
        entities.reduce(
          (acc, e) => {
            const entity = collection.entities[this.selectId(e)];
            if (entity) {
              acc.push(entity); // only return an entity found in the collection
            }

            return acc;
          },
          [] as T[],
        ),
      ),
      shareReplay(1),
    );
  }

  protected getResponseDataForCollection$<D = any>(crid: any): Observable<D> {
    /**
     * reducedActions$ must be replay observable of the most recent action reduced by the store.
     * because the response action might have been dispatched to the store
     * before caller had a chance to subscribe.
     */
    return this['reducedActions$'].pipe(
      filter((act: any) => !!act.payload),
      filter((act: EntityAction) => {
        const { correlationId, entityName, entityOp } = act.payload;

        return (
          entityName === this.entityName &&
          correlationId === crid &&
          (entityOp.endsWith(OP_SUCCESS) ||
            entityOp.endsWith(OP_ERROR) ||
            entityOp === EntityOp.CANCEL_PERSIST)
        );

      }),
      take(1),
      mergeMap((act: any) => {
        const { entityOp, data } = act.payload;

        const sanitizedData = this.sanitizeData(data ?? []);

        return entityOp === EntityOp.CANCEL_PERSIST
          ? throwError(new PersistanceCanceled(sanitizedData))
          : entityOp.endsWith(OP_SUCCESS)
            ? of(sanitizedData as D)
            : throwError(act.payload.data.error);
      }),

    );
  }

  private sanitizeData<D = any>(defaultData: D): D {

    if (!Array.isArray(defaultData)) {
      const dataKey = Object.keys(defaultData).find(k => Array.isArray((defaultData as any)[k]));

      if (dataKey) {
        return (defaultData as any)[dataKey];
      }
    }

    return defaultData;

  }

}

/** Creates EntityDispatchers for entity collections */
@Injectable()
export class ProductsStoreEntityDispatcherFactory implements OnDestroy {
  /**
   * Actions scanned by the store after it processed them with reducers.
   * A replay observable of the most recent action reduced by the store.
   */
  public reducedActions$: Observable<Action>;
  private raSubscription: Subscription;

  public constructor(
    private entityActionFactory: EntityActionFactory,
    private store: Store<EntityCache>,
    private entityDispatcherDefaultOptions: EntityDispatcherDefaultOptions,
    @Inject(ScannedActionsSubject) scannedActions$: Observable<Action>,
    @Inject(ENTITY_CACHE_SELECTOR_TOKEN)
    private entityCacheSelector: EntityCacheSelector,
    private correlationIdGenerator: CorrelationIdGenerator,
  ) {
    // Replay because sometimes in tests will fake data service with synchronous observable
    // which makes subscriber miss the dispatched actions.
    // Of course that's a testing mistake. But easy to forget, leading to painful debugging.
    this.reducedActions$ = scannedActions$.pipe(shareReplay(1));
    // Start listening so late subscriber won't miss the most recent action.
    this.raSubscription = this.reducedActions$.subscribe();
  }

  /**
   * Create an `EntityDispatcher` for an entity type `T` and store.
   */
  public create<T>(
    /** Name of the entity type */
    entityName: string,
    /**
     * Function that returns the primary key for an entity `T`.
     * Usually acquired from `EntityDefinition` metadata.
     */
    selectId: IdSelector<T> = defaultSelectId,

    /**
     * Defaults for options that influence dispatcher behavior such as whether
     * `add()` is optimistic or pessimistic;
     */
    defaultOptions: Partial<EntityDispatcherDefaultOptions> = { },
  ): EntityDispatcher<T> {
    // merge w/ defaultOptions with injected defaults
    const options: EntityDispatcherDefaultOptions = {
      ...this.entityDispatcherDefaultOptions,
      ...defaultOptions,
    };

    return new ProductsStoreEntityDispatcherBase<T>(
      entityName,
      this.entityActionFactory,
      this.store,
      selectId,
      options,
      this.reducedActions$,
      this.entityCacheSelector,
      this.correlationIdGenerator,
    );
  }

  public ngOnDestroy(): void {
    this.raSubscription.unsubscribe();
  }
}

export const ENTITY_DISPATCHER_DEFAULT_OPTIONS = {
  provide: EntityDispatcherDefaultOptions,
  useValue: {
    optimisticAdd: false,
    optimisticDelete: false,
    optimisticUpdate: false,
    optimisticUpsert: false,
    optimisticSaveEntities: false,
  },
};

export const ENTITY_DISPATCHER_FACTORY_PROVIDER = {
  provide: EntityDispatcherFactory,
  useClass: ProductsStoreEntityDispatcherFactory,
};
