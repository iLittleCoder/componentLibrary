## Empty 空状态

空状态时的占位提示。

### 示例

:::demo

```html
<template>
  <div class="empty-box">
    <jy-empty empty-type="noResult" description="无搜索结果"></jy-empty>
    <jy-empty empty-type="noData"></jy-empty>
    <jy-empty empty-type="noPermission">
      <jy-button size="medium" type="text">申请权限</jy-button>
    </jy-empty>
  </div>
  <div class="empty-box">
    <jy-empty empty-type="noFreetime">
      <jy-button size="medium" type="text">重试</jy-button>
    </jy-empty>
    <jy-empty empty-type="noWifi">
      <jy-button size="medium" type="text">刷新</jy-button>
    </jy-empty>
    <jy-empty empty-type="noCollect">
      <jy-button size="medium" type="text">随便看看</jy-button>
    </jy-empty>
  </div>
  <div class="empty-box">
    <jy-empty empty-type="noSubscribe"></jy-empty>
  </div>
</template>
```

:::

### 基础用法

:::demo

```html
<jy-empty description="描述文字"></jy-empty>
```

:::

### 自定义图片

通过设置 `image` 属性传入图片 URL。

:::demo

```html
<jy-empty
  image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic.julive.com%2Fm%2Fimages%2Fproject_home%2Fimg-detail-nodata.png%3Ft%3D20200929_171944&refer=http%3A%2F%2Fstatic.julive.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659690132&t=52358ed5cd4bb969c10f6fa3b56d624b"
></jy-empty>
```

:::

### 图片尺寸

通过设置 `image-size` 属性来控制图片大小。

:::demo

```html
<jy-empty :image-size="160"></jy-empty>
```

:::

### 底部内容

使用默认插槽可在底部插入内容。

:::demo

```html
<jy-empty :image-size="160">
  <jy-button type="primary">按钮</jy-button>
</jy-empty>
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
