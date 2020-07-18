import { ErrorPlaceholderComponent } from './error-placeholder-component/error-alert-component.component';
import { ErrorComponent } from './error/error.component';
import { UILayoutBodyComponent } from './layout-body/layout-body.component';
import { UILayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader-component/loader-component';
import { UiAppWrapperComponent } from './ui-app-wrapper/ui-app-wrapper.component';

export const components: any[] = [
  UiAppWrapperComponent,
  UILayoutComponent,
  UILayoutBodyComponent,
  LoaderComponent,
  ErrorPlaceholderComponent,
  ErrorComponent,
];

export * from './layout-body/layout-body.component';
export * from './layout/layout.component';
export * from './loader-component/loader-component';
export * from './ui-app-wrapper/ui-app-wrapper.component';
export * from './error-placeholder-component/error-alert-component.component';
export * from './error/error.component';
