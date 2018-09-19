const withTypescript = require('@zeit/next-typescript');
const withOptimizedImages = require('next-optimized-images');

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

require('dotenv').config();

const addPlugins = config => withTypescript(withOptimizedImages(config));

const additionalConfig = {
  serverRuntimeConfig: {
    serverOnly: process.env.SERVER_ONLY,
  },
  publicRuntimeConfig: {
    serverAndClient: process.env.BOTH,
  },
};

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return addPlugins(Object.assign({}, defaultConfig, additionalConfig));
  }

  return addPlugins(
    Object.assign({}, defaultConfig, additionalConfig, {
      distDir: 'build',
    })
  );
};
