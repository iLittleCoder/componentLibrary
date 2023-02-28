## Badge 标记

出现在按钮、图标旁的数字或状态标记。

### 基础用法

展示新消息数量。

:::demo 定义`value`属性，它接受`Number`或者`String`。

```html
<jy-badge :value="12" class="item">
  <jy-button size="small">评论</jy-button>
</jy-badge>
<jy-badge :value="3" class="item">
  <jy-button size="small">回复</jy-button>
</jy-badge>
<jy-badge :value="1" class="item" type="primary">
  <jy-button size="small">评论</jy-button>
</jy-badge>
<jy-badge :value="2" class="item" type="warning">
  <jy-button size="small">回复</jy-button>
</jy-badge>

<jy-dropdown trigger="click">
  <span class="jy-dropdown-link">
    点我查看<i class="Gildata-downarrow el-icon--right"></i>
  </span>
  <jy-dropdown-menu slot="dropdown">
    <jy-dropdown-item class="clearfix">
      <div class="demo-flex">
        <div class="demo-flex-content">
          评论
        </div>
        <div class="demo-flex-badge">
          <jy-badge class="mark" :value="12"> </jy-badge>
        </div>
      </div>
    </jy-dropdown-item>
    <jy-dropdown-item class="clearfix">
      <div class="demo-flex">
        <div class="demo-flex-content">
          回复
        </div>
        <div class="demo-flex-badge">
          <jy-badge class="mark" :value="3"> </jy-badge>
        </div>
      </div>
    </jy-dropdown-item>
  </jy-dropdown-menu>
</jy-dropdown>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
```

:::

### 最大值

可自定义最大值。

:::demo 由`max`属性定义，它接受一个`Number`，需要注意的是，只有当`value`为`Number`时，它才会生效。

```html
<jy-badge :value="200" :max="99" class="item">
  <jy-button size="small">评论</jy-button>
</jy-badge>
<jy-badge :value="100" :max="10" class="item">
  <jy-button size="small">回复</jy-button>
</jy-badge>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
```

:::

### 自定义内容

可以显示数字以外的文本内容。

:::demo 定义`value`为`String`类型是时可以用于显示自定义文本。

```html
<jy-badge value="new" type="primary" class="item">
  <jy-button size="small">评论</jy-button>
</jy-badge>
<jy-badge value="hot" class="item">
  <jy-button size="small">回复</jy-button>
</jy-badge>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
```

:::

### 小红点

以红点的形式标注需要关注的内容。

:::demo 除了数字外，设置`is-dot`属性，它接受一个`Boolean`。

```html
<jy-badge is-dot class="item">
  <i class="Gildata-folder"></i>
</jy-badge>
<jy-badge is-dot class="item">消息</jy-badge>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
```

:::

### Attributes

| 参数   | 说明                                                         | 类型           | 可选值                                      | 默认值 |
| ------ | ------------------------------------------------------------ | -------------- | ------------------------------------------- | ------ |
| value  | 显示值                                                       | string, number | —                                           | —      |
| max    | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number         | —                                           | —      |
| is-dot | 小圆点                                                       | boolean        | —                                           | false  |
| hidden | 隐藏 badge                                                   | boolean        | —                                           | false  |
| type   | 类型                                                         | string         | primary / success / warning / danger / info | —      |
