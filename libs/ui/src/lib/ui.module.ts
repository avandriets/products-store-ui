import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ProductsCoreModule } from '@products-store-ui/products-core';

import { components } from './components';
import { services } from './services';
import { effects } from './stores/effects';
import { reducers } from './stores/reducers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    LoadingBarHttpClientModule,
    StoreModule.forFeature('ui', reducers),
    EffectsModule.forFeature(effects),

    ProductsCoreModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
  providers: [
    ...services,
  ],
})
export class UiModule {

  public static forRoot(): ModuleWithProviders<UiModule> {

    return {
      ngModule: UiModule,
      providers: [
      ],
    };

  }

}
