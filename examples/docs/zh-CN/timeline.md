## Timeline 时间线

可视化地呈现时间流信息。

### 基础用法

Timeline 可拆分成多个按照时间戳正序或倒序排列的 activity，时间戳是其区分于其他控件的重要特征，使⽤时注意与 Steps 步骤条等区分,通过设置`direction`来控制时间线的横纵展示，通过设置`turns`布尔值来控制是否交替显示，其中时间交替的可以通过设置就 TimeLineItem 的属性`placement`控制显示。

:::demo

```html
<div style="margin-bottom:20px">
  <span class="timeline-title">
    类型：
  </span>
  <gj-radio-group size="mini" v-model="timelineType" :show-background="false">
    <gj-radio-button label="left">左 </gj-radio-button>
    <gj-radio-button label="right">右</gj-radio-button>
    <gj-radio-button label="top">上</gj-radio-button>
    <gj-radio-button label="bottom">下 </gj-radio-button>
  </gj-radio-group>
</div>

<div class="block" style="min-height: 210px">
  <gj-timeline :direction="timelineType">
    <gj-timeline-item v-for="(activity, index) in activities1" :key="index" :timestamp="activity.timestamp">
      {{activity.content}}
    </gj-timeline-item>
  </gj-timeline>
</div>

<div style="margin-bottom:20px; ">
  <span class="timeline-title">
    交替：
  </span>
  <gj-radio-group size="mini" v-model="turnsDirection" :show-background="false">
    <gj-radio-button label="left">左右 </gj-radio-button>
    <gj-radio-button label="top">上下</gj-radio-button>
  </gj-radio-group>
</div>

<div class="block" style="min-height: 210px">
  <gj-timeline :direction="turnsDirection" :turns="true">
    <gj-timeline-item v-for="(activity, index) in activities1" :key="index" :timestamp="activity.timestamp">
      {{activity.content}}
    </gj-timeline-item>
  </gj-timeline>
</div>

<div style="margin-bottom:20px">
  <span class="timeline-title">
    时间：
  </span>
  <gj-radio-group size="mini" v-model="timeDirection" :show-background="false">
    <gj-radio-button label="left">时间左 </gj-radio-button>
    <gj-radio-button label="right">时间右</gj-radio-button>
    <gj-radio-button label="turn">时间交替</gj-radio-button>
  </gj-radio-group>
</div>

<div class="block">
  <gj-timeline :turns="true">
    <gj-timeline-item
      v-for="(activity, index) in activities1"
      :key="index"
      :timestamp="activity.timestamp"
      :placement="timeDirection"
    >
      {{activity.content}}
    </gj-timeline-item>
  </gj-timeline>
</div>

<script>
  export default {
    data() {
      return {
        reverse: true,
        timelineType: 'left',
        turnsDirection: 'left',
        timeDirection: 'left',
        activities: [
          {
            content: '活动按期开始',
            timestamp: '2018-04-15'
          },
          {
            content: '通过审核',
            timestamp: '2018-04-13'
          },
          {
            content: '创建成功',
            timestamp: '2018-04-11'
          }
        ],
        activities1: [
          {
            content: '活动按期开始',
            timestamp: '2018-04-15'
          },
          {
            content: '通过审核',
            timestamp: '2018-04-13'
          },
          {
            content: '创建成功',
            timestamp: '2018-04-11'
          }
        ]
      };
    }
  };
</script>
```

:::

### ⾃定义节点样式

可根据实际场景⾃定义节点尺⼨、颜⾊，或直接使⽤图标。

:::demo

```html
<div class="block">
  <div style="margin-bottom:20px">
    <span class="timeline-title">
      线的虚实:
    </span>
    <gj-radio-group size="mini" v-model="lineType" :show-background="false">
      <gj-radio-button :label="false">实线 </gj-radio-button>
      <gj-radio-button :label="true">虚线</gj-radio-button>
    </gj-radio-group>
  </div>

  <gj-timeline :dashed="lineType">
    <gj-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :bgColor="activity.bgColor"
      :size="activity.size"
      :timestamp="activity.timestamp"
    >
      {{activity.content}}
      <span v-if="activity.isHaveRightIcon">
        <gj-icon name="Gildata-color-warning2"></gj-icon>
      </span>
    </gj-timeline-item>
  </gj-timeline>
</div>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        lineType: false
      };
    },
    computed: {
      activities() {
        let myColor = this.theme === 'White' ? 'rgba(20, 20, 20, 0.65)' : 'rgba(230, 230, 230, 0.65)';
        return [
          {
            content: '支持使用图标',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            icon: 'Gildata-time',
            color: myColor,
            bgColor: 'transparent'
          },
          {
            content: '支持自定义颜色',
            timestamp: '2018-04-03 20:46',
            color: '#0bbd87'
          },
          {
            content: '支持自定义尺寸',
            timestamp: '2018-04-03 20:46',
            size: 'large'
          },
          {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
          },
          {
            content: '设置右边图标',
            timestamp: '2018-04-03 20:46',
            isHaveRightIcon: true
          }
        ];
      }
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

<!-- ### ⾃定义时间戳

当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。

:::demo

```html
<div class="block">
  <gj-timeline>
    <gj-timeline-item timestamp="2018/4/12" placement="top">
      <gj-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </gj-card>
    </gj-timeline-item>
    <gj-timeline-item timestamp="2018/4/3" placement="top">
      <gj-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </gj-card>
    </gj-timeline-item>
    <gj-timeline-item timestamp="2018/4/2" placement="top">
      <gj-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </gj-card>
    </gj-timeline-item>
  </gj-timeline>
</div>
```

::: -->

### Timeline Attributes

| 参数      | 说明                         | 类型    | 可选值 | 默认值 |
| --------- | ---------------------------- | ------- | ------ | ------ |
| reverse   | 指定节点排序方向，默认为正序 | boolean | —      | false  |
| direction | 指定时间线的方向，默认为左边 | string  | —      | left   |
| turns     | 指定时间线是否交替显示       | boolean | —      | false  |

### Timeline-item Attributes

| 参数           | 说明           | 类型    | 可选值                                                              | 默认值 |
| -------------- | -------------- | ------- | ------------------------------------------------------------------- | ------ |
| timestamp      | 时间戳         | string  | -                                                                   | —      |
| hide-timestamp | 是否隐藏时间戳 | boolean | —                                                                   | false  |
| placement      | 时间戳位置     | string  | top / bottom /left/right/turn(left/right/turn 只在纵向时间线上有效) | bottom |
| type           | 节点类型       | string  | primary / success / warning / danger / info                         | -      |
| color          | 节点颜色       | string  | hsl / hsv / hex / rgb                                               | -      |
| size           | 节点尺寸       | string  | normal / large                                                      | normal |
| icon           | 节点图标       | string  | —                                                                   | -      |

### Timeline-Item Slot

| name | 说明                 |
| ---- | -------------------- |
| —    | Timeline-Item 的内容 |
| dot  | 自定义节点           |
