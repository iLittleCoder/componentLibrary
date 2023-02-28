import ElOptionCharter from '../select/src/option-charter';

/* istanbul ignore next */
ElOptionCharter.install = function(Vue) {
  Vue.component(ElOptionCharter.name, ElOptionCharter);
};

export default ElOptionCharter;
