<template>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    @click="handleQuarterTableClick"
    @mousemove="handleMouseMove"
    class="gj-quarter-table"
  >
    <!-- <tbody>
      <tr>
        <td
          class="available"
          :class="getCellQStyle(item)"
          v-for="item in 4"
          :key="item"
        >
          <a class="cell">Q{{ item }}</a>
        </td>
      </tr>
    </tbody> -->

    <tbody>
      <tr v-for="(row, key) in rows" :key="key">
        <td class="available" :class="getCellQStyle(cell)" v-for="(cell, key) in row" :key="key">
          <div>
            <a class="cell">Q{{ cell.text + 1 }}</a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
import { hasClass } from 'GildataDesign/src/utils/dom';
import {
  isDate,
  getQuarterNumber,
  range,
  getDayCountOfMonth,
  nextDate
  //   range,
  //   nextDate,
  //   getDayCountOfYear
} from 'GildataDesign/src/utils/date-util';

import { arrayFind } from 'GildataDesign/src/utils/util';

const datesInMonth = (year, month) => {
  const numOfDays = getDayCountOfMonth(year, month);
  const firstDay = new Date(year, month, 1);
  return range(numOfDays).map((n) => nextDate(firstDay, n));
};

const clearDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
const getQuarterTimestamp = function(time) {
  if (typeof time === 'number' || typeof time === 'string') {
    return clearDate(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return clearDate(time).getTime();
  } else {
    return NaN;
  }
};

const monthQuarter = {
  Q1: 0,
  Q2: 3,
  Q3: 6,
  Q4: 9
};

export default {
  data() {
    return {
      tableRows: [[]],
      lastRow: null,
      lastColumn: null
    };
  },
  props: {
    disabledDate: {},
    value: {},
    defaultValue: {
      validator(val) {
        // null or valid Date Object
        return val === null || (val instanceof Date && isDate(val));
      }
    },
    selectionMode: {
      default: 'quarter'
    },
    date: {},
    minDate: {},
    maxDate: {},
    rangeState: {
      default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },
  watch: {
    'rangeState.endDate'(newVal) {
      this.markRange(this.minDate, newVal);
    },

    minDate(newVal, oldVal) {
      if (getQuarterTimestamp(newVal) !== getQuarterTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },

    maxDate(newVal, oldVal) {
      if (getQuarterTimestamp(newVal) !== getQuarterTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    }
  },
  computed: {
    startYear() {
      return Math.floor(this.date.getFullYear() / 10) * 10;
    },
    rows() {
      const rows = this.tableRows;
      const disabledDate = this.disabledDate;
      const selectedDate = [];
      const now = getQuarterTimestamp(new Date());

      for (let i = 0; i < 1; i++) {
        const row = rows[i];
        for (let j = 0; j < 4; j++) {
          let cell = row[j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: 'normal',
              inRange: false,
              start: false,
              end: false
            };
          }

          cell.type = 'normal';
          const index = i * 4 + j;
          const time = this.getYearOfCell(index * 3).getTime();
          cell.inRange = time >= getQuarterTimestamp(this.minDate) && time <= getQuarterTimestamp(this.maxDate);
          cell.start = this.minDate && time === getQuarterTimestamp(this.minDate);
          cell.end = this.maxDate && time === getQuarterTimestamp(this.maxDate);
          const isToday = time === now;

          if (isToday) {
            cell.type = 'today';
          }
          cell.text = index;
          let cellDate = new Date(time);
          cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
          cell.selected = arrayFind(selectedDate, (date) => date.getTime() === cellDate.getTime());

          this.$set(row, j, cell);
        }
      }
      return rows;
    }
  },

  methods: {
    getCellQStyle(item) {
      const style = {};
      const today = new Date();
      const year = this.date.getFullYear();
      const month = item.text * 3;
      const curYear = today.getFullYear();
      const quarterNumber = item.text + 1;

      style.today = curYear === year && quarterNumber === getQuarterNumber(today);
      style.current =
        this.value && new Date(this.value).getFullYear() === year && quarterNumber === getQuarterNumber(this.value);
      style.default = this.defaultValue && getQuarterNumber(this.defaultValue);

      style.disabled =
        typeof this.disabledDate === 'function' ? datesInMonth(year, month).every(this.disabledDate) : false;

      if (item.inRange) {
        style['in-range'] = true;

        if (item.start) {
          style['start-date'] = true;
        }

        if (item.end) {
          style['end-date'] = true;
        }
      }

      return style;
    },

    handleQuarterTableClick(event) {
      if (this.selectionMode === 'range') {
        const target = event.target;

        if (target.tagName === 'A') {
          if (hasClass(target.parentNode, 'disabled')) return;
          const result = target.textContent || target.innerText;
          const quarter = monthQuarter[result];

          const newDate = this.getYearOfCell(quarter);

          if (!this.rangeState.selecting) {
            this.$emit('pick', { minDate: newDate, maxDate: null });
            this.rangeState.selecting = true;
          } else {
            if (newDate >= this.minDate) {
              this.$emit('pick', { minDate: this.minDate, maxDate: newDate });
            } else {
              this.$emit('pick', { minDate: newDate, maxDate: this.minDate });
            }
            this.rangeState.selecting = false;
          }
        }
      } else {
        const target = event.target;
        if (target.tagName === 'A') {
          if (hasClass(target.parentNode, 'disabled')) return;
          const result = target.textContent || target.innerText;
          const quarter = result.split('Q')[1];
          let month = monthQuarter[result];
          this.$emit('pick', quarter, month);
        }
      }
    },
    getYearOfCell(month) {
      const year = this.date.getFullYear();
      return new Date(year, month, 1);
    },
    handleMouseMove(event) {
      if (!this.rangeState.selecting) return;

      let target = event.target;

      const quarter = target.textContent || target.innerText;
      const result = monthQuarter[quarter];

      if (target.tagName === 'A') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;

      const row = target.parentNode.rowIndex;
      const column = target.cellIndex;

      // can not select disabled date

      if (this.rows[row][column].disabled) return;
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row;
        this.lastColumn = column;
        this.$emit('changerange', {
          minDate: this.minDate,
          maxDate: this.maxDate,
          rangeState: {
            selecting: true,
            endDate: this.getYearOfCell(result)
          }
        });
      }
    },
    markRange(minDate, maxDate) {
      minDate = getQuarterTimestamp(minDate);
      maxDate = getQuarterTimestamp(maxDate) || minDate;
      [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];

      const rows = this.rows;
      for (let i = 0, k = rows.length; i < k; i++) {
        const row = rows[i];
        for (let j = 0, l = row.length; j < l; j++) {
          const cell = row[j];
          const index = (i * l + j) * 3;
          const time = this.getYearOfCell(index).getTime();
          cell.inRange = minDate && time >= minDate && time <= maxDate;
          cell.start = minDate && time === minDate;
          cell.end = maxDate && time === maxDate;
        }
      }
    }
  }
};
</script>
