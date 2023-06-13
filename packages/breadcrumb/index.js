import GjBreadcrumb from './src/breadcrumb';

/* istanbul ignore next */
GjBreadcrumb.install = function(Vue) {
  Vue.component(GjBreadcrumb.name, GjBreadcrumb);
};

export default GjBreadcrumb;
