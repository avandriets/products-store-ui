import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

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
        { provide: 'environment', useValue: environment },
      ],
    };
  }

}
