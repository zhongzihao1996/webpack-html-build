require('../../page/news/news.less');

const $ = require('../../public/js/jq');

const navTabChange = require('../../public/methods/navTabChange');

$(document).ready(() => {

  // 初始化导航栏
  navTabChange($(".top_right_farther"), 'newsCenter', 'li.top_right_farther', 'active');

});
