## Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

### 线形进度条

:::demo Progress 组件设置`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。通过 `format` 属性来指定进度条文字内容,通过`strokeWidth`属性设置宽度。

```html
<div>
  <div>
    <div style="margin-bottom:20px">
      <gj-radio-group
        size="mini"
        v-model="progressSize"
        :show-background="false"
      >
        <gj-radio-button label="small">size M </gj-radio-button>
        <gj-radio-button label="large">size L</gj-radio-button>
      </gj-radio-group>
    </div>
    <gj-progress :percentage="50" :size="progressSize"></gj-progress>
    <gj-progress
      :percentage="100"
      :format="format"
      :size="progressSize"
    ></gj-progress>
    <gj-progress
      :percentage="100"
      status="success"
      :size="progressSize"
    ></gj-progress>
    <gj-progress
      :percentage="100"
      status="warning"
      :size="progressSize"
    ></gj-progress>
    <gj-progress
      :percentage="50"
      status="exception"
      :size="progressSize"
    ></gj-progress>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        progressSize: 'small'
      };
    },
    methods: {
      format(percentage) {
        return percentage === 100 ? '100%' : `${percentage}%`;
      },
      changeSize(size) {
        this.progressSize = size;
      }
    }
  };
</script>
```

:::

### 自定义颜色

可以通过 `color` 设置进度条的颜色，`color` 可以接受颜色字符串，函数和数组。

:::demo

```html
<gj-progress :percentage="percentage" :color="customColor"></gj-progress>

<gj-progress :percentage="percentage" :color="customColorMethod"></gj-progress>

<gj-progress :percentage="percentage" :color="customColors"></gj-progress>
<div>
  <gj-button-group>
    <gj-button icon="Gildata-minussign" @click="decrease"></gj-button>
    <gj-button icon="Gildata-plus" @click="increase"></gj-button>
  </gj-button-group>
</div>

<script>
  export default {
    data() {
      return {
        percentage: 20,
        customColor: '#256DFF',
        customColors: [
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#5cb87a', percentage: 60 },
          { color: '#256DFF', percentage: 80 },
          { color: '#6f7ad3', percentage: 100 }
        ]
      };
    },
    methods: {
      customColorMethod(percentage) {
        if (percentage < 30) {
          return '#909399';
        } else if (percentage < 70) {
          return '#e6a23c';
        } else {
          return '#67c23a';
        }
      },
      increase() {
        this.percentage += 10;
        if (this.percentage > 100) {
          this.percentage = 100;
        }
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) {
          this.percentage = 0;
        }
      }
    }
  };
</script>
```

:::

### 环形进度条

Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。

:::demo

```html
<div>
  <div style="margin-bottom:20px">
    <gj-radio-group size="mini" v-model="progressSize" :show-background="false">
      <gj-radio-button label="small">size M </gj-radio-button>
      <gj-radio-button label="large">size L</gj-radio-button>
    </gj-radio-group>
  </div>

  <!-- <gj-progress type="circle" :percentage="0"></gj-progress>
  <gj-progress type="circle" :percentage="25"></gj-progress>
  <gj-progress type="circle" :percentage="100" status="success"></gj-progress>
  <gj-progress type="circle" :percentage="70" status="warning"></gj-progress>
  <gj-progress type="circle" :percentage="50" status="exception"></gj-progress> -->
</div>

<div>
  <gj-progress type="circle" :percentage="0" :size="progressSize"></gj-progress>
  <gj-progress
    type="circle"
    :percentage="25"
    :size="progressSize"
  ></gj-progress>
  <gj-progress
    type="circle"
    :percentage="100"
    status="success"
    :size="progressSize"
  ></gj-progress>
  <gj-progress
    type="circle"
    :percentage="70"
    status="warning"
    :size="progressSize"
  ></gj-progress>
  <gj-progress
    type="circle"
    :percentage="50"
    status="exception"
    :size="progressSize"
  ></gj-progress>
</div>

<script>
  export default {
    data() {
      return {
        progressSize: 'small'
      };
    },
    methods: {
      format(percentage) {
        return percentage === 100 ? '100%' : `${percentage}%`;
      },
      changeSize(size) {
        this.progressSize = size;
      }
    }
  };
</script>
```

:::

### 仪表盘形进度条

:::demo 通过 `type` 属性来指定使用仪表盘形进度条。

```html
<gj-progress
  type="dashboard"
  :percentage="percentage"
  :color="colors"
  size="large"
></gj-progress>
<div>
  <gj-button-group>
    <gj-button icon="el-icon-minus" @click="decrease"></gj-button>
    <gj-button icon="el-icon-plus" @click="increase"></gj-button>
  </gj-button-group>
</div>

<script>
  export default {
    data() {
      return {
        percentage: 10,
        colors: [
          { color: '#EE5640', percentage: 20 },
          { color: '#FFAA0E', percentage: 40 },
          { color: '#35B55F', percentage: 60 },
          { color: '#256DFF', percentage: 80 },
          { color: '#256DFF', percentage: 100 }
        ]
      };
    },
    methods: {
      increase() {
        this.percentage += 10;
        if (this.percentage > 100) {
          this.percentage = 100;
        }
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) {
          this.percentage = 0;
        }
      }
    }
  };
</script>
```

:::

### Attributes

| 参数           | 说明                                                  | 类型                  | 可选值                    | 默认值 |
| -------------- | ----------------------------------------------------- | --------------------- | ------------------------- | ------ |
| **percentage** | **百分比（必填）**                                    | number                | 0-100                     | 0      |
| type           | 进度条类型                                            | string                | line/circle/dashboard     | line   |
| size           | 进度条的大小                                          | string                | medium/large              | medium |
| text-inside    | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean               | —                         | false  |
| status         | 进度条当前状态                                        | string                | success/exception/warning | —      |
| color          | 进度条背景色（会覆盖 status 状态颜色）                | string/function/array | —                         | ''     |
| width          | 线性进度条（只在 type 为 line 时可用）                | number                |                           | 126    |
| show-text      | 是否显示进度条文字内容                                | boolean               | —                         | true   |
| stroke-linecap | circle/dashboard 类型路径两端的形状                   | string                | butt/round/square         | round  |
| format         | 指定进度条文字内容                                    | function(percentage)  | —                         | —      |
