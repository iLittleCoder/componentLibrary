import GjDropdown from './src/dropdown';

/* istanbul ignore next */
GjDropdown.install = function(Vue) {
  Vue.component(GjDropdown.name, GjDropdown);
};

export default GjDropdown;
