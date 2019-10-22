'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const api = require('./api');
const config = require('../config/index');
const date = require('./calculate/common');

const plugins = [];
class methods {
  //考虑到文件夹太多，有关联的页面可以整理到统一文件夹下
  /*普通页面
   * @param {String} dir: 模板目录
   * @param {String} dirname: 模板文件夹
   * @param {String} pagename: 生成的文件名
   * @param {Object} pagedata: 模板数据
   */
  static Pushpage(dir, dirname, pagename, pagedata) {
    plugins.push(
      new HtmlWebpackPlugin({
        title: `${pagename}`,
        template: `${dir}`,
        filename: `${dirname}/${pagename}.html`,
        inject: 'body',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
        chunks: [`${pagename}`, 'common'],
        data: pagedata,
      })
    );
  }

  /*生成列表页
   * @param {String} dir: 模板目录
   * @param {String} pagename: 模板文件夹
   * @param {Object} pagedata: 模板数据
   * @param {String} id: 生成的文件id
   */
  static Pushpagelist(dir, pagename, pagedata, id) {
    plugins.push(
      new HtmlWebpackPlugin({
        title: `${pagename}`,
        template: `${dir}`,
        filename: `${pagename}/${id}.html`,
        inject: 'body',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
        chunks: [`${pagename}`, 'common'],
        data: pagedata,
      })
    );
  }
}

module.exports = (async () => {
  try {

    const data = require('../mock.json');
    const content = data.content;

    for (let item of content) {
      item.detail = {
        keywords: 'html-多页面生成器',
        title: 'html-多页面生成器',
      };
      switch (item.name) {
        case ('首页'):
          delete require.cache[require.resolve('./calculate/index.js')];
          const calculate_index = require('./calculate/index');
          const data_index = calculate_index(item);
          // console.log(data_index)
          const index_ = config.getentry(path.resolve(__dirname, '../src/page/index/**/*.html'));
          for (const page in index_) {
            methods.Pushpage(`${index_[page]}`, `index`, `${page}`, data_index);
          }
          break;
        case ('新闻'):
          delete require.cache[require.resolve('./calculate/news.js')];
          const calculate_news = require('./calculate/news');
          const data_news = calculate_news(item);
          //新闻中心
          const newsCenter_ = config.getentry(path.resolve(__dirname, '../src/page/newsCenter/*.html'));
          for (const page in newsCenter_) {
            methods.Pushpage(`${newsCenter_[page]}`, `newsCenter`, `${page}`, data_news);
          }
          //新闻列表
          const news_ = config.getentry(path.resolve(__dirname, '../src/page/news/*.html'));
          for (const page in news_) {
            for (let i = 0, len = data_news.article.list.length; i < len; i++) {
              let article_detail = {
                id: data_news.article.list[i]._id,
                detail: data_news.detail,
                article: data_news.article.list[i],
              };
              methods.Pushpagelist(`${news_[page]}`, `${page}`, article_detail, article_detail.id);
            }
          }
          break;
      }
    }

    return plugins
  } catch (e) {
    throw e
  }
})();
