<template>
  <div class="jy-calendar-year">
    <table
      v-if="!yearShowDate"
      class="jy-calendar-table"
      cellspacing="0"
      cellpadding="0"
      border="0"
    >
      <tbody>
        <tr v-for="(row, key) in rows" :key="key">
          <td
            :class="getCellStyle(cell)"
            v-for="(cell, key) in row"
            :key="key"
            @click="handleClick(cell)"
          >
            <div class="jy-calendar-day">
              <span class="cell" v-if="!elCalendar.$scopedSlots.monthCell"
                >{{ cell.text }}月</span
              >
              <div v-if="elCalendar.$scopedSlots.monthCell">
                <slot name="test" :cell="getCellData(cell)"></slot>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="yearShowDate">
      <table class="jy-calendar-table-detail">
        <tbody>
          <tr v-for="(row, key) in rows" :key="key">
            <td v-for="(cell, key) in row" :key="key">
              <div class="jy-calendar-day">
                <span class="cell" :style="yearMonthStyle"
                  >{{ cell.text }}月</span
                >
                <table
                  class="jy-calendar-day-table"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                >
                  <thead>
                    <th class="table-th" v-for="item in weekDays" :key="item">
                      {{ item }}
                    </th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, itemKey) in rowsDetail(cell.text)"
                      :key="itemKey"
                    >
                      <td
                        v-for="(rowItem, rowItemKey) in item"
                        :key="rowItemKey"
                        :class="getCellClass(rowItem, cell.text)"
                        @click="handleDateClick(rowItem, cell.text)"
                      >
                        <div>
                          <span class="table-cell">{{ rowItem.text }}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import fecha from 'GildataDesign/src/utils/date';

import {
  range as rangeArr,
  getFirstDayOfMonth,
  getPrevMonthLastDays,
  getMonthDays,
  getI18nSettings
} from 'GildataDesign/src/utils/date-util';

const clearDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth());
};

const getMonthTimestamp = function(time) {
  if (typeof time === 'number' || typeof time === 'string') {
    return clearDate(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return clearDate(time).getTime();
  } else {
    return NaN;
  }
};

const getDateByMonth = function(date, month) {
  const year = date.getFullYear();
  const day = date.getDate();
  return new Date(year, month, day);
};
const getDateByMonthAndDate = function(date, month, day) {
  const year = date.getFullYear();
  return new Date(year, month, day);
};

export default {
  inject: ['elCalendar'],
  data() {
    return {
      tableList: [[], [], [], []],
      yearMonthStyle: {}
    };
  },

  props: {
    yearShowDate: {
      type: Boolean,
      default: false
    },
    selectedDate: String,
    date: {},
    firstDayOfWeek: {
      type: Number,
      default: 7
    }
  },
  computed: {
    rows() {
      const rows = this.tableList;
      const now = getMonthTimestamp(new Date());
      for (let i = 0; i < 4; i++) {
        const row = rows[i];
        for (let j = 0; j < 3; j++) {
          let cell = row[j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: 'normal'
            };
          }
          cell.type = 'normal';
          const index = i * 3 + j + 1;
          const time = new Date(this.date.getFullYear(), index - 1).getTime();
          const isToday = time === now;
          if (isToday) {
            cell.type = 'today';
          }
          cell.text = index;
          this.$set(row, j, cell);
        }
      }
      return rows;
    },
    realFirstDayOfWeek() {
      if (this.firstDayOfWeek < 1 || this.firstDayOfWeek > 6) {
        return 0;
      }
      return Math.floor(this.firstDayOfWeek);
    },
    WEEK_DAYS() {
      return getI18nSettings().dayNames;
    },

    weekDays() {
      const start = this.firstDayOfWeek;
      const { WEEK_DAYS } = this;

      if (typeof start !== 'number' || start === 0) {
        return WEEK_DAYS.slice();
      } else {
        return WEEK_DAYS.slice(start).concat(WEEK_DAYS.slice(0, start));
      }
    },
    formatedToday() {
      return this.elCalendar.formatedToday;
    }
  },
  mounted() {
    // this.yearMonthStyle = {
    //   display: 'inline-block',
    //   width: document.getElementsByClassName('table-th')[0].clientWidth + 'px',
    //   textAlign: 'right'
    // };
  },
  methods: {
    cellRenderProxy({ text, type }) {
      let render = this.elCalendar.$scopedSlots.monthCell;
      if (!render) return <span>{text}</span>;

      const day = '2022-07-19';
      const date = new Date(day);
      const data = {
        isSelected: true,
        type: `${type}-month`,
        day
      };
      return render({ date, data });
    },
    toNestedArr(days) {
      return rangeArr(days.length / 7).map((_, index) => {
        const start = index * 7;
        return days.slice(start, start + 7);
      });
    },
    getCellClass({ text, type }, month) {
      const classes = [type];
      if (type === 'current') {
        const date = getDateByMonthAndDate(this.date, month - 1, text);
        let formatDate = date && fecha.format(date, 'yyyy-MM-dd');
        if (formatDate === this.selectedDate) {
          classes.push('is-selected');
        }
        if (formatDate === this.formatedToday) {
          classes.push('is-today');
        }
      }
      return classes;
    },
    rowsDetail(month) {
      let days = [];
      const date = getDateByMonth(this.date, month - 1);
      let firstDay = getFirstDayOfMonth(date);
      firstDay = firstDay === 0 ? 7 : firstDay;
      const firstDayOfWeek =
        typeof this.firstDayOfWeek === 'number' ? this.firstDayOfWeek : 1;
      const offset = (7 + firstDay - firstDayOfWeek) % 7;
      const prevMonthDays = getPrevMonthLastDays(date, offset).map((day) => ({
        text: day,
        type: 'prev'
      }));
      const currentMonthDays = getMonthDays(date).map((day) => ({
        text: day,
        type: 'current'
      }));
      days = [...prevMonthDays, ...currentMonthDays];
      const nextMonthDays = rangeArr(42 - days.length).map((_, index) => ({
        text: index + 1,
        type: 'next'
      }));
      days = days.concat(nextMonthDays);
      return this.toNestedArr(days);
    },
    getCellStyle(cell) {
      const style = {};
      const year = this.date.getFullYear();
      const today = new Date();
      const month = cell.text;
      style['is-today'] =
        today.getFullYear() === year && today.getMonth() + 1 === month;

      const selectDate = !this.yearShowDate
        ? new Date(this.selectedDate).getMonth() + 1
        : '';

      style['is-selected'] = selectDate === cell.text;

      return style;
    },
    getCellData(cell) {
      const date = getDateByMonth(this.date, cell.text - 1);
      const formatedDate = fecha.format(date, 'yyyy-MM');
      return {
        text: formatedDate
      };
    },
    handleClick(cell) {
      const date = getDateByMonth(this.date, cell.text - 1);
      this.$emit('pick', date);
    },
    handleDateClick({ text, type }, month) {
      if (type === 'prev') {
        const date = getDateByMonthAndDate(this.date, month - 2, text);
        this.$emit('pick', date);
      }
      if (type === 'current') {
        const date = getDateByMonthAndDate(this.date, month - 1, text);
        this.$emit('pick', date);
      }
      if (type === 'next') {
        const date = getDateByMonthAndDate(this.date, month, text);
        this.$emit('pick', date);
      }
    }
  }
};
</script>
