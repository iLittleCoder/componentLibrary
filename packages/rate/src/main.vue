<template>
  <div
    class="jy-rate"
    @keydown="handleKey"
    role="slider"
    :aria-valuenow="currentValue"
    :aria-valuetext="text"
    aria-valuemin="0"
    :aria-valuemax="max"
    tabindex="0"
  >
    <span
      v-for="(item, key) in max"
      class="jy-rate__item"
      @mousemove="setCurrentValue(item, $event)"
      @mouseleave="resetCurrentValue"
      @click="selectValue(item)"
      :style="{ cursor: rateDisabled ? 'auto' : 'pointer' }"
      :key="key"
    >
      <i :class="[classes[item - 1], { hover: hoverIndex === item }]" class="jy-rate__icon" :style="getIconStyle(item)">
        <i v-if="showDecimalIcon(item)" :class="decimalIconClass" :style="decimalStyle" class="jy-rate__decimal"> </i>
      </i>
    </span>
    <span v-if="showText || showScore" class="jy-rate__text" :style="{ color: textColor }">{{ text }}</span>
  </div>
</template>

<script>
import { hasClass } from 'GildataDesign/src/utils/dom';
import { isObject } from 'GildataDesign/src/utils/types';
import JyIcon from 'GildataDesign/packages/icon';

import Migrating from 'GildataDesign/src/mixins/migrating';

export default {
  name: 'JyRate',
  components: {
    JyIcon
  },
  mixins: [Migrating],

  inject: {
    jyForm: {
      default: ''
    }
  },

  data() {
    return {
      pointerAtLeftHalf: true,
      currentValue: this.value,
      hoverIndex: -1
    };
  },

  props: {
    value: {
      type: Number,
      default: 0
    },
    lowThreshold: {
      type: Number,
      default: 2
    },
    highThreshold: {
      type: Number,
      default: 4
    },
    max: {
      type: Number,
      default: 5
    },
    colors: {
      type: [Array, Object],
      default() {
        return ['#FFAA0E', '#FFAA0E', '#FFAA0E'];
      }
    },
    voidColor: {
      type: String,
      default: ''
    },
    // #EFF2F7
    disabledVoidColor: {
      type: String,
      default: ''
    },
    iconClasses: {
      type: [Array, Object],
      default() {
        return ['Gildata-star3', 'Gildata-star3', 'Gildata-star3'];
      }
    },
    voidIconClass: {
      type: String,
      default: 'Gildata-star3'
    },
    disabledVoidIconClass: {
      type: String,
      default: 'Gildata-star3'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    showScore: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: '#202020'
    },
    texts: {
      type: Array,
      default() {
        return ['极差', '失望', '一般', '满意', '惊喜'];
      }
    },
    scoreTemplate: {
      type: String,
      default: '{value}'
    },
    iconHalfClass: {
      type: String,
      default: 'Gildata-star4'
    },
    iconHalfColor: {
      type: String,
      default: 'var(--table-border-color)'
    }
  },

  computed: {
    text() {
      let result = '';
      if (this.showScore) {
        result = this.scoreTemplate.replace(/\{\s*value\s*\}/, this.rateDisabled ? this.value : this.currentValue);
      } else if (this.showText) {
        result = this.texts[Math.ceil(this.currentValue) - 1];
      }
      return result;
    },

    decimalStyle() {
      let width = '';
      if (this.rateDisabled) {
        width = `${this.valueDecimal}%`;
      } else if (this.allowHalf) {
        width = '50%';
      }
      return {
        color: this.activeColor,
        width
      };
    },

    valueDecimal() {
      return this.value * 100 - Math.floor(this.value) * 100;
    },

    classMap() {
      let obj = {
        [this.lowThreshold]: this.iconClasses[0],
        [this.highThreshold]: {
          value: this.iconClasses[1],
          excluded: true
        },
        [this.max]: this.iconClasses[2]
      };
      return Array.isArray(this.iconClasses) ? obj : this.iconClasses;
    },

    decimalIconClass() {
      let flag = this.decimalStyle.width === '50%';
      return flag ? this.iconHalfClass : this.getValueFromMap(this.value, this.classMap);
    },

    voidClass() {
      return this.rateDisabled ? this.disabledVoidIconClass : this.voidIconClass;
    },

    activeClass() {
      return this.getValueFromMap(this.currentValue, this.classMap);
    },

    colorMap() {
      let obj = {
        [this.lowThreshold]: this.colors[0],
        [this.highThreshold]: { value: this.colors[1], excluded: true },
        [this.max]: this.colors[2]
      };
      return Array.isArray(this.colors) ? obj : this.colors;
    },

    activeColor() {
      return this.getValueFromMap(this.currentValue, this.colorMap);
    },

    classes() {
      let result = [];
      let i = 0;
      let threshold = this.currentValue;
      if (this.allowHalf && this.currentValue !== Math.floor(this.currentValue)) {
        threshold--;
      }
      for (; i < threshold; i++) {
        result.push(this.activeClass);
      }
      for (; i < this.max; i++) {
        result.push(this.voidClass);
      }
      return result;
    },

    rateDisabled() {
      return this.disabled || (this.jyForm || {}).disabled;
    }
  },

  watch: {
    value(val) {
      this.currentValue = val;
      this.pointerAtLeftHalf = this.value !== Math.floor(this.value);
    }
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'text-template': 'text-template is renamed to score-template.'
        }
      };
    },

    getValueFromMap(value, map) {
      const matchedKeys = Object.keys(map)
        .filter((key) => {
          const val = map[key];
          const excluded = isObject(val) ? val.excluded : false;
          return excluded ? value < key : value <= key;
        })
        .sort((a, b) => a - b);
      const matchedValue = map[matchedKeys[0]];
      return isObject(matchedValue) ? matchedValue.value : matchedValue || '';
    },

    showDecimalIcon(item) {
      let showWhenDisabled = this.rateDisabled && this.valueDecimal > 0 && item - 1 < this.value && item > this.value;
      /* istanbul ignore next */
      let showWhenAllowHalf =
        this.allowHalf && this.pointerAtLeftHalf && item - 0.5 <= this.currentValue && item > this.currentValue;
      return showWhenDisabled || showWhenAllowHalf;
    },

    getIconStyle(item) {
      const flag = this.showDecimalIcon(item);
      if (flag) {
        return {
          color: this.iconHalfColor
        };
      }
      const voidColor = this.rateDisabled ? this.disabledVoidColor : this.voidColor;
      return {
        color: item <= this.currentValue ? this.activeColor : voidColor
      };
    },

    selectValue(value) {
      if (this.rateDisabled) {
        return;
      }
      if (this.allowHalf && this.pointerAtLeftHalf) {
        this.$emit('input', this.currentValue);
        this.$emit('change', this.currentValue);
      } else {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },

    handleKey(e) {
      if (this.rateDisabled) {
        return;
      }
      let currentValue = this.currentValue;
      const keyCode = e.keyCode;
      if (keyCode === 38 || keyCode === 39) {
        // left / down
        if (this.allowHalf) {
          currentValue += 0.5;
        } else {
          currentValue += 1;
        }
        e.stopPropagation();
        e.preventDefault();
      } else if (keyCode === 37 || keyCode === 40) {
        if (this.allowHalf) {
          currentValue -= 0.5;
        } else {
          currentValue -= 1;
        }
        e.stopPropagation();
        e.preventDefault();
      }
      currentValue = currentValue < 0 ? 0 : currentValue;
      currentValue = currentValue > this.max ? this.max : currentValue;

      this.$emit('input', currentValue);
      this.$emit('change', currentValue);
    },

    setCurrentValue(value, event) {
      if (this.rateDisabled) {
        return;
      }
      /* istanbul ignore if */
      if (this.allowHalf) {
        let target = event.target;
        if (hasClass(target, 'jy-rate__item')) {
          target = target.querySelector('.jy-rate__icon');
        }
        if (hasClass(target, 'jy-rate__decimal')) {
          target = target.parentNode;
        }
        this.pointerAtLeftHalf = event.offsetX * 2 <= target.clientWidth;
        this.currentValue = this.pointerAtLeftHalf ? value - 0.5 : value;
      } else {
        this.currentValue = value;
      }
      this.hoverIndex = value;
    },

    resetCurrentValue() {
      if (this.rateDisabled) {
        return;
      }
      if (this.allowHalf) {
        this.pointerAtLeftHalf = this.value !== Math.floor(this.value);
      }
      this.currentValue = this.value;
      this.hoverIndex = -1;
    }
  },

  created() {
    if (!this.value) {
      this.$emit('input', 0);
    }
  }
};
</script>
