import { Routes } from '@angular/router';
import { UILayoutBodyComponent } from '@products-store-ui/ui';

import { AppErrorContainerComponent, AppLayoutContainerComponent } from './containers';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutContainerComponent,
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
            component: AppErrorContainerComponent,
          },
        ],
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
