<template>
  <div class="gj-result">
    <div class="gj-result__icon">
      <slot name="icon">
        <gj-icon :name="iconElement"></gj-icon>
<!--        <component :is="iconElement" :class="iconElement" />-->
      </slot>
    </div>
    <div v-if="title || $slots.title" class="gj-result__title">
      <slot name="title">
        <div class="gj-result__title_content">{{ title }}</div>
      </slot>
    </div>
    <div v-if="subTitle || $slots.subTitle" class="gj-result__subtitle">
      <slot name="subTitle">
        <div class="gj-result__subTitle_content">{{ subTitle }}</div>
      </slot>
    </div>
    <div v-if="$slots.extra" class="gj-result__extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script>
import GjIcon from 'GildataDesign/packages/icon';

const IconMap = {
  success: 'Gildata-color-correct1',
  warning: 'Gildata-color-warning1',
  error: 'Gildata-color-error1',
  info: 'Gildata-color-notes1'
};

export default {
  name: 'GjResult',
  components: {
    GjIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    iconElement() {
      const icon = this.icon;
      return icon && IconMap[icon] ? IconMap[icon] : 'icon-info';
    }
  }
};
</script>
