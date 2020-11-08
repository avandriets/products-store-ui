import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsCatalogStoreModule } from '@products-store-ui/products-catalog-store';
import { ProductsCoreModule } from '@products-store-ui/products-core';
import { UiModule } from '@products-store-ui/ui';

import {
  ConfirmDeleteComponent,
  ProductDetailsComponent,
  ProductsListComponent,
} from './components';
import { routes } from './products-catalog.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild(routes),

    ProductsCatalogStoreModule,

    UiModule,
    ProductsCoreModule,

  ],
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ConfirmDeleteComponent,
  ],
})
export class ProductsCatalogModule {
}
