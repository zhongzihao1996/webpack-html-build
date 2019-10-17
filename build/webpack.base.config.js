  /* eslint-disable indent */
  const path = require('path');

  const config = require('../config/index');
  const baseentry = path.resolve(__dirname, '../src/entry/**/*.js');

  module.exports = {
    entry: config.getentry(baseentry),
    output: {
      publicPath: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'default' ?
        config.ConfigSetting.build.assetsPublicPath : config.ConfigSetting.dev.assetsPublicPath,
    },
    module: {
      rules: [{
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              // cacheDirectory: true
            },
          },
        },
        {
          test: /\.(png|jpg|gif|ico)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: config.assetsPath('img/[name].[hash:8].[ext]'),
              publicPath: '../'
            },
          }]
        },
        {
          test: /\.(mp4|flv|swf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: config.assetsPath('img/[name].[hash:8].[ext]'),
            },
          }],
        },
        {
          test: /\.(html|ejs)$/,
          loader: 'underscore-template-loader',
          query: {
            engine: 'underscore',
          },
        },
      ],
    },
    plugins: [],
  };
