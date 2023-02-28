import Vue from 'vue';
import Element from 'main/index.js';
import App from './play/index.vue';
import 'packages/theme-chalk/src/index.scss';

// 引入白色主题样式
import 'packages/theme-chalk/src/base/White.css';
import 'packages/theme-chalk/src/fonts/iconfont.js';

Vue.use(Element);

new Vue({
  // eslint-disable-line
  render: (h) => h(App)
}).$mount('#app');
