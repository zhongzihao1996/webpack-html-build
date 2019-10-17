'use strict';
class methods {
  static timechange(time) {
    const d = new Date(time);
    const date = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
    return date;
  }
  static dataChange(arr) {
    let list = {};
    for (let i in arr) {
      list[arr[i].config.name] = arr[i].config.content;
    }
    return list;
  }
  static arcticletimechange(time) {
    const d = new Date(time);
    const date = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + '  ' + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
    return date;
  }
}

module.exports = methods;
