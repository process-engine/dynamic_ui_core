import {Config} from '@stencil/core';

export const config: Config = {
  namespace: 'dynamic-usertask-component',
  outputTargets: [
    {
      type: 'dist',
      empty: false,
    },
  ],
};
