import JyDropdown from './src/dropdown';

/* istanbul ignore next */
JyDropdown.install = function(Vue) {
  Vue.component(JyDropdown.name, JyDropdown);
};

export default JyDropdown;
