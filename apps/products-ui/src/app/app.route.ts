import { Routes } from '@angular/router';
import { UILayoutBodyComponent } from '@products-store-ui/ui';

import { MainErrorContainerComponent, MainLayoutContainerComponent } from './containers';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutContainerComponent,
    children: [
      {
        path: 'error',
        component: UILayoutBodyComponent,
        data: {
          aside: false,
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
        redirectTo: 'products',
      },
      {
        path: 'products',
        loadChildren: async () => import('../../../../libs/products-catalog/src/lib/products-catalog.module').then(m => m.ProductsCatalogModule),
        data: { preload: true },
      },
      {
        path: '**',
        redirectTo: '/',
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
