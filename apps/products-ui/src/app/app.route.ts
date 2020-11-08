import { Routes } from '@angular/router';
import { RoutePathWrapperComponent } from '@products-store-ui/ui';

import { MainErrorContainerComponent, MainLayoutContainerComponent } from './containers';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutContainerComponent,
    children: [
      {
        path: 'error',
        component: RoutePathWrapperComponent,
        data: {
          leftSideBar: false,
        },
        children: [
          {
            path: '',
            component: MainErrorContainerComponent,
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'catalog',
      },
      {
        path: 'catalog',
        loadChildren: async () => import('../../../../libs/products-dashboard/src/lib/products-dashboard.module').then(m => m.ProductsDashboardModule),
        data: { preload: true },
      },
      {
        path: 'catalog/dictionaries',
        redirectTo: 'catalog/dictionaries/products',
        pathMatch: 'full',
      },
      {
        path: 'catalog/dictionaries/products',
        loadChildren: async () => import('../../../../libs/products-catalog/src/lib/products-catalog.module').then(m => m.ProductsCatalogModule),
        data: { preload: true },
      },
      {
        path: '**',
        redirectTo: 'catalog',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
