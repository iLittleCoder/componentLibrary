'use strict';

const {series, src, dest} = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

// 将 base/White.css 和 lib/base.css合并成 最终的 base.css    xujiang： 将vxeTable的样式文件和组件库文件融合编译打包
function compile1() {
  return src(['./src/base/White.css', './lib/base.css'])
    .pipe(concat('base.css'))
    .pipe(dest('./lib'));
}

// 将vxe-table重命名为table.css，作为table表格的样式（解决表格按需引入的问题）
function compile2() {
  return src('../vxe-table-v3/libTable/index.css')
    .pipe(cssmin())
    .pipe(concat('table.css'))
    .pipe(dest('./lib'));
}

// 将 base.css、 index.css、table.css 合并成 最终的 index.css
function compile3() {
  return src(['./lib/base.css', './lib/index.css', './lib/table.css'])
    .pipe(concat('index.css')) // 合并后的文件名, 注意这里不要加cssmin(),会出现button样式丢失的bug
    .pipe(dest('./lib'));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, compile1, compile2, compile3, copyfont);

// const {series, src, dest} = require('gulp');
// const sass = require('gulp-dart-sass');
// const autoprefixer = require('gulp-autoprefixer');
// const cssmin = require('gulp-cssmin');
// const concat = require('gulp-concat');
// const cssWrap = require('gulp-css-wrap');
// const fs = require('fs');

// var Components = require('../../components.json');
// Components = Object.keys(Components);

// // 空的css文件
// let emptyList = ['breadcrumb-item', 'button-group', 'checkbox-button', 'checkbox-group', 'collapse-item', 'infiniteScroll',
//   'dropdown-item', 'dropdown-menu', 'form-item', 'infinite-scroll', 'menu-item', 'menu-item-group', 'submenu', 'tab-pane' ];

// // icon.scss 也不需要加前缀
// emptyList.push('icon');

// Components = Components.filter(item => !emptyList.includes(item));

// // 添加component.json中缺少的几个组件
// Components = [...Components, ...['index', 'popper', 'reset', 'select-dropdown', 'table']];

// console.log(Components, 'THEME_TYPE');

// let theme = process.env.THEME;
// let themeClass = theme === 'White' ? '' : `.${theme}Theme`;

// // 删除var.scss, 重新创建var.scss，将WhiteTheme.scss的内容写入到var.scss
// function init() {
//   fs.unlinkSync('./src/common/var.scss'); // 删除var.scss
//   return src(`./src/common/${theme}Theme.scss`)
//     .pipe(concat('var.scss')) // 合并后的文件名
//     .pipe(dest('./src/common'));
// }

// // 将 scss 编译成 css 并压缩，最后输出到对应主题的目录下
// // 因为这里只处理scss文件，即使index.scss中引入的table.css，但最终生成的index.css中没有table的样式
// // （@import "../../vxe-table-v3/libTable/index.css"）;
// function compile1() {
//   return src('./src/*.scss')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(autoprefixer({
//       overrideBrowserslist: ['ie > 9', 'last 2 versions'],
//       cascade: false
//     }))
//     .pipe(cssmin())
//     .pipe(dest(`./${theme}`));
// }

// // 将vxe-table重命名为table.css，作为table表格的样式（解决表格按需引入的问题）
// function compile2() {
//   return src(`../vxe-table-v3/libTable/${theme}.css`)
//     .pipe(cssmin())
//     .pipe(concat('table.css'))
//     .pipe(dest(`./${theme}`));
// }

// // 将index.css base.css table.css合并
// function compile3() {
//   return src([`./${theme}/index.css`, `./${theme}/base.css`, `./${theme}/table.css`])
//     .pipe(concat(`${theme}.css`)) // 合并后的文件名, 如White.css
//     .pipe(cssmin())
//     .pipe(dest(`./${theme}`))
//     .pipe(dest('./lib')); // 将White/White.css 或 Black/Black.css copy到lib目录下
// }

// // 将base.css、icon.css copy到lib目录中
// function compile4() {
//   return src([`./${theme}/base.css`, `./${theme}/icon.css`])
//     .pipe(dest('./lib'));
// }

// // 批量为css文件扩展命名空间 添加.WhiteTheme前缀
// function compile5() {
//   // 排除不需要加扩展名的文件
//   return src([`./${theme}/*.css`, '!base.css', '!icon.css'])
//     .pipe(cssWrap({
//       selector: themeClass /* 添加的命名空间 */
//     }))
//     .pipe(cssmin())
//     .pipe(dest(`./${theme}`));
// }

// /**
//  * 删除文件夹下所有文件及将文件夹下所有文件清空
//  * @param {*} path
//  */
// function deleteFolder(path) {
//   let files = [];
//   if (fs.existsSync(path)) {
//     files = fs.readdirSync(path);
//     files.forEach(file => {
//       let curPath = `${path}/${file}`;
//       if (fs.statSync(curPath).isDirectory()) {
//         deleteFolder(curPath);
//       } else {
//         fs.unlinkSync(curPath);
//       }
//     });
//     fs.rmdirSync(path);
//   }
// }

// // 拷贝 ./src/fonts 到 ./lib/fonts
// function copyfont() {
//   // 删除White 和 Black文件夹
//   deleteFolder('./White');
//   deleteFolder('./Black');

//   return src('./src/fonts/**')
//     .pipe(cssmin())
//     .pipe(dest('./lib/fonts'));
// }

// function compile(path) {
//   return src([`./White/${path}.css`, `./Black/${path}.css`])
//     .pipe(concat(`${path}.css`)) // 合并后的文件名
//     .pipe(dest('./lib'));
// }

// function compileIndex() {
//   return src(['./White/White.css', './Black/Black.css'])
//     .pipe(concat('index.css')) // 合并后的文件名
//     .pipe(dest('./lib'));
// }

// let concatList = Components.map(item => () => {
//   return compile(item);
// });

// let gulpTask = theme ? [init, compile1, compile2, compile3, compile4, compile5] : [...concatList, compileIndex, copyfont];
// exports.build = series(...gulpTask);
