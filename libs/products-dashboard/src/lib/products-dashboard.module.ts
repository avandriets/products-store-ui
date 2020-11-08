import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsCoreModule } from '@products-store-ui/products-core';
import { UiModule } from '@products-store-ui/ui';

import { DashboardComponent } from './components';
import { routes } from './products-dashboard.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild(routes),

    UiModule,
    ProductsCoreModule,
  ],
  declarations: [DashboardComponent],
})
export class ProductsDashboardModule {
}
