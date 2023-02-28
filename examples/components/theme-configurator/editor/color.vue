<template>
  <section class="config" :key="displayName">
    <div class="config-label">
      <jy-tooltip :content="displayName" placement="top">
        <span>{{ displayKeyName }}</span>
      </jy-tooltip>
    </div>
    <div class="config-content">
      <div class="content-80">
        <jy-input size="medium" :value="displayValue" readonly slot="reference" @click.native="onInputClick"></jy-input>
      </div>
      <div class="content-20">
        <color-picker
          :show-alpha="showAlpha"
          size="medium"
          ref="colorPicker"
          class="colorPicker"
          v-model="pickerColor"
          @change="onPickerChange"
          :colorList="golbalColorList"
        ></color-picker>
      </div>
    </div>
  </section>
</template>

<style>
input {
  cursor: pointer;
}
.colorPicker {
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<script>
import Mixin from './mixin';
import { getStyleDisplayValue, getStyleDisplayName } from '../utils/utils.js';
import ColorPicker from './color-picker';

export default {
  components: {
    ColorPicker
  },
  data() {
    return {
      pickerColor: ''
    };
  },
  mixins: [Mixin],
  watch: {
    displayValue: {
      immediate: true,
      handler(value) {
        if (value.startsWith('#') || value.startsWith('rgba')) {
          this.pickerColor = value;
        }
      }
    }
  },
  computed: {
    showAlpha() {
      return this.displayValue && this.displayValue.startsWith('rgba');
    },
    golbalColor() {
      return this.golbalValue.color;
    },
    displayValue() {
      return getStyleDisplayValue(this.mergedValue, this.golbalColor);
    },
    golbalColorList() {
      let data = Object.keys(this.golbalColor).map((c) => ({
        label: getStyleDisplayName(this.golbalColor[c]),
        value: this.golbalColor[c].value,
        variable: c
      }));
      return this.isGlobal ? [] : data;
    }
  },
  methods: {
    onInputClick() {
      this.$refs.colorPicker && this.$refs.colorPicker.handleTrigger();
    },
    onPickerChange(e) {
      this.onChange(e.variable || e);
    }
  }
};
</script>
