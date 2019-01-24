import {Config} from '@stencil/core';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import nodeResolve from 'rollup-plugin-node-resolve';

export const config: Config = {
  namespace: 'usertaskcomponent',
  outputTargets: [
    {type: 'dist'},
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
  ],
};
