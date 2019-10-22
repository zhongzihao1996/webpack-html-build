'use strict';
const methods = require('./common');

function calculate(content) {

  // 处理数据
  const data = content;

  data.article.list.forEach(item => {
    item.link = `../news/${item._id}.html`;
  });

  return data;
}


module.exports = calculate;
