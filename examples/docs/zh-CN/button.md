## Button 按钮

常用的操作按钮。

### 示例

列举基础的按钮用法。

:::demo

```html
<jy-row>
  <jy-button type="primary">主要按钮</jy-button>
  <jy-button type="primary" loading>主要按钮</jy-button>
  <jy-button type="primary" disabled>禁用状态</jy-button>
</jy-row>
<jy-row>
  <jy-button secondary type="primary">次要按钮</jy-button>
  <jy-button secondary type="primary" loading>次要按钮</jy-button>
  <jy-button secondary type="primary" disabled>禁用状态</jy-button>
</jy-row>
<jy-row>
  <jy-button>辅助按钮</jy-button>
  <jy-button loading>辅助按钮</jy-button>
  <jy-button disabled>禁用状态</jy-button>
</jy-row>
<jy-row>
  <jy-button type="danger">功能按钮</jy-button>
  <jy-button type="danger" loading>辅助按钮</jy-button>
  <jy-button type="danger" disabled>禁用状态</jy-button>
</jy-row>
<jy-row>
  <jy-button type="text">文字按钮</jy-button>
  <jy-button type="text" disabled>文字按钮</jy-button>
</jy-row>
<jy-row>
  <jy-button no-border icon="Gildata-download2"></jy-button>
  <jy-button no-border icon="Gildata-download2" disabled></jy-button>
</jy-row>
<jy-row>
  <jy-button secondary type="primary">
    <i class="Gildata-screen" slot="left"></i>
    <span>筛选按钮</span>
  </jy-button>
  <jy-button secondary type="primary">
    <i class="Gildata-screen" slot="right"></i>
    <span>筛选按钮</span>
  </jy-button>
  <jy-button secondary type="primary">
    <i class="Gildata-screen" slot="left"></i>
    <span>筛选按钮</span>
    <i class="Gildata-screen" slot="right"></i>
  </jy-button>
</jy-row>
<jy-row>
  <jy-button size="large" type="primary">
    <i class="Gildata-screen" slot="left"></i>
    <span>筛选按钮</span>
  </jy-button>
  <jy-button size="medium" type="primary">
    <i class="Gildata-screen" slot="right"></i>
    <span>筛选按钮</span>
  </jy-button>
  <jy-button type="primary">
    <i class="Gildata-screen" slot="left"></i>
    <span>筛选按钮</span>
    <i class="Gildata-screen" slot="right"></i>
  </jy-button>
  <jy-button size="mini" type="primary">
    <i class="Gildata-screen" slot="left"></i>
    <span>筛选按钮</span>
    <i class="Gildata-screen" slot="right"></i>
  </jy-button>
</jy-row>
```

:::

### 基础用法

基础的按钮用法。

新增：次要按钮,secondary（有边框 无背景）

:::demo 使用`type`、`secondary`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```html
<jy-row>
  <jy-button>默认按钮</jy-button>
  <jy-button type="primary">主要按钮</jy-button>
  <jy-button type="success">成功按钮</jy-button>
  <jy-button type="warning">警告按钮</jy-button>
  <jy-button type="danger">危险按钮</jy-button>
</jy-row>

<jy-row>
  <jy-button plain>朴素按钮</jy-button>
  <jy-button type="primary" plain>主要按钮</jy-button>
  <jy-button type="success" plain>成功按钮</jy-button>
  <jy-button type="warning" plain>警告按钮</jy-button>
  <jy-button type="danger" plain>危险按钮</jy-button>
</jy-row>

<jy-row>
  <jy-button type="primary" secondary>次要按钮</jy-button>
  <jy-button type="success" secondary>成功次要按钮</jy-button>
  <jy-button type="warning" secondary>警告次要按钮</jy-button>
  <jy-button type="danger" secondary>危险次要按钮</jy-button>
</jy-row>

<jy-row>
  <jy-button round>圆角按钮</jy-button>
  <jy-button type="primary" round>主要按钮</jy-button>
  <jy-button type="success" round>成功按钮</jy-button>
  <jy-button type="warning" round>警告按钮</jy-button>
  <jy-button type="danger" round>危险按钮</jy-button>
</jy-row>

<jy-row>
  <jy-button icon="Gildata-search1" circle></jy-button>
  <jy-button type="primary" icon="Gildata-eye" circle></jy-button>
  <jy-button type="warning" icon="Gildata-tick" circle></jy-button>
  <jy-button type="success" icon="Gildata-prohibit" circle></jy-button>
</jy-row>
```

:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<jy-row>
  <jy-button disabled>默认按钮</jy-button>
  <jy-button type="primary" disabled>主要按钮</jy-button>
  <jy-button type="success" disabled>成功按钮</jy-button>
  <jy-button type="warning" disabled>警告按钮</jy-button>
  <jy-button type="danger" disabled>危险按钮</jy-button>
</jy-row>

<jy-row>
  <jy-button secondary disabled>次要按钮</jy-button>
  <jy-button type="primary" secondary disabled>主要按钮</jy-button>
  <jy-button type="success" secondary disabled>成功按钮</jy-button>
  <jy-button type="warning" secondary disabled>警告按钮</jy-button>
  <jy-button type="danger" secondary disabled>危险按钮</jy-button>
</jy-row>
```

:::

### 文字按钮

没有边框和背景色的按钮。

新增：不同主题色的文字按钮

:::demo 新增：文字按钮支持不同的主题色，使用 textType 来定义文字按钮的样式。

```html
<jy-button type="text">文字按钮</jy-button>
<jy-button type="text" disabled>文字按钮</jy-button>

<jy-row>
  <jy-button textType="primary" type="text">主要按钮</jy-button>
  <jy-button textType="success" type="text">成功按钮</jy-button>
  <jy-button textType="warning" type="text">警告按钮</jy-button>
  <jy-button textType="danger" type="text">危险按钮</jy-button>
</jy-row>
```

:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 GildataDesign 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```html
<jy-row>
  <jy-button type="primary" icon="Gildata-edit"></jy-button>
  <jy-button type="primary" icon="Gildata-share"></jy-button>
  <jy-button type="primary" icon="Gildata-delete"></jy-button>
  <jy-button type="primary" icon="Gildata-search1">搜索</jy-button>
  <jy-button type="primary">上传 <i class="Gildata-upload"></i></jy-button>
</jy-row>

<jy-row>
  <jy-button type="primary" secondary icon="Gildata-edit"></jy-button>
  <jy-button type="primary" secondary icon="Gildata-share"></jy-button>
  <jy-button type="primary" secondary icon="Gildata-delete"></jy-button>
  <jy-button type="primary" secondary icon="Gildata-search1">搜索</jy-button>
  <jy-button type="primary" secondary>上传 <i class="Gildata-upload"></i></jy-button>
</jy-row>
```

:::

### 无边框图标按钮

新增：无边框图标按钮

:::demo 通过`no-border`属性来设置按钮是否有边框

```html
<jy-row>
  <!-- <jy-button no-border icon="Gildata-edit"></jy-button>
  <jy-button no-border icon="Gildata-share"></jy-button>
  <jy-button no-border icon="Gildata-delete"></jy-button>
  <jy-button no-border icon="Gildata-search1"></jy-button> 
  <jy-button no-border icon="Gildata-search1" disabled></jy-button>-->
</jy-row>

<jy-row class="flex-row shaixuan-content">
  <div class="shaixuan-item">
    <jy-button no-border icon="Gildata-screen1" class="shaixuan-btn "></jy-button>
    <div><span class="shaixuan-desc">Normal</span></div>
  </div>
  <div class="shaixuan-item">
    <jy-button no-border icon="Gildata-screen1" class="shaixuan-btn hover"></jy-button>
    <div><span class="shaixuan-desc">Hover</span></div>
  </div>
  <div class="shaixuan-item">
    <jy-button no-border icon="Gildata-screen1" class="shaixuan-btn pressed"></jy-button>
    <div><span class="shaixuan-desc">Pressed</span></div>
  </div>
  <div class="shaixuan-item">
    <jy-button no-border icon="Gildata-screenSelected1" class="shaixuan-btn selected"></jy-button>
    <div><span class="shaixuan-desc">Selected</span></div>
  </div>
  <div class="shaixuan-item">
    <jy-button no-border icon="Gildata-screen1" disabled></jy-button>
    <div><span class="shaixuan-desc">Disabled</span></div>
  </div>
</jy-row>

<jy-row>
  <jy-button
    class="special-press"
    no-border
    icon="Gildata-menuopen"
    v-if="menuopen"
    @click="changeMenuOpen"
  ></jy-button>
  <jy-button
    class="special-press"
    no-border
    icon="Gildata-menufold"
    v-if="!menuopen"
    @click="changeMenuOpen"
  ></jy-button>
</jy-row>

<jy-row>
  <jy-button no-border icon="Gildata-download2" class="special-press"></jy-button>
</jy-row>

<script>
  export default {
    data() {
      return {
        menuopen: true
      };
    },
    methods: {
      changeMenuOpen() {
        this.menuopen = !this.menuopen;
      }
    }
  };
</script>
<style lang="scss">
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .shaixuan-content {
    .shaixuan-item {
      margin-right: 12px;
      text-align: center;
    }
    .shaixuan-desc {
      font-size: 14px;
      opacity: 0.45;
      color: var(--color-info);
      display: inline-block;
      margin-top: 12px;
    }
    .shaixuan-btn {
      pointer-events: none;
      &.hover {
        background: var(--color-neutral-hover);
        color: var(--color-info);
        cursor: pointer;
      }
      &.pressed {
        background: var(--color-neutral-pressed);
        color: var(--color-info);
        cursor: pointer;
      }
      &.selected {
        background: transparent;
        color: var(--color-primary);
      }
    }
  }
  .special-press {
    .special-press.is-no-border:hover {
      color: var(--color-info);
      background: var(--color-neutral-hover);
    }
    .special-press.is-no-border:focus {
      color: var(--color-info);
      background: var(--color-neutral-pressed);
    }
  }
</style>
```

:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<jy-button-group>`标签来嵌套你的按钮。

```html
<jy-button-group>
  <jy-button type="primary">按钮左</jy-button>
  <jy-button type="primary">按钮中</jy-button>
  <jy-button type="primary">按钮右</jy-button>
</jy-button-group>

<jy-button-group>
  <jy-button type="primary" secondary>按钮左</jy-button>
  <jy-button type="primary" secondary>按钮中</jy-button>
  <jy-button type="primary" secondary>按钮右</jy-button>
</jy-button-group>

<jy-button-group class="demo-iconBtn-group">
  <jy-button type="primary" icon="Gildata-edit"></jy-button>
  <jy-button type="primary" icon="Gildata-share"></jy-button>
  <jy-button type="primary" icon="Gildata-delete"></jy-button>
</jy-button-group>

<jy-button-group class="demo-iconBtn-group">
  <jy-button icon="Gildata-edit"></jy-button>
  <jy-button icon="Gildata-share"></jy-button>
  <jy-button icon="Gildata-delete"></jy-button>
</jy-button-group>
```

:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<jy-button type="primary" loading>加载中</jy-button>
<jy-button type="primary" secondary loading>加载中</jy-button>
<jy-button type="danger" loading>加载中</jy-button>
```

:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```html
<jy-row>
  <jy-button size="large">大按钮</jy-button>
  <jy-button size="medium">中等按钮</jy-button>
  <jy-button>默认按钮</jy-button>
  <jy-button size="mini">超小按钮</jy-button>
</jy-row>
```

:::

### 彩色 icon

:::demo 彩色 icon 的交互。

```html
<jy-row>
  <jy-icon name="Gildata-color-pdf" style="cursor:pointer;margin-right:20px"></jy-icon>
  <jy-icon name="Gildata-color-word" style="cursor:pointer;margin-right:20px"></jy-icon>
  <jy-icon name="Gildata-color-excel" style="cursor:pointer;margin-right:20px"></jy-icon>
  <jy-icon name="Gildata-color-code" style="cursor:pointer;margin-right:20px"></jy-icon>

  <jy-icon disbaled name="Gildata-color-code" style="cursor:not-allowed; opacity:0.3"></jy-icon>
</jy-row>
```

:::

### Attributes

| 参数        | 说明                                                     | 类型    | 可选值                                                              | 默认值 |
| ----------- | -------------------------------------------------------- | ------- | ------------------------------------------------------------------- | ------ |
| size        | 尺寸                                                     | string  | large / medium / mini                                               | —      |
| type        | 类型                                                     | string  | primary / success / warning / danger / info / text                  | —      |
| text-type   | 控制文字按钮的颜色，只在 type = "text"时有效（新增属性） | string  | primary / success / warning / danger / info / secondary(次要文字色) | —      |
| plain       | 是否朴素按钮                                             | boolean | —                                                                   | false  |
| secondary   | 是否辅助按钮-有边框 无背景（新增属性）                   | boolean | —                                                                   | false  |
| no-border   | 是否显示边框（新增属性）                                 | boolean | —                                                                   | false  |
| round       | 是否圆角按钮                                             | boolean | —                                                                   | false  |
| circle      | 是否圆形按钮                                             | boolean | —                                                                   | false  |
| loading     | 是否加载中状态                                           | boolean | —                                                                   | false  |
| disabled    | 是否禁用状态                                             | boolean | —                                                                   | false  |
| icon        | 图标类名                                                 | string  | —                                                                   | —      |
| autofocus   | 是否默认聚焦                                             | boolean | —                                                                   | false  |
| native-type | 原生 type 属性                                           | string  | button / submit / reset                                             | button |
