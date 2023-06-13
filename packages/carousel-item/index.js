import GjCarouselItem from '../carousel/src/item';

/* istanbul ignore next */
GjCarouselItem.install = function(Vue) {
  Vue.component(GjCarouselItem.name, GjCarouselItem);
};

export default GjCarouselItem;
