import Pie from './src/main';

/* istanbul ignore next */
Pie.install = function(Vue) {
  Vue.component(Pie.name, Pie);
};

export default Pie;
