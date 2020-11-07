import { HttpClient } from '@angular/common/http';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  HttpUrlGenerator,
} from '@ngrx/data';

export class DataService<T> extends DefaultDataService<T> {

  public constructor(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    config?: DefaultDataServiceConfig,
  ) {
    super(entityName, http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl;
  }

}
