<template>
  <section class="config" :key="displayName">
    <div class="config-label">
      <jy-tooltip :content="displayName" placement="top">
        <span>{{displayKeyName}}</span>
      </jy-tooltip>
    </div>
    <div class="config-content">
      <jy-select
        v-model="value" 
        class="select"
        size="medium"
        @change="onSelectChange"
      >
        <jy-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </jy-option>
      </jy-select>
    </div>
  </section>
</template>

<style>
.select {
  width: 100%;
}
</style>

<script>
const defaultFontLineHeight = [
  '1',
  '1.3',
  '1.5',
  '1.7',
  '12px',
  '16px',
  '20px',
  '24px',
  '28px'
];
import Mixin from './mixin';
import { getStyleDisplayName } from '../utils/utils.js';

export default {
  props: {
    componentName: {
      type: String
    },
    golbalValue: {
      type: Object
    }
  },
  data() {
    return {
      options: [],
      value: ''
    };
  },
  mixins: [Mixin],
  computed: {
    isGlobalInputValue() {
      return this.config.value.startsWith('$');
    }
  },
  methods: {
    onSelectChange(e) {
      this.onChange(e);
    },
    initSelectOption() {
      this.options = [];
      defaultFontLineHeight.forEach((size) => {
        this.options.push({
          value: size,
          label: size
        });
      });
      const golbalTypography = this.golbalValue.typography;
      if (this.isGlobalInputValue && golbalTypography) {
        Object.keys(golbalTypography).forEach((font) => {
          if (font.includes('font-line-height')) {
            const size = golbalTypography[font];
            this.options.push({
              value: size.key,
              label: getStyleDisplayName(size)
            });
          }
        });
      }
    }
  },
  watch: {
    'mergedValue': {
      immediate: true,
      handler(value) {
        this.initSelectOption();
        this.value = this.mergedValue;
      }
    }
  }
};
</script>
