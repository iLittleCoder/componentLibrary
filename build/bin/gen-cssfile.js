// var fs = require('fs');
// var path = require('path');
// var Components = require('../../components.json');
// var themes = [
//   'theme-chalk'
// ];
// Components = Object.keys(Components);
// var basepath = path.resolve(__dirname, '../../packages/');
//
// function fileExists(filePath) {
//   try {
//     return fs.statSync(filePath).isFile();
//   } catch (err) {
//     return false;
//   }
// }
//
// themes.forEach((theme) => {
//   var isSCSS = theme !== 'theme-default';
//   var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';
//   Components.forEach(function(key) {
//     if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
//     var fileName = key + (isSCSS ? '.scss' : '.css');
//     indexContent += '@import "./' + fileName + '";\n';
//     var filePath = path.resolve(basepath, theme, 'src', fileName);
//     if (!fileExists(filePath)) {
//       fs.writeFileSync(filePath, '', 'utf8');
//       console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
//     }
//   });
//   indexContent += '@import "../../vxe-table-v3/libTable/index.css";\n';
//   fs.writeFileSync(path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent);
// });

/**
 * 用于生成packages/theme-chalk/src/index.scss文件
 * */

var fs = require('fs');
var path = require('path');
var Components = require('../../components.json');
var themes = [
  'theme-chalk'
];
Components = Object.keys(Components);
var basepath = path.resolve(__dirname, '../../packages/');

// 空的css文件
let emptyList = ['breadcrumb-item', 'button-group', 'checkbox-button', 'checkbox-group', 'collapse-item', 'infiniteScroll',
  'dropdown-item', 'dropdown-menu', 'form-item', 'infinite-scroll', 'menu-item', 'menu-item-group', 'submenu', 'tab-pane' ];

Components = Components.filter(item => !emptyList.includes(item));

// 判断指定文件是否存在
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

// 遍历所有组件包，生成引入所有组件包样式的 import 语句，然后自动生成 packages/theme-chalk/src/index.scss|css 文件

themes.forEach((theme) => {
  var isSCSS = theme !== 'theme-default';
  // 去掉base base不需要加前缀 在gulpfile.js单独处理
  var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';
  // var indexContent = '';
  Components.forEach(function(key) {
    // 跳过这几个组件包
    if (['icon', 'GildataIcon', 'option', 'option-group'].indexOf(key) > -1) return;
    var fileName = key + (isSCSS ? '.scss' : '.css');
    indexContent += '@import "./' + fileName + '";\n';
    var filePath = path.resolve(basepath, theme, 'src', fileName);
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
      console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
    }
  });

  indexContent += '@import "../../vxe-table-v3/libTable/index.css";\n';
  fs.writeFileSync(path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent);
});
