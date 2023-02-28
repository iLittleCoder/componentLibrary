## Divider 分割线

区隔内容的分割线。

### 基础用法

对不同章节的文本段落进行分割。

:::demo
```html
<template>
  <div>
    <span>This is a list 1</span>
    <jy-divider></jy-divider>
    <span>This is a list 2</span>
    <jy-divider></jy-divider>
    <span>This is a list 3</span>
    <jy-divider type="dashed"></jy-divider>
    <span>This is a list 4</span>
    <jy-divider type="dashed"></jy-divider>
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
    <jy-divider content-position="left">Text</jy-divider>
    <span>This is a list, This is a list</span>
    <jy-divider><i class="Gildata-star1"></i></jy-divider>
    <span>This is a list, This is a list</span>
    <jy-divider content-position="right">Text</jy-divider>
  </div>
</template>
```
:::

### 垂直分割

:::demo
```html
<template>
  <div>
    <span class="jy-vertical__span">Tab A</span>
    <jy-divider direction="vertical"></jy-divider>
    <span class="jy-vertical__span">Tab B</span>
    <jy-divider direction="vertical"></jy-divider>
    <span class="jy-vertical__span">Tab C</span>
  </div>
</template>
```
:::

### Divider Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| direction      | 设置分割线方向  | string  |            horizontal / vertical          |    horizontal     |
| content-position      | 设置分割线文案的位置 | string  |  left / right / center  |  center |
