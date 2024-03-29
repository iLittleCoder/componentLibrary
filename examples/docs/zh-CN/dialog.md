## Dialog 对话框
在保留当前页面状态的情况下，告知用户并承载相关操作。

### 基本用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

:::demo 需要设置`visible`属性，它接收`Boolean`，当为`true`时显示 Dialog。Dialog 分为两个部分：`body`和`footer`，`footer`需要具名为`footer`的`slot`。`title`属性用于定义标题，它是可选的，默认值为空。最后，本例还展示了`before-close`的用法。

```html
<jy-button type="text" @click="dialogVisible = true">点击打开 Dialog</jy-button>

<jy-dialog
  title="简历"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="text">林**，男，1971年生，中国国籍，无境外居留权，学士。历仼职于中国银行广西分行隶属贵港分行支行行长、河池分行副行长，广西启泰投资集团有限公司董事。2019年10月15日至今，任公司财务总监</div>
  <span slot="footer" class="dialog-footer">
    <jy-button secondary type="primary" @click="dialogVisible = false">取 消</jy-button>
    <jy-button type="primary" @click="dialogVisible = false">确 定</jy-button>
  </span>
</jy-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    }
  };
</script>
```
:::

:::tip
`before-close` 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效。如果你在 `footer` 具名 slot 里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 `before-close` 的相关逻辑。
:::

### 内置v-dialogDrag指令 
通过v-dialogDrag指令，用于弹框拖拽

:::demo 通过v-dialogDrag指令，可使弹框屏幕内拖动

```html
<jy-button type="text" @click="dialogVisible = true">拖拽 Dialog</jy-button>

<jy-dialog
  v-dialogDrag
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <span>可拖拽的弹框</span>
  <span slot="footer" class="dialog-footer">
    <jy-button secondary type="primary" @click="dialogVisible = false">取 消</jy-button>
    <jy-button type="primary" @click="dialogVisible = false">确 定</jy-button>
  </span>
</jy-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    }
  };
</script>
```
:::

:::tip
`before-close` 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效。如果你在 `footer` 具名 slot 里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 `before-close` 的相关逻辑。
:::

### 自定义内容

Dialog 组件的内容可以是任意的，甚至可以是表格或表单，下面是应用了 GildataDesign Table 和 Form 组件的两个样例。

:::demo
```html
<!-- Table -->
<jy-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</jy-button>

<jy-dialog title="收货地址" :visible.sync="dialogTableVisible">
  <jy-table :data="gridData">
    <jy-column field="date" title="日期" width="100"></jy-column>
    <jy-column field="name" title="姓名" width="100"></jy-column>
    <jy-column field="address" title="地址"></jy-column>
  </jy-table>
</jy-dialog>

<!-- Form -->
<jy-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</jy-button>

<jy-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <jy-form :model="form" size="medium">
    <jy-form-item label="活动名称" :label-width="formLabelWidth">
      <jy-input v-model="form.name" autocomplete="off"></jy-input>
    </jy-form-item>
    <jy-form-item label="活动区域" :label-width="formLabelWidth">
      <jy-select border v-model="form.region" placeholder="请选择活动区域">
        <jy-option label="区域一" value="shanghai"></jy-option>
        <jy-option label="区域二" value="beijing"></jy-option>
      </jy-select>
    </jy-form-item>
  </jy-form>
  <div slot="footer" class="dialog-footer">
    <jy-button secondary type="primary" @click="dialogFormVisible = false">取 消</jy-button>
    <jy-button type="primary" @click="dialogFormVisible = false">确 定</jy-button>
  </div>
</jy-dialog>

<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '100px'
      };
    }
  };
</script>
```
:::

### 嵌套的 Dialog
如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 `append-to-body` 属性。
:::demo 正常情况下，我们不建议使用嵌套的 Dialog，如果需要在页面上同时显示多个 Dialog，可以将它们平级放置。对于确实需要嵌套 Dialog 的场景，我们提供了`append-to-body`属性。将内层 Dialog 的该属性设置为 true，它就会插入至 body 元素上，从而保证内外层 Dialog 和遮罩层级关系的正确。
```html
<template>
  <jy-button type="text" @click="outerVisible = true">点击打开外层 Dialog</jy-button>
  
  <jy-dialog title="外层 Dialog" :visible.sync="outerVisible">
    <jy-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="innerVisible"
      append-to-body>
      <div>这里是内层的信息</div>
    </jy-dialog>
    <div slot="footer" class="dialog-footer">
      <jy-button secondary type="primary" @click="outerVisible = false">取 消</jy-button>
      <jy-button type="primary" @click="innerVisible = true">打开内层 Dialog</jy-button>
    </div>
  </jy-dialog>
</template>

<script>
  export default {
    data() {
      return {
        outerVisible: false,
        innerVisible: false
      };
    }
  }
</script>
```
:::


:::tip
Dialog 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。
:::

:::tip
如果 `visible` 属性绑定的变量位于 Vuex 的 store 内，那么 `.sync` 不会正常工作。此时需要去除 `.sync` 修饰符，同时监听 Dialog 的 `open` 和 `close` 事件，在事件回调中执行 Vuex 中对应的 mutation 更新 `visible` 属性绑定的变量的值。
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| visible   | 是否显示 Dialog，支持 .sync 修饰符 | boolean | — | false |
| title     | Dialog 的标题，也可通过具名 slot （见下表）传入 | string    | — | — |
| width     | Dialog 的宽度 | string    | — | 50% |
| fullscreen     | 是否为全屏 Dialog | boolean    | — | false |
| top       | Dialog CSS 中的 margin-top 值 | string | — | 15vh |
| modal     | 是否需要遮罩层   | boolean   | — | true |
| modal-append-to-body     | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上   | boolean   | — | true |
| append-to-body     | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true   | boolean   | — | false |
| lock-scroll | 是否在 Dialog 出现时将 body 滚动锁定 | boolean | — | true |
| custom-class      | Dialog 的自定义类名 | string    | — | — |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | boolean    | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog | boolean    | — | true |
| show-close | 是否显示关闭按钮 | boolean    | — | true |
| before-close | 关闭前的回调，会暂停 Dialog 的关闭 | function(done)，done 用于关闭 Dialog | — | — |
| center | 是否对头部和底部采用居中布局 | boolean | — | false |
| destroy-on-close | 关闭时销毁 Dialog 中的元素 | boolean | — | false |
| v-dialogDrag | 拖拽指令（新增属性） | — | — | — |

### Slot
| name | 说明 |
|------|--------|
| — | Dialog 的内容 |
| title | Dialog 标题区的内容 |
| footer | Dialog 按钮操作区的内容 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| open  | Dialog 打开的回调 | — |
| opened  | Dialog 打开动画结束时的回调 | — |
| close  | Dialog 关闭的回调 | — |
| closed | Dialog 关闭动画结束时的回调 | — |
