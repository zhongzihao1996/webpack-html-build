/* eslint-disable linebreak-style */
'use strict';
const path = require('path');
const config = require('../config/index');
const glob = require('glob');

const ConfigSetting = {
    dev: {
        // 线上的根目录
        assetsPublicPath: '/',

        assetsSubDirectory: 'static/',

        autoOpenBrowser: false,

        notifyOnErrors: true,

        // 主机、端口号
        host: 'localhost',
        port: 8080,
    },

    build: {
        // 打包后的路径
        assetsRoot: path.resolve(__dirname, '../../../dist'),

        // 打包output的publicPath
        assetsPublicPath: '../',

        // 静态资源目录
        assetsSubDirectory: '',

        productionSourceMap: true,

    },
};


exports.ConfigSetting = ConfigSetting;
exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' || 'default' ?
        config.ConfigSetting.build.assetsSubDirectory :
        config.ConfigSetting.dev.assetsSubDirectory;
    const p = `${assetsSubDirectory}${_path}`;
    return p;
};

exports.getentry = filepath => {
    const entries = {};
    try {
        glob.sync(filepath).forEach(file => {
            const basename = path.basename(file, path.extname(file));
            entries[basename] = file;
        });
    } catch (e) {
        console.log(e);
        throw e
    }
    // console.log(entries)
    return entries;
};
