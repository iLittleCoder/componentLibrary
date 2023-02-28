<script>
import Emitter from 'GildataDesign/src/mixins/emitter';

export default {
  name: 'JyCheckboxGroup',

  componentName: 'JyCheckboxGroup',

  mixins: [Emitter],

  inject: {
    jyFormItem: {
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
      return (this.jyFormItem || {}).jyFormItemSize;
    },
    checkboxGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  watch: {
    value(value) {
      this.dispatch('JyFormItem', 'el.form.change', [value]);
    }
  }
};
</script>

<template>
  <div class="jy-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
