import JyDropdownMenu from '../dropdown/src/dropdown-menu';

/* istanbul ignore next */
JyDropdownMenu.install = function(Vue) {
  Vue.component(JyDropdownMenu.name, JyDropdownMenu);
};

export default JyDropdownMenu;
