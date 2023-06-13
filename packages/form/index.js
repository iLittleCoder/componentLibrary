import GjForm from './src/form';

/* istanbul ignore next */
GjForm.install = function(Vue) {
  Vue.component(GjForm.name, GjForm);
};

export default GjForm;
