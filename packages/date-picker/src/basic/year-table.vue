<template>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    @click="handleYearTableClick"
    @mousemove="handleMouseMove"
    class="gj-year-table"
  >
    <!-- <tbody>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 0)">
          <a class="cell">{{ startYear }}年</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 1)">
          <a class="cell">{{ startYear + 1 }}年</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 2)">
          <a class="cell">{{ startYear + 2 }}年</a>
        </td>
      </tr>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 3)">
          <a class="cell">{{ startYear + 3 }}年</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 4)">
          <a class="cell">{{ startYear + 4 }}年</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 5)">
          <a class="cell">{{ startYear + 5 }}年</a>
        </td>
      </tr>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 6)">
          <a class="cell">{{ startYear + 6 }}年</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 7)">
          <a class="cell">{{ startYear + 7 }}年</a>
        </td>

        <td class="available" :class="getCellStyle(startYear + 8)">
          <a class="cell">{{ startYear + 8 }}年</a>
        </td>
      </tr>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 9)">
          <a class="cell">{{ startYear + 9 }}年</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 10)">
          <a class="cell">{{ startYear + 10 }}年</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 11)">
          <a class="cell">{{ startYear + 11 }}年</a>
        </td>
      </tr>
    </tbody> -->

    <tbody>
      <tr v-for="(row, key) in rows" :key="key">
        <td class="available" :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
          <div>
            <a class="cell">{{ cell.text }}年</a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
import { hasClass } from 'GildataDesign/src/utils/dom';
import { isDate, range, nextDate, getDayCountOfYear } from 'GildataDesign/src/utils/date-util';
import { arrayFindIndex, coerceTruthyValueToArray, arrayFind } from 'GildataDesign/src/utils/util';

const datesInYear = (year) => {
  const numOfDays = getDayCountOfYear(year);
  const firstDay = new Date(year, 0, 1);
  return range(numOfDays).map((n) => nextDate(firstDay, n));
};
const clearDate = (date) => {
  return new Date(date.getFullYear(), 0);
};

const getYearTimestamp = function(time) {
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
    defaultValue: {
      validator(val) {
        // null or valid Date Object
        return val === null || (val instanceof Date && isDate(val));
      }
    },
    selectionMode: {
      default: 'year'
    },
    minDate: {},

    maxDate: {},
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
  data() {
    return {
      tableRows: [[], [], [], []],
      lastRow: null,
      lastColumn: null
    };
  },
  watch: {
    'rangeState.endDate'(newVal) {
      this.markRange(this.minDate, newVal);
    },

    minDate(newVal, oldVal) {
      if (getYearTimestamp(newVal) !== getYearTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },

    maxDate(newVal, oldVal) {
      if (getYearTimestamp(newVal) !== getYearTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    }
  },
  computed: {
    startYear() {
      // return Math.floor(this.date.getFullYear() / 10) * 10;
      return Math.floor(this.date.getFullYear() / 12) * 12;
    },
    rows() {
      const rows = this.tableRows;
      const disabledDate = this.disabledDate;
      const selectedDate = [];
      const now = getYearTimestamp(new Date());

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

          const index = this.startYear + i * 3 + j;
          const time = new Date(index, 0).getTime();
          cell.inRange = time >= getYearTimestamp(this.minDate) && time <= getYearTimestamp(this.maxDate);
          cell.start = this.minDate && time === getYearTimestamp(this.minDate);
          cell.end = this.maxDate && time === getYearTimestamp(this.maxDate);
          const isToday = time === now;

          // console.log(
          //   'sssssssssssssssss',
          //   cell,
          //   'start=======',
          //   time,
          //   this.minDate && getYearTimestamp(this.minDate),
          //   time === getYearTimestamp(this.minDate),
          //   cell.start
          // );

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
    getCellStyle(cell) {
      const year = cell.text;
      const style = {};
      const today = new Date();

      style.disabled = typeof this.disabledDate === 'function' ? datesInYear(year).every(this.disabledDate) : false;
      style.current = arrayFindIndex(coerceTruthyValueToArray(this.value), (date) => date.getFullYear() === year) >= 0;
      style.today = today.getFullYear() === year;
      style.default = this.defaultValue && this.defaultValue.getFullYear() === year;

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
    getYearOfCell(year) {
      // const year = this.date.getFullYear();
      return new Date(year, 0, 1);
    },
    handleYearTableClick(event) {
      const target = event.target;
      if (target.tagName === 'A') {
        if (hasClass(target.parentNode, 'disabled')) return;
        const year = target.textContent || target.innerText;
        let result = year.split('年')[0];

        // 年份范围
        if (this.selectionMode === 'range') {
          const newDate = this.getYearOfCell(Number(result));
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
          this.$emit('pick', Number(result));
        }
      }
    },
    handleMouseMove(event) {
      if (!this.rangeState.selecting) return;

      let target = event.target;

      const year = target.textContent || target.innerText;
      let result = year.split('年')[0];

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
            endDate: this.getYearOfCell(result)
          }
        });
      }
    },
    markRange(minDate, maxDate) {
      minDate = getYearTimestamp(minDate);
      maxDate = getYearTimestamp(maxDate) || minDate;
      [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
      const rows = this.rows;
      for (let i = 0, k = rows.length; i < k; i++) {
        const row = rows[i];
        for (let j = 0, l = row.length; j < l; j++) {
          const cell = row[j];
          // const index = i * k + j;
          // const time = new Date(this.date.getFullYear(), index).getTime();

          const index = this.startYear + i * l + j;
          const time = new Date(index, 0).getTime();

          cell.inRange = minDate && time >= minDate && time <= maxDate;
          cell.start = minDate && time === minDate;
          cell.end = maxDate && time === maxDate;
        }
      }
    }
  }
};
</script>
