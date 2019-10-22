const $ = require('../js/jq');
/*
 * @param {Array} arr 选择标签数组
 * @param {String} attr  属性
 * @param {Array} select
 * @param {String} addclass  添加的类
 */

function navTabChange(arr, attr, select, addclass) {
  let list = [];
  for (let i = 0; i < arr.length; i++) {
    list.push(arr[i].getAttribute("data"));
  }
  let index = list.indexOf(attr);
  $(select).eq(index).addClass(addclass).siblings().removeClass(addclass);
}

module.exports = navTabChange;
