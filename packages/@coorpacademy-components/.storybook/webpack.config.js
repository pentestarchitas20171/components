const hash = '[folder]_[local]-[hash:base64:5]';
const path = require('path');
const webpack = require('webpack');
const lowerCase = require('lodash/fp/lowerCase');

module.exports = (storybookBaseConfig, configType) => {
  const NODE_ENV = lowerCase(configType);

  storybookBaseConfig.module.rules = [
    {
      test: /\.(ttf|otf|eot|svg|woff)$/,
      loader: 'file-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          [
            'env',
            {
              targets: {
                browsers: ['last 2 versions']
              },
              modules: false,
              loose: true
            }
          ]
        ],
        plugins: ['transform-object-assign']
      },
      exclude: [/node_modules/]
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            modules: true,
            importLoaders: 1,
            localIdentName: `${hash}`
          }
        },
        {
          loader: 'postcss-loader'
        }
      ],
      include: path.join(__dirname, '../src')
    }
  ];

  storybookBaseConfig.plugins = storybookBaseConfig.plugins.filter(
    plugin => !(plugin instanceof webpack.optimize.UglifyJsPlugin)
  );

  return storybookBaseConfig;
};
