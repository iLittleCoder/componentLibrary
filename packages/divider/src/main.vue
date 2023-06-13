<template functional>
  <div
    v-bind="data.attrs"
    v-on="listeners"
    :class="[data.staticClass, 'gj-divider', `gj-divider--${props.direction}`, { 'is-text': slots().default }, `gj-divider--${props.type}`]"
  >
    <div
      v-if="slots().default && props.direction !== 'vertical'"
      :class="['gj-divider__text', `is-${props.contentPosition}`]"
     >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GjDivider',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },
    contentPosition: {
      type: String,
      default: 'center',
      validator(val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1;
      }
    },
    type: {
      type: String,
      default: 'solid',
      validator(val) {
        return ['solid', 'dashed'].indexOf(val) !== -1;
      }
    }
  }
};

</script>
