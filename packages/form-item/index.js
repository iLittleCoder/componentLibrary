import GjFormItem from '../form/src/form-item';

/* istanbul ignore next */
GjFormItem.install = function(Vue) {
  Vue.component(GjFormItem.name, GjFormItem);
};

export default GjFormItem;
