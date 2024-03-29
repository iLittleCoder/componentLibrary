<template>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    @click="handleMonthTableClick"
    @mousemove="handleMouseMove"
    class="jy-month-table"
  >
    <tbody>
      <tr v-for="(row, key) in rows" :key="key">
        <td :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
          <div>
            <!-- <a class="cell">{{
              t('el.datepicker.months.' + months[cell.text])
            }}</a> -->
            <a class="cell">{{ cell.text + 1 }}月</a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
import Locale from 'GildataDesign/src/mixins/locale';
import {
  isDate,
  range,
  getDayCountOfMonth,
  nextDate
} from 'GildataDesign/src/utils/date-util';
import { hasClass } from 'GildataDesign/src/utils/dom';
import {
  arrayFindIndex,
  coerceTruthyValueToArray,
  arrayFind
} from 'GildataDesign/src/utils/util';

const datesInMonth = (year, month) => {
  const numOfDays = getDayCountOfMonth(year, month);
  const firstDay = new Date(year, month, 1);
  return range(numOfDays).map((n) => nextDate(firstDay, n));
};

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
export default {
  props: {
    disabledDate: {},
    value: {},
    selectionMode: {
      default: 'month'
    },
    minDate: {},

    maxDate: {},
    defaultValue: {
      validator(val) {
        // null or valid Date Object
        return (
          val === null ||
          isDate(val) ||
          (Array.isArray(val) && val.every(isDate))
        );
      }
    },
    date: {},
    rangeState: {
      default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },

  mixins: [Locale],

  watch: {
    'rangeState.endDate'(newVal) {
      this.markRange(this.minDate, newVal);
    },

    minDate(newVal, oldVal) {
      if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },

    maxDate(newVal, oldVal) {
      if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    }
  },

  data() {
    return {
      months: [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec'
      ],
      tableRows: [[], [], [], []],
      lastRow: null,
      lastColumn: null
    };
  },

  methods: {
    cellMatchesDate(cell, date) {
      const value = new Date(date);
      return (
        this.date.getFullYear() === value.getFullYear() &&
        Number(cell.text) === value.getMonth()
      );
    },
    getCellStyle(cell) {
      const style = {};
      const year = this.date.getFullYear();
      const today = new Date();
      const month = cell.text;
      const defaultValue = this.defaultValue
        ? Array.isArray(this.defaultValue)
          ? this.defaultValue
          : [this.defaultValue]
        : [];
      style.disabled =
        typeof this.disabledDate === 'function'
          ? datesInMonth(year, month).every(this.disabledDate)
          : false;
      style.current =
        arrayFindIndex(
          coerceTruthyValueToArray(this.value),
          (date) => date.getFullYear() === year && date.getMonth() === month
        ) >= 0;
      style.today = today.getFullYear() === year && today.getMonth() === month;
      style.default = defaultValue.some((date) =>
        this.cellMatchesDate(cell, date)
      );

      if (cell.inRange) {
        style['in-range'] = true;

        if (cell.start) {
          style['start-date'] = true;
        }

        if (cell.end) {
          style['end-date'] = true;
        }

        // 添加样式一行开头和结尾
        if (cell.column === 0) {
          style['row-start'] = true;
        }
        if (cell.column === 2) {
          style['row-end'] = true;
        }
      }
      return style;
    },
    getMonthOfCell(month) {
      const year = this.date.getFullYear();
      return new Date(year, month, 1);
    },
    markRange(minDate, maxDate) {
      minDate = getMonthTimestamp(minDate);
      maxDate = getMonthTimestamp(maxDate) || minDate;
      [minDate, maxDate] = [
        Math.min(minDate, maxDate),
        Math.max(minDate, maxDate)
      ];
      const rows = this.rows;
      for (let i = 0, k = rows.length; i < k; i++) {
        const row = rows[i];
        for (let j = 0, l = row.length; j < l; j++) {
          const cell = row[j];
          const index = i * 3 + j;
          const time = new Date(this.date.getFullYear(), index).getTime();

          cell.inRange = minDate && time >= minDate && time <= maxDate;
          cell.start = minDate && time === minDate;
          cell.end = maxDate && time === maxDate;
        }
      }
    },
    handleMouseMove(event) {
      if (!this.rangeState.selecting) return;

      let target = event.target;
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

      // only update rangeState when mouse moves to a new cell
      // this avoids frequent Date object creation and improves performance
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row;
        this.lastColumn = column;
        this.$emit('changerange', {
          minDate: this.minDate,
          maxDate: this.maxDate,
          rangeState: {
            selecting: true,
            endDate: this.getMonthOfCell(row * 3 + column)
          }
        });
      }
    },
    handleMonthTableClick(event) {
      let target = event.target;
      if (target.tagName === 'A') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;
      if (hasClass(target, 'disabled')) return;
      const column = target.cellIndex;
      const row = target.parentNode.rowIndex;
      // const month = row * 4 + column;
      // 一行4个换一行3个
      const month = row * 3 + column;

      const newDate = this.getMonthOfCell(month);
      if (this.selectionMode === 'range') {
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
      } else {
        this.$emit('pick', month);
      }
    }
  },

  computed: {
    rows() {
      // TODO: refactory rows / getCellClasses
      const rows = this.tableRows;
      const disabledDate = this.disabledDate;
      const selectedDate = [];
      const now = getMonthTimestamp(new Date());

      for (let i = 0; i < 4; i++) {
        const row = rows[i];
        for (let j = 0; j < 3; j++) {
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
          const index = i * 3 + j;
          const time = new Date(this.date.getFullYear(), index).getTime();
          cell.inRange =
            time >= getMonthTimestamp(this.minDate) &&
            time <= getMonthTimestamp(this.maxDate);
          cell.start = this.minDate && time === getMonthTimestamp(this.minDate);
          cell.end = this.maxDate && time === getMonthTimestamp(this.maxDate);
          const isToday = time === now;

          if (isToday) {
            cell.type = 'today';
          }
          cell.text = index;
          let cellDate = new Date(time);
          cell.disabled =
            typeof disabledDate === 'function' && disabledDate(cellDate);
          cell.selected = arrayFind(
            selectedDate,
            (date) => date.getTime() === cellDate.getTime()
          );

          this.$set(row, j, cell);
        }
      }
      return rows;
    }
  }
};
</script>
