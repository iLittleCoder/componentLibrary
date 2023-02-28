<template>
  <div class="jy-result">
    <div class="jy-result__icon">
      <slot name="icon">
        <jy-icon :name="iconElement"></jy-icon>
<!--        <component :is="iconElement" :class="iconElement" />-->
      </slot>
    </div>
    <div v-if="title || $slots.title" class="jy-result__title">
      <slot name="title">
        <div class="jy-result__title_content">{{ title }}</div>
      </slot>
    </div>
    <div v-if="subTitle || $slots.subTitle" class="jy-result__subtitle">
      <slot name="subTitle">
        <div class="jy-result__subTitle_content">{{ subTitle }}</div>
      </slot>
    </div>
    <div v-if="$slots.extra" class="jy-result__extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script>
import JyIcon from 'GildataDesign/packages/icon';

const IconMap = {
  success: 'Gildata-color-correct1',
  warning: 'Gildata-color-warning1',
  error: 'Gildata-color-error1',
  info: 'Gildata-color-notes1'
};

export default {
  name: 'JyResult',
  components: {
    JyIcon
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
