'use strict';

const {
  DynamicFormBuilder,
  DynamicUIService,
} = require('./dist/commonjs/index');

const { HttpClient } = require('@essential-projects/http');
const { ConsumerApiClientService, ExternalAccessor } = require('@process-engine/consumer_api_client');

function registerInContainer(container) {

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

module.exports.registerInContainer = registerInContainer;
