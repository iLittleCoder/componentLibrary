<script>
import Emitter from 'GildataDesign/src/mixins/emitter';

export default {
  name: 'GjCheckboxGroup',

  componentName: 'GjCheckboxGroup',

  mixins: [Emitter],

  inject: {
    GjFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },

  computed: {
    _elFormItemSize() {
      return (this.GjFormItem || {}).GjFormItemSize;
    },
    checkboxGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  watch: {
    value(value) {
      this.dispatch('GjFormItem', 'el.form.change', [value]);
    }
  }
};
</script>

<template>
  <div class="gj-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
