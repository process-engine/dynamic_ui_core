'use strict';

const gulptraum = require('gulptraum');
const gulptraumTypescriptPlugin = require('gulptraum-typescript');
const tsconfig = require('tsconfig');

const buildSystemConfig = {
  suppressErrorsForTasks: ['lint'],
  copy: {
    "src/dynamic_ui/dynamic_ui_core/templates/*": "dist/commonjs/dynamic_ui/dynamic_ui_core/templates/",
    "src/dynamic_ui/dynamic_ui_core/assets/*": "dist/commonjs/dynamic_ui/dynamic_ui_core/assets/",
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
