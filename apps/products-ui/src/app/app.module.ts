import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfigurationModule } from '@products-store-ui/configuration';
import { ProductsAuthModule } from '@products-store-ui/products-auth';
import { ProductsCoreModule } from '@products-store-ui/products-core';
import { UiModule } from '@products-store-ui/ui';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routes } from './app.route';
import { components } from './components';
import { containers } from './containers';
import { effects } from './stores/effects';
import { ROOT_REDUCERS } from './stores/reducers';
import { states } from './stores/states';

@NgModule({
  imports: [
    // Angular Imports.
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected',
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Ngrx Store Imports.
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
    ...states,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
