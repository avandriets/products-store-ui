import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { services } from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
})
export class ProductsAuthModule {
  public static forRoot(): ModuleWithProviders<ProductsAuthModule> {

    return {
      ngModule: ProductsAuthModule,
      providers: [

        ...services,
      ],
    };

  }
}
