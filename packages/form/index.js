import JyForm from './src/form';

/* istanbul ignore next */
JyForm.install = function(Vue) {
  Vue.component(JyForm.name, JyForm);
};

export default JyForm;
