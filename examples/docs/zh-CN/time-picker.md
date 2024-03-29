## TimePicker 时间选择器

用于选择或输入日期

### 固定时间点

提供几个固定的时间点供用户选择

:::demo 使用 el-time-select 标签，分别通过`start`、`end`和`step`指定可选的起始时间、结束时间和步长

```html
<div>
  <div style="margin-bottom:20px">
    <span class="show-desc">尺寸：</span>
    <jy-radio-group size="mini" v-model="size" :show-background="false">
      <jy-radio-button label="large"></jy-radio-button>
      <jy-radio-button label="medium"> </jy-radio-button>
      <jy-radio-button label="small"></jy-radio-button>
      <jy-radio-button label="mini"></jy-radio-button>
    </jy-radio-group>
  </div>
  <jy-time-select
    v-model="value"
    :size="size"
    :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30',
    minTime: '09:00',
  }"
    placeholder="选择时间"
  >
  </jy-time-select>

  <jy-time-select
    border
    :size="size"
    v-model="value1"
    :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30',
    minTime: '09:00',
  }"
    placeholder="选择时间"
  >
  </jy-time-select>
</div>

<script>
  export default {
    data() {
      return {
        size: 'small',
        value: '',
        value1: ''
      };
    }
  };
</script>
```

:::

### 任意时间点

可以选择任意时间

:::demo 使用 el-time-picker 标签，通过`selectableRange`限制可选时间范围。提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrow-control`属性则通过界面上的箭头进行选择。

```html
<template>
  <jy-time-picker
    :style="{width: !!value1? '85px': '100px'}"
    v-model="value1"
    :picker-options="{
      selectableRange: ['00:30:00 - 20:30:00']
    }"
    placeholder="任意时间点"
  >
  </jy-time-picker>
  <jy-time-picker
    :style="{ width: !!value2? '85px': '100px'}"
    arrow-control
    v-model="value2"
    :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
    placeholder="任意时间点"
  >
  </jy-time-picker>

  <jy-time-picker
    border
    :style="{width: '154px'}"
    v-model="value3"
    :picker-options="{
      selectableRange: ['18:30:00 - 20:30:00']
    }"
    placeholder="任意时间点"
  >
  </jy-time-picker>

  <jy-time-picker
    border
    :style="{width: '154px'}"
    arrow-control
    v-model="value4"
    :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
    placeholder="任意时间点"
  >
  </jy-time-picker>
</template>

<script>
  export default {
    data() {
      return {
        value1: new Date(2016, 9, 10, 18, 40),
        value2: new Date(2016, 9, 10, 18, 40),
        value3: new Date(2016, 9, 10, 18, 40),
        value4: new Date(2016, 9, 10, 18, 40)
      };
    }
  };
</script>
```

:::

### 固定时间范围

若先选择开始时间，则结束时间内备选项的状态会随之改变

:::demo

```html
<template>
  <jy-time-select
    :style="{width: !!startTime? '70px': '90px'}"
    placeholder="起始时间"
    v-model="startTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
  >
  </jy-time-select>
  <jy-time-select
    :style="{width: !!endTime? '70px': '90px'}"
    placeholder="结束时间"
    v-model="endTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }"
  >
  </jy-time-select>

  <jy-time-select
    border
    :style="{width: '154px'}"
    placeholder="起始时间"
    v-model="startTime1"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
  >
  </jy-time-select>
  <jy-time-select
    border
    :style="{width: '154px'}"
    placeholder="结束时间"
    v-model="endTime1"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }"
  >
  </jy-time-select>
</template>

<script>
  export default {
    data() {
      return {
        startTime: '',
        endTime: '',
        startTime1: '',
        endTime1: ''
      };
    }
  };
</script>
```

:::

### 任意时间范围

可选择任意的时间范围

:::demo 添加`is-range`属性即可选择时间范围，同样支持`arrow-control`属性。

```html
<template>
  <div style="margin-bottom:20px">
    <span class="show-desc">尺寸：</span>
    <jy-radio-group size="mini" v-model="size" :show-background="false">
      <jy-radio-button label="large"></jy-radio-button>
      <jy-radio-button label="medium"> </jy-radio-button>
      <jy-radio-button label="small"></jy-radio-button>
      <jy-radio-button label="mini"></jy-radio-button>
    </jy-radio-group>
  </div>

  <jy-time-picker
    is-range
    v-model="value1"
    range-separator="-"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
    :size="size"
  >
  </jy-time-picker>
  <jy-time-picker
    is-range
    arrow-control
    v-model="value2"
    range-separator="-"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
    :size="size"
  >
  </jy-time-picker>

  <jy-time-picker
    border
    is-range
    v-model="value3"
    range-separator="-"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
    :size="size"
  >
  </jy-time-picker>
  <jy-time-picker
    border
    is-range
    arrow-control
    v-model="value4"
    range-separator="-"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
    :size="size"
  >
  </jy-time-picker>
</template>

<script>
  export default {
    data() {
      return {
        size: 'small',
        value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value3: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
      };
    }
  };
</script>
```

:::

### Attributes

| 参数              | 说明                                                                 | 类型                                  | 可选值                                                   | 默认值               |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------- | -------------------- |
| value / v-model   | 绑定值                                                               | date(TimePicker) / string(TimeSelect) | —                                                        | —                    |
| readonly          | 完全只读                                                             | boolean                               | —                                                        | false                |
| disabled          | 禁用                                                                 | boolean                               | —                                                        | false                |
| editable          | 文本框可输入                                                         | boolean                               | —                                                        | true                 |
| clearable         | 是否显示清除按钮                                                     | boolean                               | —                                                        | true                 |
| size              | 输入框尺寸                                                           | string                                | medium / small / mini                                    | —                    |
| placeholder       | 非范围选择时的占位内容                                               | string                                | —                                                        | —                    |
| start-placeholder | 范围选择时开始日期的占位内容                                         | string                                | —                                                        | —                    |
| end-placeholder   | 范围选择时开始日期的占位内容                                         | string                                | —                                                        | —                    |
| is-range          | 是否为时间范围选择，仅对`<jy-time-picker>`有效                       | boolean                               | —                                                        | false                |
| arrow-control     | 是否使用箭头进行时间选择，仅对`<jy-time-picker>`有效                 | boolean                               | —                                                        | false                |
| align             | 对齐方式                                                             | string                                | left / center / right                                    | left                 |
| popper-class      | TimePicker 下拉框的类名                                              | string                                | —                                                        | —                    |
| picker-options    | 当前时间日期选择器特有的选项参考下表                                 | object                                | —                                                        | {}                   |
| range-separator   | 选择范围时的分隔符                                                   | string                                | -                                                        | '-'                  |
| value-format      | 可选，仅 TimePicker 时可用，绑定值的格式。不指定则绑定值为 Date 对象 | string                                | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi) | —                    |
| default-value     | 可选，选择器打开时默认显示的时间                                     | Date(TimePicker) / string(TimeSelect) | 可被`new Date()`解析(TimePicker) / 可选值(TimeSelect)    | —                    |
| name              | 原生属性                                                             | string                                | —                                                        | —                    |
| prefix-icon       | 自定义头部图标的类名                                                 | string                                | —                                                        | el-icon-time         |
| clear-icon        | 自定义清空图标的类名                                                 | string                                | —                                                        | el-icon-circle-close |

### Time Select Options

| 参数    | 说明                                 | 类型   | 可选值 | 默认值 |
| ------- | ------------------------------------ | ------ | ------ | ------ |
| start   | 开始时间                             | string | —      | 09:00  |
| end     | 结束时间                             | string | —      | 18:00  |
| step    | 间隔时间                             | string | —      | 00:30  |
| minTime | 最小时间，小于该时间的时间段将被禁用 | string | —      | 00:00  |
| maxTime | 最大时间，大于该时间的时间段将被禁用 | string | —      | —      |

### Time Picker Options

| 参数            | 说明                                                                                                | 类型           | 可选值                                    | 默认值     |
| --------------- | --------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------- | ---------- |
| selectableRange | 可选时间段，例如`'18:30:00 - 20:30:00'`或者传入数组`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | string / array | —                                         | —          |
| format          | 时间格式化(TimePicker)                                                                              | string         | 小时：`HH`，分：`mm`，秒：`ss`，AM/PM `A` | 'HH:mm:ss' |

### Events

| 事件名 | 说明                    | 参数       |
| ------ | ----------------------- | ---------- |
| change | 用户确认选定的值时触发  | 组件绑定值 |
| blur   | 当 input 失去焦点时触发 | 组件实例   |
| focus  | 当 input 获得焦点时触发 | 组件实例   |

### Methods

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| focus  | 使 input 获取焦点 | -    |
