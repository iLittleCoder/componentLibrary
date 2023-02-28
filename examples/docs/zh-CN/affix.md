## Affix 固钉

返回页面顶部的操作按钮

### 基础用法

固钉默认固定在页面顶部。

通过设置 offset 属性来改变吸顶距离，默认值为 0。
:::demo

```html
<template>
  <jy-affix :offset="120">
    <jy-button type="primary">Offset top 120px</jy-button>
  </jy-affix>
</template>
```

:::

### 指定容器

通过设置 target 属性，让固钉始终保持在容器内， 超过范围则隐藏。

请注意容器避免出现滚动条。

:::demo

```html
<template>
  <div class="affix-container">
    <jy-affix target=".affix-container" :offset="80">
      <jy-button type="primary">Target container</jy-button>
    </jy-affix>
  </div>
</template>
```

:::

### 固定位置

Affix 组件提供 2 个固定的位置参数 top 和 bottom。

通过设置 position 属性来改变固定位置，默认值为 top 。

:::demo

```html
<template>
  <jy-affix position="bottom" :offset="20" @scroll="handleScroll" @change="handleChange">
    <jy-button type="primary">Offset bottom 20px</jy-button>
  </jy-affix>
</template>
<script>
  export default {
    methods: {
      handleScroll(value) {
        // console.log('sssssssssssssssss', value);
      },
      handleChange(value) {
        console.log('handleChange', value);
      }
    }
  };
</script>
```

:::

### Attributes

| 参数     | 说明                 | 类型   | 可选值   | 默认值 |
| -------- | -------------------- | ------ | -------- | ------ |
| offset   | 偏移距离             | number |          | 0      |
| position | 位置                 | 'top'  | 'bottom' |        | 'top' |
| target   | 指定容器(css 选择器) | string |          |        |
| z-index  | z-index              | number |          | 100    |

### Events

| 事件名 | 说明                       | 回调参数                              |
| ------ | -------------------------- | ------------------------------------- |
| change | fixed 状态改变时触发的事件 | (fixed: Boolean)                      |
| scroll | 滚动时触发的事件           | ({scrollTop: Number, fixed: Boolean}) |

### Methods

| 事件名 | 说明             |
| ------ | ---------------- |
| update | 手动更新固钉状态 |

### Slot

| 插槽名 | 说明           |
| ------ | -------------- |
| -      | 自定义默认内容 |
