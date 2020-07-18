import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DefaultPluralizer, EntityDefinitionService, Pluralizer } from '@ngrx/data';

import { entityMetadataMap, pluralNames } from './store';

@NgModule({
  imports: [
    CommonModule,
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
