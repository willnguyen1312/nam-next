const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (baseConfig, env, config /* Storybook 4 default config */) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      {
        loader: 'ts-loader',
        options: {
          configFile: require.resolve('../tsconfig.storybook.json'),
        },
      },
      {
        loader: 'react-docgen-typescript-loader',
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
