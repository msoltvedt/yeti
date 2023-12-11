import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'yeti',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    /*{
      type: 'dist-custom-elements',
    },*/
    {
      type: 'www',
      buildDir: 'examples/yeti',
      empty: false,
      serviceWorker: null, // disable service workers
    },
  ],
  extras: {
    experimentalSlotFixes: true
  }
};