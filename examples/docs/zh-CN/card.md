## Card 卡片
将信息聚合在卡片容器中展示。

### 示例
:::demo
```html
<jy-card class="box-card">
  <div slot="header" class="card-title">
    <jy-icon name="Gildata-color-title"></jy-icon>
    <span class="text">标题名称</span>
  </div>
  <div class="text-body"></div>
</jy-card>

<jy-card class="box-card">
  <div slot="header" class="card-title">
    <jy-icon name="Gildata-color-title"></jy-icon>
    <span class="text">标题名称</span>
  </div>
  <div v-for="o in 2" :key="o" class="card-subtitle">
    <p class="subtitle">标题名称</p>
    <div></div>
  </div>
</jy-card>

<div class="card-box">
  <jy-card class="special-card">
    <div slot="header" class="card-title">
      <span class="logo">logo</span>
      <div class="icon-list">
        <i :class="item" v-for="item in ['Gildata-popup', 'Gildata-narrow', 'Gildata-enlarged', 'Gildata-close']"></i>
      </div>
    </div>
    <div class="special-subtitle">
      <jy-icon name="Gildata-home"></jy-icon>
    </div>
    <div class="special-body">
      <div v-for="o in 4" :key="o" class="special-list"></div>
    </div>
  </jy-card>
</div>

```
:::

### 基础用法


包含标题，内容和操作。

:::demo Card 组件包括`header`和`body`部分，`header`部分需要有显式具名 slot 分发，同时也是可选的。
```html
<jy-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <jy-button style="float: right; padding: 3px 0" type="text">操作按钮</jy-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</jy-card>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
```
:::

### 简单卡片

卡片可以只有内容区域。

:::demo
```html
<jy-card class="box-card">
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</jy-card>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
```
:::

### 带图片

可配置定义更丰富的内容展示。

:::demo 配置`body-style`属性来自定义`body`部分的`style`，我们还使用了布局组件。
```html
<jy-row>
  <jy-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
    <jy-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <jy-button type="text" class="button">操作按钮</jy-button>
        </div>
      </div>
    </jy-card>
  </jy-col>
</jy-row>

<style>
  .time {
    font-size: 13px;
    color: rgba(32,32,32,0.45);
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>
```
:::

### 卡片阴影

可对阴影的显示进行配置。

:::demo 通过`shadow`属性设置卡片阴影出现的时机：`always`、`hover`或`never`。
```html
<jy-row :gutter="12">
  <jy-col :span="8">
    <jy-card shadow="always">
      总是显示
    </jy-card>
  </jy-col>
  <jy-col :span="8">
    <jy-card shadow="hover">
      鼠标悬浮时显示
    </jy-card>
  </jy-col>
  <jy-col :span="8">
    <jy-card shadow="never">
      从不显示
    </jy-card>
  </jy-col>
</jy-row>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 `slot#header` 传入 DOM | string| — | — |
| body-style | 设置 body 的样式| object| — | { padding: '20px' } |
| shadow | 设置阴影显示时机 | string | always / hover / never | always |
