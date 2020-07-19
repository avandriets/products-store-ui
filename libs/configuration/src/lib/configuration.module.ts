import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { services } from './services';
import { ENVIRONMENT } from './tokens';

@NgModule({
  imports: [
    CommonModule,
  ],
})
export class ConfigurationModule {

  public static forRoot(environment: any): ModuleWithProviders<ConfigurationModule> {
    return {
      ngModule: ConfigurationModule,
      providers: [
        ...services,
        { provide: ENVIRONMENT, useValue: environment },
      ],
    };
  }

}
