import {Config} from '@stencil/core';

export const config: Config = {
  namespace: 'dynamic-usertask-component',
  srcDir: 'src/components',
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist/commonjs',
      empty: false,
    },
  ],
};
