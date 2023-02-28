## Calendar 日历

显示日期

### 基本

:::demo 设置 `value` 来指定当前显示的月份。如果 `value` 未指定，则显示当月。`value` 支持 `v-model` 双向绑定,通过设置`year-show-date`来显示详细日历。

```html
<jy-calendar class="calendar-demo" v-model="value" :year-show-date="true">
</jy-calendar>
<jy-calendar class="calendar-demo" v-model="value2" :year-show-date="false">
</jy-calendar>

<script>
  export default {
    data() {
      return {
        value: new Date(),
        value2: new Date()
      };
    }
  };
</script>
```

:::

### 自定义内容

:::demo 通过设置名为 `dateCell` 的 `scoped-slot` 来自定义日历单元格中显示的内容。在 `scoped-slot` 可以获取到 date（当前单元格的日期）, data（包括 type，isSelected，day 属性）。详情解释参考下方的 API 文档。

```html
<jy-calendar class="calendar-demo">
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
  <template slot="dateCell" slot-scope="{date, data}">
    <p :class="data.isSelected ? 'is-selected' : 'is-not-selected'">
      {{ data.day.split('-').slice(1).join('-') }}
    </p>
  </template>
</jy-calendar>

<jy-calendar class="calendar-demo">
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
  <template slot="dateCell" slot-scope="{date, data}">
    <div>{{data.day.split('-')[2]}}</div>
    <template v-for="item in dataList">
      <div
        :key="item.date"
        v-if="item.date === data.day"
        class="calendar-class"
      >
        <div v-for="(ele,key) in item.data" :key="key">
          <span class="calendar-class-cell">
            <span
              class="calendar-class-bot"
              :class="'calendar-class-bot-'+ ele.type"
            ></span>
            <span>{{ele.content}}</span>
          </span>
        </div>
      </div>
    </template>
  </template>
  <template v-slot:monthCell="{ cell }">
    <div style="position:relative">
      <div>{{cell.text.split('-')[1]}}</div>
      <template v-for="item in monthDataList">
        <div
          :key="item.date"
          v-if="item.date === cell.text"
          class="calendar-class"
        >
          <div class="calendar-class-header">
            <span style="opacity:0">
              {{cell.text.split('-')[1]}}
            </span>
          </div>
          <jy-scrollbar>
            <div
              class="calendar-class-text"
              v-for="(ele,key) in item.data"
              :key="key"
            >
              <span class="calendar-class-cell">
                <span
                  class="calendar-class-bot"
                  :class="'calendar-class-bot-'+ ele.type"
                ></span>
                <jy-tooltip :content="ele.content" placement="top">
                  <span>{{ele.content}}</span>
                </jy-tooltip>
              </span>
            </div>
          </jy-scrollbar>
        </div>
      </template>
    </div>
  </template>
</jy-calendar>

<script>
  export default {
    data() {
      return {
        dataList: [
          {
            data: [
              { type: 'warning', content: 'This is warning event' },
              {
                type: 'success',
                content: 'This is very long usual event....'
              },
              { type: 'error', content: 'This is error event 4.' }
            ],
            date: '2022-07-02'
          },
          {
            data: [
              { type: 'warning', content: 'This is warning event' },
              {
                type: 'success',
                content: 'This is very long usual event....'
              },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' }
            ],
            date: '2022-07-15'
          }
        ],
        monthDataList: [
          {
            data: [
              { type: 'warning', content: 'This is warning event' },
              {
                type: 'success',
                content:
                  'This is very long usual event。This is very long usual eventThis is very long usual event'
              },
              { type: 'error', content: 'This is error event 4.' }
            ],
            date: '2022-09'
          },
          {
            data: [
              { type: 'warning', content: 'This is warning event' },
              {
                type: 'success',
                content: 'This is very long usual event。。....'
              },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' }
            ],
            date: '2022-10'
          }
        ]
      };
    }
  };
</script>
<style>
  .is-selected {
    color: #256dff;
  }
</style>
```

:::

### 自定义范围

:::demo 设置 `range` 属性指定日历的显示范围。开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。

```html
<jy-calendar :range="['2019-03-04', '2019-03-24']" :first-day-of-week="1">
</jy-calendar>
```

:::

### Attributes

| 参数              | 说明                                                                                                 | 类型               | 可选值 | 默认值 |
| ----------------- | ---------------------------------------------------------------------------------------------------- | ------------------ | ------ | ------ |
| value / v-model   | 绑定值                                                                                               | Date/string/number | —      | —      |
| range             | 时间范围，包括开始时间与结束时间。开始时间必须是周一，结束时间必须是周日，且时间跨度不能超过两个月。 | Array              | —      | —      |
| first-day-of-week | 周起始日                                                                                             | Number             | 1 到 7 | 1      |

### dateCell scoped slot 参数

| 参数 | 说明                                                                                                                                                                              | 类型   | 可选值 | 默认值 |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------ |
| date | 单元格代表的日期                                                                                                                                                                  | Date   | —      | —      |
| data | { type, isSelected, day}，`type` 表示该日期的所属月份，可选值有 prev-month，current-month，next-month；`isSelected` 标明该日期是否被选中；`day` 是格式化的日期，格式为 yyyy-MM-dd | Object | —      | —      |
