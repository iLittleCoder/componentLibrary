## Empty 空状态

空状态时的占位提示。

### 示例

:::demo

```html
<template>
  <div class="empty-box">
    <gj-empty empty-type="noResult" description="无搜索结果"></gj-empty>
    <gj-empty empty-type="noData"></gj-empty>
    <gj-empty empty-type="noPermission">
      <gj-button size="medium" type="text">申请权限</gj-button>
    </gj-empty>
  </div>
  <div class="empty-box">
    <gj-empty empty-type="noFreetime">
      <gj-button size="medium" type="text">重试</gj-button>
    </gj-empty>
    <gj-empty empty-type="noWifi">
      <gj-button size="medium" type="text">刷新</gj-button>
    </gj-empty>
    <gj-empty empty-type="noCollect">
      <gj-button size="medium" type="text">随便看看</gj-button>
    </gj-empty>
  </div>
  <div class="empty-box">
    <gj-empty empty-type="noSubscribe"></gj-empty>
  </div>
</template>
```

:::

### 基础用法

:::demo

```html
<gj-empty description="描述文字"></gj-empty>
```

:::

### 自定义图片

通过设置 `image` 属性传入图片 URL。

:::demo

```html
<gj-empty
  image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic.julive.com%2Fm%2Fimages%2Fproject_home%2Fimg-detail-nodata.png%3Ft%3D20200929_171944&refer=http%3A%2F%2Fstatic.julive.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659690132&t=52358ed5cd4bb969c10f6fa3b56d624b"
></gj-empty>
```

:::

### 图片尺寸

通过设置 `image-size` 属性来控制图片大小。

:::demo

```html
<gj-empty :image-size="160"></gj-empty>
```

:::

### 底部内容

使用默认插槽可在底部插入内容。

:::demo

```html
<gj-empty :image-size="160">
  <gj-button type="primary">按钮</gj-button>
</gj-empty>
```

:::

### Empty Attributes

| 参数        | 说明                        | 类型   | 可选值                                  | 默认值 |
| ----------- | --------------------------- | ------ | --------------------------------------- | ------ |
| emptyType   | 描述 empty 类型（新增属性） | string | noData/noPermission/noResult            | noData |
|             |                             |        | noCollect/noFreetime/noWifi/noSubscribe |        |
| image       | 图片地址                    | string | —                                       | —      |
| image-size  | 图片大小（宽度）            | number | —                                       | —      |
| description | 文本描述                    | string | —                                       | —      |

### Empty Slots

| Name        | 说明           |
| ----------- | -------------- |
| default     | 自定义底部内容 |
| image       | 自定义图片     |
| description | 自定义描述文字 |
