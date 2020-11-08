import { ErrorPlaceholderComponent } from './error-placeholder/error-placeholder.component';
import { ErrorComponent } from './error/error.component';
import { LeftSidebarDictionariesComponent } from './left-sidebar-dictionaries/left-sidebar-dictionaries.component';
import { LoaderComponent } from './loader-component/loader-component';
import { TopLayoutWrapperComponent } from './main-layout/top-layout-wrapper.component';
import { PageTemplateComponent } from './page-template/page.component';
import { RoutePathWrapperComponent } from './route-path-wrapper/route-path-wrapper.component';
import { StateContainerComponent } from './state-container/state-container.component';
import { TopAppWrapperComponent } from './top-app-wrapper/top-app-wrapper.component';

export const components: any[] = [
  TopAppWrapperComponent,
  TopLayoutWrapperComponent,
  RoutePathWrapperComponent,
  LoaderComponent,
  PageTemplateComponent,
  ErrorPlaceholderComponent,
  ErrorComponent,
  StateContainerComponent,
  LeftSidebarDictionariesComponent,
];

export * from './route-path-wrapper/route-path-wrapper.component';
export * from './main-layout/top-layout-wrapper.component';
export * from './loader-component/loader-component';
export * from './top-app-wrapper/top-app-wrapper.component';
export * from './page-template/page.component';
export * from './error-placeholder/error-placeholder.component';
export * from './state-container/state-container.component';
export * from './error/error.component';
export * from './left-sidebar-dictionaries/left-sidebar-dictionaries.component';
