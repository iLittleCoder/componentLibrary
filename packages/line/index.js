import Line from './src/main';

/* istanbul ignore next */
Line.install = function(Vue) {
  Vue.component(Line.name, Line);
};

export default Line;
