import JyBreadcrumb from './src/breadcrumb';

/* istanbul ignore next */
JyBreadcrumb.install = function(Vue) {
  Vue.component(JyBreadcrumb.name, JyBreadcrumb);
};

export default JyBreadcrumb;
