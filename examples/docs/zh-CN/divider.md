## Divider 分割线

区隔内容的分割线。

### 基础用法

对不同章节的文本段落进行分割。

:::demo
```html
<template>
  <div>
    <span>This is a list 1</span>
    <gj-divider></gj-divider>
    <span>This is a list 2</span>
    <gj-divider></gj-divider>
    <span>This is a list 3</span>
    <gj-divider type="dashed"></gj-divider>
    <span>This is a list 4</span>
    <gj-divider type="dashed"></gj-divider>
    <span>This is a list 5</span>
  </div>
</template>
```
:::

### 设置文案

可以在分割线上自定义文案内容。


:::demo
```html
<template>
  <div>
    <span>This is a list, This is a list</span>
    <gj-divider content-position="left">Text</gj-divider>
    <span>This is a list, This is a list</span>
    <gj-divider><i class="Gildata-star1"></i></gj-divider>
    <span>This is a list, This is a list</span>
    <gj-divider content-position="right">Text</gj-divider>
  </div>
</template>
```
:::

### 垂直分割

:::demo
```html
<template>
  <div>
    <span class="gj-vertical__span">Tab A</span>
    <gj-divider direction="vertical"></gj-divider>
    <span class="gj-vertical__span">Tab B</span>
    <gj-divider direction="vertical"></gj-divider>
    <span class="gj-vertical__span">Tab C</span>
  </div>
</template>
```
:::

### Divider Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| direction      | 设置分割线方向  | string  |            horizontal / vertical          |    horizontal     |
| content-position      | 设置分割线文案的位置 | string  |  left / right / center  |  center |
