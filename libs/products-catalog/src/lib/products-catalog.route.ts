import { Routes } from '@angular/router';
import {
  LeftSidebarDictionariesComponent,
  RoutePathWrapperComponent,
} from '@products-store-ui/ui';

import { ProductDetailsComponent, ProductsListComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: RoutePathWrapperComponent,
    data: {
      leftSideBar: true,
    },
    children: [
      {
        path: '',
        component: LeftSidebarDictionariesComponent,
        outlet: 'leftSideBar',
      },
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
