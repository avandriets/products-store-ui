import { DefaultDataServiceConfig } from '@ngrx/data';
import { ConfigService } from '@products-store-ui/configuration';

export const dataServiceConfigFactory = (config: ConfigService): DefaultDataServiceConfig => {

  return {
    root: `${config.getEnvironment().apiURL}/api/v1`,
  };

};
