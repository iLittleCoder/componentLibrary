## Icon 图标

提供了一套常用的图标集合(包含 Gildata 和 elementUI 图标)。

### 使用方法

直接通过设置类名为 `Gildata-tick` 或 `el-icon-iconName` 来使用聚源和 element 图标即可。例如：

:::demo

```html
<p>jy-icon组件可以用来显示彩色和灰色图标</p>
<jy-row>
  <jy-icon name="Gildata-color-china"></jy-icon>
  <jy-icon name="Gildata-color-pdf"></jy-icon>
  <jy-icon name="Gildata-color-word"></jy-icon>
  <jy-icon name="Gildata-upside"></jy-icon>
  <jy-icon name="Gildata-place"></jy-icon>
</jy-row>
<p>i 标签只能用来显示灰色图标</p>
<jy-row>
  <i class="Gildata-tick"></i>
  <i class="Gildata-star1"></i>
  <i class="Gildata-enlarged"></i>
  <i class="Gildata-screen"></i>
</jy-row>
```

:::

### Gildata 灰色图标集合

<ul class="icon-list jy-icon-list">
  <li v-for="name in $GlIcon" :key="name">
    <span>
      <i :class="'Gildata-' + name"></i>
      <span class="icon-name">Gildata-{{name}}</span>
    </span>
  </li>
</ul>

### Gildata 彩色图标集合

<ul class="icon-list jy-icon-list">
  <li key="Gildata-color-china">
    <span>
      <jy-icon name="Gildata-color-china"></jy-icon>
      <br>
      <span class="icon-name">Gildata-color-china</span>
    </span>
  </li>
  <li v-for="name in $GlColorIcon" :key="name">
    <span>
      <svg class="icon svg-icon" aria-hidden="true">
        <use :xlink:href="'#Gildata-' + name"></use>
      </svg>
      <br>
      <span class="icon-name">Gildata-{{name}}</span>
    </span>
  </li>
</ul>

### Attributes

| 参数 | 说明     | 类型   | 可选值 | 默认值 |
| ---- | -------- | ------ | ------ | ------ |
| name | 图标名称 | string | —      | —      |
