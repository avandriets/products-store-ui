import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsCatalogStoreModule } from '@products-store-ui/products-catalog-store';
import { ProductsCoreModule } from '@products-store-ui/products-core';
import { UiModule } from '@products-store-ui/ui';

import { ProductDetailsComponent, ProductsListComponent } from './components';
import { routes } from './products-catalog.route';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

    ProductsCatalogStoreModule,

    UiModule,
    ProductsCoreModule,
  ],
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
  ],
})
export class ProductsCatalogModule {
}
