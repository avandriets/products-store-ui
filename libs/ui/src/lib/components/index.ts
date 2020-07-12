import { ErrorAlertComponent } from './error-alert-component/error-alert-component.component';
import { UILayoutBodyComponent } from './layout-body/layout-body.component';
import { UILayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader-component/loader-component';
import { UiContainerComponent } from './ui-container/ui-container.component';

export const components: any[] = [
  UiContainerComponent,
  UILayoutComponent,
  UILayoutBodyComponent,
  LoaderComponent,
  ErrorAlertComponent,
];

export * from './layout-body/layout-body.component';
export * from './layout/layout.component';
export * from './loader-component/loader-component';
export * from './ui-container/ui-container.component';
export * from './error-alert-component/error-alert-component.component';
