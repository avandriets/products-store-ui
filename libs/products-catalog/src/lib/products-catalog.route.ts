import { Routes } from '@angular/router';
import { RoutePathWrapperComponent } from '@products-store-ui/ui';

import { ProductDetailsComponent, ProductsListComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: RoutePathWrapperComponent,
    data: {
      leftSideBar: false,
    },
    children: [
      {
        path: '',
        component: ProductsListComponent,
      },
      {
        path: ':productId',
        component: ProductDetailsComponent,
      },
    ],
  },
];
