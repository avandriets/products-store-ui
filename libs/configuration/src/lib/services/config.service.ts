import { Inject, Injectable } from '@angular/core';

import { ENVIRONMENT } from '../tokens';

@Injectable()
export class ConfigService {

  public constructor(
    @Inject(ENVIRONMENT) private environment: any,
  ) { }

  public getEnvironment(): any {
    return this.environment;
  }

}
