import JyCarouselItem from '../carousel/src/item';

/* istanbul ignore next */
JyCarouselItem.install = function(Vue) {
  Vue.component(JyCarouselItem.name, JyCarouselItem);
};

export default JyCarouselItem;
