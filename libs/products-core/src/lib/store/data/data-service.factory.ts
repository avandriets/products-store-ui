import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import {
  DefaultDataServiceConfig,
  DefaultDataServiceFactory,
  EntityCollectionDataService,
  HttpUrlGenerator,
} from '@ngrx/data';

import { DataService } from './data.service';

@Injectable()
export class DataServiceFactory extends DefaultDataServiceFactory {
  public constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    @Optional() config?: DefaultDataServiceConfig,
  ) {
    super(http, httpUrlGenerator, config);
  }

  public create<T>(entityName: string): EntityCollectionDataService<T> {
    return new DataService<T>(
      entityName,
      this.http,
      this.httpUrlGenerator,
      this.config,
    );
  }
}
