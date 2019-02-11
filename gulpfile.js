'use strict';

const gulptraum = require('gulptraum');
const gulptraumTypescriptPlugin = require('gulptraum-typescript');
const tsconfig = require('tsconfig');

const buildSystemConfig = {
  suppressErrorsForTasks: ['lint'],
  copy: {
    "src/templates/*": "dist/commonjs/templates/",
    "src/assets/*": "dist/commonjs/assets/",
    "node_modules/@process-engine/consumer_api_client_bundle/dist/consumer_api_client_bundle.js": "dist/commonjs/assets/"
  },
  conventionalTasks: {
    build: {
      help: 'Builds all source files',
      tasksBefore: ['clean', 'copy']
    },
  }
};

const buildSystem = new gulptraum.BuildSystem(buildSystemConfig);

buildSystem.config = buildSystemConfig;

const tsConfigObj = tsconfig.loadSync('.');

const typeScriptConfig = Object.assign({
  compileToModules: ['commonjs', 'amd']
}, tsConfigObj.config);

const gulp = require('gulp');

buildSystem
  .registerPlugin('typescript', gulptraumTypescriptPlugin, typeScriptConfig)
  .registerTasks(gulp);
