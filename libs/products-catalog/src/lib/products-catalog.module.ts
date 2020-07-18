import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { UiModule } from '@products-store-ui/ui';

import { ProductDetailsComponent, ProductsListComponent } from './components';
import { routes } from './products-catalog.route';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

    UiModule,
    CoreModule,
  ],
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
  ],
})
export class ProductsCatalogModule {
}
