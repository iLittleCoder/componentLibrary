import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import Element from '../src/index.js';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import title from './i18n/title';

import 'packages/theme-chalk/src/index.scss';

import 'packages/theme-chalk/src/fonts/iconfont.js';
import './demo-styles/index.scss';
import './assets/styles/common.scss';
import './assets/styles/fonts/style.css';
import icon from './icon.json';
import Bus from './bus';
// import jymonitor from 'jy-monitor';
// Vue.prototype.$handReport = jymonitor.handReport;
// Vue.use(jymonitor, {
//   monitorUrl: 'http://10.106.0.138:8083/webLogs/logstorage/common/handleLogEvent/Communal_MONITOR_LOGSC', // 上报地址
//   appId: 'gildataDesign'
// });

window.Bus = Bus;
Vue.use(Element);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);
const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => globalEle.$data.$isEle,
      set: (data) => {
        globalEle.$data.$isEle = data;
      }
    }
  }
});

Vue.prototype.$elIcon = icon.filter((item) => !item.includes('Gildata')); // elementUIIcon 列表页用
Vue.prototype.$GlIcon = icon.filter((item) => !item.includes('color')); // 聚源灰色图标列表
Vue.prototype.$GlColorIcon = icon.filter((item) => item.includes('color')); // 聚源彩色图标列表

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach((route) => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Element';
  ga('send', 'event', 'PageView', route.name);
});

// 增加换肤功能
// document.body.classList.add('BlackTheme');
localStorage.setItem('theme', 'White');

new Vue({
  // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
