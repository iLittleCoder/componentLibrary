## Icon 图标

提供了一套常用的图标集合(包含Gildata和elementUI图标)。

### 使用方法

直接通过设置类名为 `Gildata-tick` 或 `el-icon-iconName` 来使用聚源和element图标即可。例如：

:::demo
```html

<p>jy-icon组件可以用来显示彩色和灰色标签</p>
<jy-row>
  <jy-icon name="Gildata-color-pdf"></jy-icon>
  <jy-icon name="Gildata-color-word"></jy-icon>
  <jy-icon name="el-icon-star-off"></jy-icon>
  <jy-icon name="Gildata-place"></jy-icon>
</jy-row>
<p>i 标签只能用来显示灰色标签</p>
<jy-row>
  <i class="Gildata-tick"></i>
  <i class="Gildata-star1"></i>
  <i class="el-icon-edit"></i>
  <i class="el-icon-share"></i>
</jy-row>
```
:::

### Gildata灰色图标集合

<ul class="icon-list">
  <li v-for="name in $GlIcon" :key="name">
    <span>
      <i :class="name"></i>
      <span class="icon-name">{{name}}</span>
    </span>
  </li>
</ul>

### Gildata彩色图标集合

<ul class="icon-list">
  <li v-for="name in $GlColorIcon" :key="name">
    <span>
      <svg class="icon svg-icon" aria-hidden="true">
        <use :xlink:href="'#' + name"></use>
      </svg>
      <br>
      <span class="icon-name">{{name}}</span>
    </span>
  </li>
</ul>

### elementUI图标集合

<ul class="icon-list">
  <li v-for="name in $elIcon" :key="name">
    <span>
      <i :class="'el-icon-' + name"></i>
      <span class="icon-name">{{'el-icon-' + name}}</span>
    </span>
  </li>
</ul>

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 图标名称   | string  |   —    |    —     |
