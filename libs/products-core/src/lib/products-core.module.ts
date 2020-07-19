import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreModule } from '@ngrx/store';
import { ConfigurationModule } from '@products-store-ui/configuration';

import { reducers } from './store/reducers';
import { states } from './store/states';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatRadioModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,

    // Ngrx Store Imports.
    StoreModule.forFeature('products-client', reducers),
    ConfigurationModule,

  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
  ],
})
export class ProductsCoreModule {

  public static forRoot(): ModuleWithProviders<ProductsCoreModule> {

    return {
      ngModule: ProductsCoreModule,
      providers: [

        ...states,
      ],
    };

  }

}
