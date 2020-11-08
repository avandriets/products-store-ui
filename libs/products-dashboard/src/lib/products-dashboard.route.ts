import { RoutePathWrapperComponent } from '@products-store-ui/ui';

import { DashboardComponent } from './components';

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
        component: DashboardComponent,
      },
    ],
  },
];
