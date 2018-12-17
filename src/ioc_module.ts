import {Container} from 'addict-ioc';

import {HttpClient} from '@essential-projects/http';
import {ConsumerApiClientService, ExternalAccessor} from '@process-engine/consumer_api_client';

import {
  DynamicFormBuilder,
  DynamicUIService,
} from '.';

export function registerInContainer(container: Container): void {

  container.register('ConsumerApiHttpClient', HttpClient)
    .configure('consumer_api:external_accessor');

  container.register('ConsumerApiExternalAccessor', ExternalAccessor)
    .dependencies('ConsumerApiHttpClient')
    .configure('consumer_api:external_accessor')
    .singleton();

  container.register('ConsumerApiClientService', ConsumerApiClientService)
    .dependencies('ConsumerApiExternalAccessor');

  container.register('DynamicFormBuilder', DynamicFormBuilder);

  container.register('DynamicUIService', DynamicUIService)
    .dependencies('ConsumerApiClientService', 'DynamicFormBuilder');
}
