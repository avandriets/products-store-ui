import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DefaultPluralizer, EntityDefinitionService, Pluralizer } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';

import { entityMetadataMap, pluralNames } from './store';
import { effects } from './store/effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature(effects),
  ],
})
export class ProductsCatalogStoreModule {

  public constructor(
    pluralizer: Pluralizer,
    entityDefinitionService: EntityDefinitionService,
  ) {

    entityDefinitionService.registerMetadataMap(entityMetadataMap);
    (pluralizer as DefaultPluralizer).registerPluralNames(pluralNames);

  }

}
