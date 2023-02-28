import Scatter from './src/main';

/* istanbul ignore next */
Scatter.install = function(Vue) {
  Vue.component(Scatter.name, Scatter);
};

export default Scatter;
