## Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

### 基础用法

移动到下拉菜单上，展开更多操作。

:::demo 通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单。

```html
<jy-dropdown trigger="click">
  <jy-button class="el-dropdown-link">
    下拉菜单<i class="Gildata-downarrow el-icon--right"></i>
  </jy-button>
  <jy-dropdown-menu slot="dropdown">
    <jy-dropdown-item>恒生电子</jy-dropdown-item>
    <jy-dropdown-item>比亚迪</jy-dropdown-item>
    <jy-dropdown-item>阿里巴巴</jy-dropdown-item>
    <jy-dropdown-item disabled>平安银行</jy-dropdown-item>
    <jy-dropdown-item divided>贵州茅台</jy-dropdown-item>
  </jy-dropdown-menu>
</jy-dropdown>
```
:::

### 触发对象

可使用按钮触发下拉菜单。

:::demo 设置`split-button`属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为`true`即可。

```html
<jy-dropdown>
  <jy-button type="primary">
    更多菜单<i class="Gildata-downarrow el-icon--right"></i>
  </jy-button>
  <jy-dropdown-menu slot="dropdown">
    <jy-dropdown-item>恒生电子</jy-dropdown-item>
    <jy-dropdown-item>比亚迪</jy-dropdown-item>
    <jy-dropdown-item>阿里巴巴</jy-dropdown-item>
    <jy-dropdown-item>平安银行</jy-dropdown-item>
    <jy-dropdown-item>贵州茅台</jy-dropdown-item>
  </jy-dropdown-menu>
</jy-dropdown>
<jy-dropdown split-button type="primary" @click="handleClick">
  更多菜单
  <jy-dropdown-menu slot="dropdown">
    <jy-dropdown-item>恒生电子</jy-dropdown-item>
    <jy-dropdown-item>比亚迪</jy-dropdown-item>
    <jy-dropdown-item>阿里巴巴</jy-dropdown-item>
    <jy-dropdown-item>平安银行</jy-dropdown-item>
    <jy-dropdown-item>贵州茅台</jy-dropdown-item>
  </jy-dropdown-menu>
</jy-dropdown>

<script>
  export default {
    methods: {
      handleClick() {
        alert('button click');
      }
    }
  }
</script>

```
:::

### 触发方式

可以配置 click 激活或者 hover 激活。

:::demo 在`trigger`属性设置为`click`即可。
```html
<jy-row class="block-col-2">
  <jy-col :span="12">
    <span class="demonstration">hover 激活</span>
    <jy-dropdown>
      <jy-button class="el-dropdown-link">
        下拉菜单<i class="Gildata-downarrow el-icon--right"></i>
      </jy-button>
      <jy-dropdown-menu slot="dropdown">
        <jy-dropdown-item icon="Gildata-star1">恒生电子</jy-dropdown-item>
        <jy-dropdown-item icon="Gildata-praise">比亚迪</jy-dropdown-item>
        <jy-dropdown-item icon="Gildata-notice">阿里巴巴</jy-dropdown-item>
        <jy-dropdown-item icon="Gildata-tick">平安银行</jy-dropdown-item>
        <jy-dropdown-item icon="Gildata-help">贵州茅台</jy-dropdown-item>
      </jy-dropdown-menu>
    </jy-dropdown>
  </jy-col>
  <jy-col :span="12">
    <span class="demonstration">click 激活</span>
    <jy-dropdown trigger="click">
      <jy-button class="el-dropdown-link">
        下拉菜单<i class="Gildata-downarrow el-icon--right"></i>
      </jy-button>
      <jy-dropdown-menu slot="dropdown">
        <jy-dropdown-item icon="Gildata-piechart">恒生电子</jy-dropdown-item>
        <jy-dropdown-item icon="Gildata-linechart2">比亚迪</jy-dropdown-item>
        <jy-dropdown-item icon="Gildata-areachart">阿里巴巴</jy-dropdown-item>
        <jy-dropdown-item icon="Gildata-linechart1">平安银行</jy-dropdown-item>
        <jy-dropdown-item icon="Gildata-gauge">贵州茅台</jy-dropdown-item>
      </jy-dropdown-menu>
    </jy-dropdown>
  </jy-col>
</jy-row>
```
:::

### 菜单隐藏方式

可以`hide-on-click`属性来配置。

:::demo 下拉菜单默认在点击菜单项后会被隐藏，将`hide-on-click`属性默认为`false`可以关闭此功能。
```html
<jy-dropdown :hide-on-click="false">
  <jy-button class="el-dropdown-link">
    下拉菜单<i class="Gildata-downarrow el-icon--right"></i>
  </jy-button>
  <jy-dropdown-menu slot="dropdown">
    <jy-dropdown-item>恒生电子</jy-dropdown-item>
    <jy-dropdown-item>比亚迪</jy-dropdown-item>
    <jy-dropdown-item>阿里巴巴</jy-dropdown-item>
    <jy-dropdown-item disabled>平安银行</jy-dropdown-item>
    <jy-dropdown-item divided>贵州茅台</jy-dropdown-item>
  </jy-dropdown-menu>
</jy-dropdown>

```
:::

### 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作

:::demo
```html
<jy-dropdown @command="handleCommand">
  <jy-button class="el-dropdown-link">
    下拉菜单<i class="Gildata-downarrow el-icon--right"></i>
  </jy-button>
  <jy-dropdown-menu slot="dropdown">
    <jy-dropdown-item command="a">恒生电子</jy-dropdown-item>
    <jy-dropdown-item command="b">比亚迪</jy-dropdown-item>
    <jy-dropdown-item command="c">阿里巴巴</jy-dropdown-item>
    <jy-dropdown-item command="d" disabled>平安银行</jy-dropdown-item>
    <jy-dropdown-item command="e" divided>贵州茅台</jy-dropdown-item>
  </jy-dropdown-menu>
</jy-dropdown>

<script>
  export default {
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    }
  }
</script>
```
:::

### 不同尺寸

Dropdown 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```html
<jy-dropdown size="medium" split-button type="primary">
  中等尺寸
  <jy-dropdown-menu slot="dropdown">
    <jy-dropdown-item>恒生电子</jy-dropdown-item>
    <jy-dropdown-item>比亚迪</jy-dropdown-item>
    <jy-dropdown-item>阿里巴巴</jy-dropdown-item>
    <jy-dropdown-item>平安银行</jy-dropdown-item>
    <jy-dropdown-item>贵州茅台</jy-dropdown-item>
  </jy-dropdown-menu>
</jy-dropdown>
<jy-dropdown split-button type="primary">
  默认尺寸
  <jy-dropdown-menu slot="dropdown">
    <jy-dropdown-item>恒生电子</jy-dropdown-item>
    <jy-dropdown-item>比亚迪</jy-dropdown-item>
    <jy-dropdown-item>阿里巴巴</jy-dropdown-item>
    <jy-dropdown-item>平安银行</jy-dropdown-item>
    <jy-dropdown-item>贵州茅台</jy-dropdown-item>
  </jy-dropdown-menu>
</jy-dropdown>
<jy-dropdown size="mini" split-button type="primary">
  超小尺寸
  <jy-dropdown-menu slot="dropdown">
    <jy-dropdown-item>恒生电子</jy-dropdown-item>
    <jy-dropdown-item>狮子头</jy-dropdown-item>
    <jy-dropdown-item>阿里巴巴</jy-dropdown-item>
    <jy-dropdown-item>平安银行</jy-dropdown-item>
    <jy-dropdown-item>贵州茅台</jy-dropdown-item>
  </jy-dropdown-menu>
</jy-dropdown>
```
:::

### Dropdown Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type          | 菜单按钮类型，同 Button 组件(只在`split-button`为 true 的情况下有效)   | string  |          —             |    —     |
| size          | 菜单尺寸，在`split-button`为 true 的情况下也对触发按钮生效  | string | medium / small / mini | — |
| split-button  | 下拉触发元素呈现为按钮组    | boolean  |    —  |  false |
| placement    | 菜单弹出位置     | string | top/top-start/top-end/bottom/bottom-start/bottom-end  | bottom-end |
| trigger       | 触发下拉的行为     | string          | hover, click  | hover |
| hide-on-click | 是否在点击菜单项后隐藏菜单     | boolean          | — | true |
| show-timeout  | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）| number          | — | 250 |
| hide-timeout  | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）| number          | — | 150 |
| tabindex      | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |
| disabled      | 是否禁用        | boolean         | —                      | false |

### Dropdown Slots

| Name | 说明 |
|------|--------|
| — | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件  |
| dropdown | 下拉列表，通常是 `<jy-dropdown-menu>` 组件     |

### Dropdown Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| click  | `split-button` 为 true 时，点击左侧按钮的回调 | — |
| command  | 点击菜单项触发的事件回调 | dropdown-item 的指令 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |

### Dropdown Menu Item Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| command       | 指令     | string/number/object          | — | — |
| disabled      | 禁用     | boolean          | — | false |
| divided       | 显示分割线     | boolean          | — | false |
| icon          | 图标类名 | string   |  —  |  —  |
