/* eslint-disable strict */
'use strict';
process.env.NODE_ENV = 'development';
const merge = require('webpack-merge');
const ora = require('ora');
const spinner = ora('The service is being started......\n');
const chalk = require('chalk');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const config = require('../config/index');

module.exports = async () => {
  spinner.start();
  //开发环境的基本配置
  const devconfig = {
    mode: 'development',
    devtool: '#source-map',
    devServer: {
      contentBase: false,
      publicPath: config.ConfigSetting.dev.assetsPublicPath,
      historyApiFallback: true,
      inline: true,
      hot: true,
      compress: true,
      open: config.ConfigSetting.dev.autoOpenBrowser,
      host: config.ConfigSetting.dev.host,
      port: config.ConfigSetting.dev.port,
      quiet: true,
    },
    module: {
      rules: [{
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'less-loader',
        ],
      }],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };
  try {
    //清除缓存
    delete require.cache[require.resolve('./webpack.extend.config')];
    delete require.cache[require.resolve('./webpack.base.config')];
    const basewebpackconfig = await require('./webpack.base.config');
    const plugins = await require('./webpack.extend.config');
    // console.log(plugins)
    let result = function () {
      for (let plugin of plugins) {
        devconfig.plugins.push(plugin)
      }
      devconfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`点击打开:http://${ config.ConfigSetting.dev.host}:${ config.ConfigSetting.dev.port}`],
        },
      }))
      return devconfig;
    }
    const obj = await merge(basewebpackconfig, result());
    return obj;
  } catch (e) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>');
    console.log(chalk.red(`${e}`));
    console.log('>>>>>>>>>>>>>>>>>>>>>>');
    throw e
  } finally {
    spinner.stop();
  }
};
