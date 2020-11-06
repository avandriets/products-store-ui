import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfigService, ConfigurationModule } from '@products-store-ui/configuration';
import { ProductsAuthModule } from '@products-store-ui/products-auth';
import {
  ENTITY_COLLECTION_REDUCER_METHODS_FACTORY_PROVIDER,
  ENTITY_DISPATCHER_DEFAULT_OPTIONS,
  ENTITY_DISPATCHER_FACTORY_PROVIDER,
  ProductsCoreModule,
  dataServiceConfigFactory,
} from '@products-store-ui/products-core';
import { UiModule } from '@products-store-ui/ui';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routes } from './app.route';
import { components } from './components';
import { containers } from './containers';
import { AppCustomPreloader, CustomRouterStateSerializer } from './router-utils';
import { effects } from './stores/effects';
import { states } from './stores/facades';
import { ROOT_REDUCERS } from './stores/reducers';
import { CustomRouteReuseStrategy } from './strategies';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected',
      preloadingStrategy: AppCustomPreloader,
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    StoreModule.forRoot(ROOT_REDUCERS, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      name: 'Product Store DevTools',
      maxAge: 100,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),

    EffectsModule.forRoot(effects),
    EntityDataModule.forRoot({ }),

    ToastrModule.forRoot(),

    ConfigurationModule.forRoot(environment),
    UiModule.forRoot(),
    ProductsAuthModule.forRoot(),
    ProductsCoreModule.forRoot(),
  ],
  declarations: [
    AppComponent,

    ...components,
    ...containers,
  ],
  providers: [

    ENTITY_COLLECTION_REDUCER_METHODS_FACTORY_PROVIDER,
    ENTITY_DISPATCHER_DEFAULT_OPTIONS,
    ENTITY_DISPATCHER_FACTORY_PROVIDER,

    AppCustomPreloader,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },

    { provide: DefaultDataServiceConfig, useFactory: dataServiceConfigFactory, deps: [ConfigService] },

    ...states,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
