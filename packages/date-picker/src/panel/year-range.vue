<template>
  <transition name="jy-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div
      v-show="visible"
      class="jy-picker-panel jy-date-range-picker jy-popper jy-year-range-picker"
      :class="[popperClass]"
    >
      <div class="jy-picker-panel__body-wrapper">
        <slot name="sidebar" class="jy-picker-panel__sidebar"></slot>

        <div class="jy-picker-panel__body">
          <div class="jy-picker-panel__content jy-date-range-picker__content is-left">
            <div class="jy-date-range-picker__header">
              <button
                type="button"
                @click="leftPreBtn"
                class="jy-picker-panel__icon-btn Gildata-d-leftarrow btn-float-left"
              ></button>
              <button
                type="button"
                v-if="unlinkPanels"
                @click="leftNextYear"
                :disabled="!enableYearArrow"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="jy-picker-panel__icon-btn Gildata-d-rightarrow btn-float-right"
              ></button>
              <div>{{ leftLabel }}</div>
            </div>
            <year-table
              selection-mode="range"
              :date="leftDate"
              :default-value="defaultValue"
              :min-date="minDate"
              :max-date="maxDate"
              :range-state="rangeState"
              :disabled-date="disabledDate"
              @changerange="handleChangeRange"
              @pick="handleRangePick"
            >
            </year-table>
          </div>
          <div class="jy-picker-panel__content jy-date-range-picker__content is-right">
            <div class="jy-date-range-picker__header">
              <button
                type="button"
                v-if="unlinkPanels"
                @click="rightPreBtn"
                :disabled="!enableYearArrow"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="jy-picker-panel__icon-btn Gildata-d-leftarrow btn-float-left"
              ></button>
              <button
                type="button"
                @click="rightNextYear"
                class="jy-picker-panel__icon-btn Gildata-d-rightarrow btn-float-right"
              ></button>
              <div>{{ rightLabel }}</div>
            </div>

            <year-table
              selection-mode="range"
              :date="rightDate"
              :default-value="defaultValue"
              :min-date="minDate"
              :max-date="maxDate"
              :range-state="rangeState"
              :disabled-date="disabledDate"
              @changerange="handleChangeRange"
              @pick="handleRangePick"
            >
            </year-table>
          </div>
        </div>
      </div>
      <div class="jy-picker-panel__shortcut--footer" v-if="shortcuts">
        <jy-button size="mini" v-for="(shortcut, key) in shortcuts" :key="key" @click="handleShortcutClick(shortcut)">{{
          shortcut.text
        }}</jy-button>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import { isDate, modifyWithTimeString, prevYear, nextYear, nextMonth } from 'GildataDesign/src/utils/date-util';
import Clickoutside from 'GildataDesign/src/utils/clickoutside';
import Locale from 'GildataDesign/src/mixins/locale';
import YearTable from '../basic/year-table';
import ElInput from 'GildataDesign/packages/input';
import ElButton from 'GildataDesign/packages/button';

const calcDefaultValue = (defaultValue) => {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), nextMonth(new Date(defaultValue))];
  } else {
    return [new Date(), nextMonth(new Date())];
  }
};
export default {
  mixins: [Locale],

  directives: { Clickoutside },

  computed: {
    btnDisabled() {
      return !(this.minDate && this.maxDate && !this.selecting && this.isValidValue([this.minDate, this.maxDate]));
    },

    leftLabel() {
      const year = this.leftDate.getFullYear();
      const yearTranslation = this.t('el.datepicker.year');
      const startYear = Math.floor(year / 12) * 12;
      return startYear + ' ' + yearTranslation + ' - ' + (startYear + 11) + ' ' + yearTranslation;
    },

    rightLabel() {
      const year = this.rightDate.getFullYear();
      const yearTranslation = this.t('el.datepicker.year');
      const startYear = Math.floor(year / 12) * 12;
      return startYear + +' ' + yearTranslation + ' - ' + (startYear + 11) + ' ' + yearTranslation;
    },

    leftYear() {
      const year = this.leftDate.getFullYear();
      const startYear = Math.floor(year / 12) * 12;
      return startYear + 11;
    },

    rightYear() {
      const year = this.rightDate.getFullYear();
      const startYear = Math.floor(year / 12) * 12;
      return startYear;
    },

    enableYearArrow() {
      return this.unlinkPanels && this.rightYear > this.leftYear + 1;
    }
  },

  data() {
    return {
      popperClass: '',
      value: [],
      defaultValue: null,
      defaultTime: null,
      minDate: '',
      maxDate: '',
      leftDate: new Date(),
      rightDate: nextYear(new Date(), 12),
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null
      },
      shortcuts: '',
      visible: '',
      disabledDate: '',
      format: '',
      arrowControl: false,
      unlinkPanels: false
    };
  },

  watch: {
    value(newVal) {
      if (!newVal) {
        this.minDate = null;
        this.maxDate = null;
      } else if (Array.isArray(newVal)) {
        this.minDate = isDate(newVal[0]) ? new Date(newVal[0]) : null;
        this.maxDate = isDate(newVal[1]) ? new Date(newVal[1]) : null;
        if (this.minDate) {
          this.leftDate = this.minDate;
          if (this.unlinkPanels && this.maxDate) {
            // const minDateYear = this.minDate.getFullYear();
            // const maxDateYear = this.maxDate.getFullYear();
            // this.rightDate =
            //   minDateYear === maxDateYear
            //     ? nextYear(this.maxDate, 12)
            //     : this.maxDate;
          } else {
            this.rightDate = nextYear(this.leftDate, 12);
          }
        } else {
          this.leftDate = calcDefaultValue(this.defaultValue)[0];
          this.rightDate = nextYear(this.leftDate, 12);
        }
      }
    },

    defaultValue(val) {
      if (!Array.isArray(this.value)) {
        const [left, right] = calcDefaultValue(val);
        this.leftDate = left;
        this.rightDate =
          val && val[1] && left.getFullYear() !== right.getFullYear() && this.unlinkPanels
            ? right
            : nextYear(this.leftDate, 12);
      }
    }
  },

  methods: {
    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = calcDefaultValue(this.defaultValue)[0];
      this.rightDate = nextYear(this.leftDate, 12);
      this.$emit('pick', null);
    },

    handleChangeRange(val) {
      this.minDate = val.minDate;
      this.maxDate = val.maxDate;
      this.rangeState = val.rangeState;
    },

    handleRangePick(val, close = true) {
      const defaultTime = this.defaultTime || [];
      const minDate = modifyWithTimeString(val.minDate, defaultTime[0]);
      const maxDate = modifyWithTimeString(val.maxDate, defaultTime[1]);
      if (this.maxDate === maxDate && this.minDate === minDate) {
        return;
      }
      this.onPick && this.onPick(val);
      this.maxDate = maxDate;
      this.minDate = minDate;
      // workaround for https://github.com/ElemeFE/element/issues/7539, should remove this block when we don't have to care about Chromium 55 - 57
      setTimeout(() => {
        this.maxDate = maxDate;
        this.minDate = minDate;
      }, 10);
      if (!close) return;
      this.handleConfirm();
    },

    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },

    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPreBtn() {
      this.leftDate = prevYear(this.leftDate, 12);
      if (!this.unlinkPanels) {
        this.rightDate = prevYear(this.rightDate, 12);
      }
    },

    rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = nextYear(this.leftDate, 12);
      }
      this.rightDate = nextYear(this.rightDate, 12);
    },

    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear() {
      this.leftDate = nextYear(this.leftDate, 12);
    },

    rightPreBtn() {
      this.rightDate = prevYear(this.rightDate, 12);
    },

    handleConfirm(visible = false) {
      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$emit('pick', [this.minDate, this.maxDate], visible);
      }
    },

    isValidValue(value) {
      return (
        Array.isArray(value) &&
        value &&
        value[0] &&
        value[1] &&
        isDate(value[0]) &&
        isDate(value[1]) &&
        value[0].getTime() <= value[1].getTime() &&
        (typeof this.disabledDate === 'function' ? !this.disabledDate(value[0]) && !this.disabledDate(value[1]) : true)
      );
    },

    resetView() {
      // NOTE: this is a hack to reset {min, max}Date on picker open.
      // TODO: correct way of doing so is to refactor {min, max}Date to be dependent on value and internal selection state
      //       an alternative would be resetView whenever picker becomes visible, should also investigate date-panel's resetView
      this.minDate = this.value && isDate(this.value[0]) ? new Date(this.value[0]) : null;
      this.maxDate = this.value && isDate(this.value[0]) ? new Date(this.value[1]) : null;
    }
  },

  components: { ElInput, ElButton, YearTable }
};
</script>
