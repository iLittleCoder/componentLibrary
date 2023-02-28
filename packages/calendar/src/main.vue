<template>
  <div class="jy-calendar">
    <div class="jy-calendar__header">
      <div class="jy-calendar__header-left">
        <span
          class=" Gildata-leftarrow jy-calendar__header-prev"
          v-if="validatedRange.length === 0"
          @click="selectDate('prev-month')"
        >
        </span>
        <span class="jy-calendar__title"> {{ i18nDate }} </span>
        <span
          class=" Gildata-rightarrow jy-calendar__header-next"
          v-if="validatedRange.length === 0"
          @click="selectDate('next-month')"
        >
        </span>
        <span
          class="jy-calendar__header-today"
          v-if="validatedRange.length === 0"
          @click="selectDate('today')"
        >
          {{ t('el.datepicker.today') }}
        </span>
      </div>

      <div class="jy-calendar__button-group" v-if="validatedRange.length === 0">
        <jy-button-group>
          <jy-button
            :class="[
              selMonYear === 'month' ? 'jy-calendar__button-active' : ''
            ]"
            :type="selMonYear === 'month' ? 'primary' : 'plain'"
            :secondary="selMonYear === 'month'"
            @click="selectMonthOrYear('month')"
          >
            月
          </jy-button>
          <jy-button
            :class="[selMonYear === 'year' ? 'jy-calendar__button-active' : '']"
            :type="selMonYear === 'year' ? 'primary' : 'plain'"
            :secondary="selMonYear === 'year'"
            @click="selectMonthOrYear('year')"
          >
            {{ t('el.datepicker.year') }}
          </jy-button>
        </jy-button-group>
      </div>
    </div>
    <div
      class="jy-calendar__body"
      v-if="validatedRange.length === 0"
      key="no-range"
    >
      <div v-if="selMonYear === 'month'">
        <date-table
          :date="date"
          :selected-day="realSelectedDay"
          :first-day-of-week="realFirstDayOfWeek"
          @pick="pickDay"
        />
      </div>
      <div v-if="selMonYear === 'year'">
        <year-table
          :date="date"
          :yearShowDate="yearShowDate"
          :selected-date="selectedDate"
          @pick="pickDate"
        >
          <template slot="test" slot-scope="{ cell }">
            <slot name="monthCell" :cell="cell"></slot>
          </template>
        </year-table>
      </div>
    </div>
    <div v-else class="jy-calendar__body" key="has-range">
      <date-table
        v-for="(range, index) in validatedRange"
        :key="index"
        :date="range[0]"
        :selected-day="realSelectedDay"
        :range="range"
        :hide-header="index !== 0"
        :first-day-of-week="realFirstDayOfWeek"
        @pick="pickDay"
      />
    </div>
  </div>
</template>

<script>
import Locale from 'GildataDesign/src/mixins/locale';
import fecha from 'GildataDesign/src/utils/date';
import JyButton from 'GildataDesign/packages/button';
import JyButtonGroup from 'GildataDesign/packages/button-group';
import DateTable from './date-table';
import YearTable from './year-table.vue';
import { validateRangeInOneMonth } from 'GildataDesign/src/utils/date-util';

const validTypes = ['prev-month', 'today', 'next-month'];
const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const oneDay = 86400000;

export default {
  name: 'JyCalendar',

  mixins: [Locale],

  components: {
    DateTable,
    YearTable,
    JyButton,
    JyButtonGroup
  },

  props: {
    value: [Date, String, Number],
    range: {
      type: Array,
      validator(range) {
        if (Array.isArray(range)) {
          return (
            range.length === 2 &&
            range.every(
              (item) =>
                typeof item === 'string' ||
                typeof item === 'number' ||
                item instanceof Date
            )
          );
        } else {
          return true;
        }
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: 7
    },
    yearShowDate: {
      type: Boolean,
      default: false
    }
  },

  provide() {
    return {
      elCalendar: this
    };
  },

  methods: {
    pickDay(day) {
      this.realSelectedDay = day;
    },
    pickDate(day) {
      this.selectedDate = fecha.format(day, 'yyyy-MM-dd');
    },

    selectDate(type) {
      if (validTypes.indexOf(type) === -1) {
        throw new Error(`invalid type ${type}`);
      }
      let day = '';
      if (type === 'prev-month') {
        day = `${this.prevMonthDatePrefix}-01`;
      } else if (type === 'next-month') {
        day = `${this.nextMonthDatePrefix}-01`;
      } else {
        day = this.formatedToday;
      }

      if (day === this.formatedDate) return;
      this.pickDay(day);
    },
    selectMonthOrYear(value) {
      this.selMonYear = value;
    },

    toDate(val) {
      if (!val) {
        throw new Error('invalid val');
      }
      return val instanceof Date ? val : new Date(val);
    },

    rangeValidator(date, isStart) {
      const firstDayOfWeek = this.realFirstDayOfWeek;
      const firstDayOfWeekStart = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
      const expected = isStart ? firstDayOfWeek : firstDayOfWeekStart;
      const message = `${isStart ? 'start' : 'end'} of range should be ${
        weekDays[expected]
      }.`;
      if (date.getDay() !== expected) {
        console.warn(
          '[ElementCalendar]',
          message,
          'Invalid range will be ignored.'
        );
        return false;
      }
      return true;
    }
  },

  computed: {
    prevMonthDatePrefix() {
      const temp = new Date(this.date.getTime());
      temp.setDate(0);
      return fecha.format(temp, 'yyyy-MM');
    },

    curMonthDatePrefix() {
      return fecha.format(this.date, 'yyyy-MM');
    },

    nextMonthDatePrefix() {
      const temp = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        1
      );
      return fecha.format(temp, 'yyyy-MM');
    },

    formatedDate() {
      return fecha.format(this.date, 'yyyy-MM-dd');
    },

    i18nDate() {
      const year = this.date.getFullYear();
      const month = this.date.getMonth() + 1;
      return `${year} ${this.t('el.datepicker.year')} ${this.t(
        'el.datepicker.month' + month
      )}`;
    },

    formatedToday() {
      return fecha.format(this.now, 'yyyy-MM-dd');
    },

    realSelectedDay: {
      get() {
        if (!this.value) return this.selectedDay;
        return this.formatedDate;
      },
      set(val) {
        this.selectedDay = val;
        const date = new Date(val);
        this.$emit('input', date);
      }
    },

    date() {
      if (!this.value) {
        if (this.realSelectedDay) {
          const d = this.selectedDay.split('-');
          return new Date(d[0], d[1] - 1, d[2]);
        } else if (this.validatedRange.length) {
          return this.validatedRange[0][0];
        }
        return this.now;
      } else {
        return this.toDate(this.value);
      }
    },

    // if range is valid, we get a two-digit array
    validatedRange() {
      let range = this.range;
      if (!range) return [];
      range = range.reduce((prev, val, index) => {
        const date = this.toDate(val);
        if (this.rangeValidator(date, index === 0)) {
          prev = prev.concat(date);
        }
        return prev;
      }, []);
      if (range.length === 2) {
        const [start, end] = range;
        if (start > end) {
          console.warn(
            '[ElementCalendar]end time should be greater than start time'
          );
          return [];
        }
        // start time and end time in one month
        if (validateRangeInOneMonth(start, end)) {
          return [[start, end]];
        }
        const data = [];
        let startDay = new Date(start.getFullYear(), start.getMonth() + 1, 1);
        const lastDay = this.toDate(startDay.getTime() - oneDay);
        if (!validateRangeInOneMonth(startDay, end)) {
          console.warn(
            '[ElementCalendar]start time and end time interval must not exceed two months'
          );
          return [];
        }
        // 第一个月的时间范围
        data.push([start, lastDay]);
        // 下一月的时间范围，需要计算一下该月的第一个周起始日
        const firstDayOfWeek = this.realFirstDayOfWeek;
        const nextMontFirstDay = startDay.getDay();
        let interval = 0;
        if (nextMontFirstDay !== firstDayOfWeek) {
          if (firstDayOfWeek === 0) {
            interval = 7 - nextMontFirstDay;
          } else {
            interval = firstDayOfWeek - nextMontFirstDay;
            interval = interval > 0 ? interval : 7 + interval;
          }
        }
        startDay = this.toDate(startDay.getTime() + interval * oneDay);
        if (startDay.getDate() < end.getDate()) {
          data.push([startDay, end]);
        }
        return data;
      }
      return [];
    },

    realFirstDayOfWeek() {
      if (this.firstDayOfWeek < 1 || this.firstDayOfWeek > 6) {
        return 0;
      }
      return Math.floor(this.firstDayOfWeek);
    },
    selectedDate: {
      get() {
        if (!this.value) return this.selectedDay;
        return this.formatedDate;
      },
      set(val) {
        this.selectedDay = val;
        const date = new Date(val);
        this.$emit('input', date);
      }
    }
  },

  data() {
    return {
      selectedDay: '',
      now: new Date(),
      selMonYear: 'month'
    };
  }
};
</script>
