import GjDropdownMenu from '../dropdown/src/dropdown-menu';

/* istanbul ignore next */
GjDropdownMenu.install = function(Vue) {
  Vue.component(GjDropdownMenu.name, GjDropdownMenu);
};

export default GjDropdownMenu;
