<template>
  <li
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
    class="jy-select-dropdown__item"
    v-show="visible"
    :class="{
      selected: itemSelected,
      'is-disabled': disabled || groupDisabled || limitReached,
      hover: hover
    }"
  >
    <slot>
      <i class="Gildata-tick optionChecked" v-if="itemSelected && !selectMultiple"></i>
      <jy-checkbox
        :disabled="disabled"
        v-if="selectMultiple"
        :value="itemSelected"
        :selectCheck="true"
        @click.native.stop.prevent="selectOptionClick"
      ></jy-checkbox>

      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script type="text/babel">
import Emitter from 'GildataDesign/src/mixins/emitter';
import JyCheckbox from 'GildataDesign/packages/checkbox';
import { getValueByPath, escapeRegexpString } from 'GildataDesign/src/utils/util';

export default {
  mixins: [Emitter],

  components: {
    JyCheckbox
  },

  name: 'JyOption',

  componentName: 'JyOption',

  inject: ['select'],

  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    };
  },

  computed: {
    isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },

    currentLabel() {
      return this.label || (this.isObject ? '' : this.value);
    },

    currentValue() {
      return this.value || this.label || '';
    },

    itemSelected() {
      if (!this.select.multiple) {
        return this.isEqual(this.value, this.select.value);
      } else {
        if (this.select.showFooter) {
          const value = this.select.selected.map((item) => {
            return item.currentValue;
          });
          return this.contains(value, this.value);
        } else {
          return this.contains(this.select.value, this.value);
        }
      }
    },

    limitReached() {
      if (this.select.multiple) {
        return (
          !this.itemSelected &&
          (this.select.value || []).length >= this.select.multipleLimit &&
          this.select.multipleLimit > 0
        );
      } else {
        return false;
      }
    },
    selectMultiple() {
      return !!this.select.multiple;
    }
  },

  watch: {
    currentLabel() {
      if (!this.created && !this.select.remote) {
        this.dispatch('JySelect', 'setSelected');
      }
    },
    value(val, oldVal) {
      const { remote, valueKey } = this.select;
      if (!this.created && !remote) {
        if (valueKey && typeof val === 'object' && typeof oldVal === 'object' && val[valueKey] === oldVal[valueKey]) {
          return;
        }
        this.dispatch('JySelect', 'setSelected');
      }
    }
  },

  methods: {
    isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        const valueKey = this.select.valueKey;
        return getValueByPath(a, valueKey) === getValueByPath(b, valueKey);
      }
    },

    contains(arr = [], target) {
      if (!this.isObject) {
        return arr && arr.indexOf(target) > -1;
      } else {
        const valueKey = this.select.valueKey;
        return (
          arr &&
          arr.some((item) => {
            return getValueByPath(item, valueKey) === getValueByPath(target, valueKey);
          })
        );
      }
    },

    handleGroupDisabled(val) {
      this.groupDisabled = val;
    },

    hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.select.hoverIndex = this.select.options.indexOf(this);
      }
    },

    selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('JySelect', 'handleOptionClick', [this, true]);
      }
    },
    handleChange(value, e) {
      e.stopPropagation();
      return;
    },

    queryChange(query) {
      this.visible = new RegExp(escapeRegexpString(query), 'i').test(this.currentLabel) || this.created;
      if (!this.visible) {
        this.select.filteredOptionsCount--;
      }
    }
  },

  created() {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
    this.select.optionsCount++;
    this.select.filteredOptionsCount++;

    this.$on('queryChange', this.queryChange);
    this.$on('handleGroupDisabled', this.handleGroupDisabled);
  },

  beforeDestroy() {
    const { selected, multiple } = this.select;
    let selectedOptions = multiple ? selected : [selected];
    let index = this.select.cachedOptions.indexOf(this);
    let selectedIndex = selectedOptions.indexOf(this);

    // if option is not selected, remove it from cache
    if (index > -1 && selectedIndex < 0) {
      this.select.cachedOptions.splice(index, 1);
    }
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  }
};
</script>
