'use strict';

var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
// var fontFile1 = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/GildataIcon.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes;
// var nodes1 = postcss.parse(fontFile1).nodes;
var classList = [];

// 获取elementUI的icon，值为platform-eleme
// nodes.forEach((node) => {
//   var selector = node.selector || '';
//   var reg = new RegExp(/\.el-icon-([^:]+):before/);
//   var arr = selector.match(reg);
//
//   if (arr && arr[1]) {
//     classList.push(arr[1]);
//   }
// });

// 获取Gildata的icon, 值为Gildata-tick
nodes.forEach((node, index) => {
  var selector = node.selector || '';
  var reg = new RegExp(/\.Gildata-([^:]+):before/);
  var arr = selector.match(reg);
  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});

classList.reverse(); // 希望按 css 文件顺序倒序排列

fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {});
