## Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

### 基础用法

适用广泛的基础用法。

:::demo 在`jy-breadcrumb`中使用`jy-breadcrumb-item`标签表示从首页开始的每一级。GildataDesign 提供了一个`separator`属性，在`jy-breadcrumb`标签中设置它来决定分隔符，它只能是字符串，默认为斜杠`/`。

```html
<jy-breadcrumb separator="/">
  <jy-breadcrumb-item>首页</jy-breadcrumb-item>
  <jy-breadcrumb-item actived><a href="/">活动管理</a></jy-breadcrumb-item>
  <jy-breadcrumb-item>活动列表</jy-breadcrumb-item>
  <jy-breadcrumb-item disabled>活动详情</jy-breadcrumb-item>
</jy-breadcrumb>
```

:::

### 折叠面包屑

:::demo 通过设置 collapse 开启折叠面包屑，默认 jy-breadcrumb-item 超过 5 项开始折叠，保留前两项和最后一项，其他中间项都放到下拉菜单中

```html
<jy-breadcrumb trigger="click" collapse :collapse-number="5">
  <jy-breadcrumb-item>首页</jy-breadcrumb-item>
  <jy-breadcrumb-item>活动管理</jy-breadcrumb-item>
  <jy-breadcrumb-item>活动列表</jy-breadcrumb-item>
  <jy-breadcrumb-item>活动详情</jy-breadcrumb-item>
  <jy-breadcrumb-item>活动内容</jy-breadcrumb-item>
  <jy-breadcrumb-item actived>活动时间</jy-breadcrumb-item>
</jy-breadcrumb>
```

:::

### 图标分隔符

:::demo 通过设置 separator-class 可使用相应的 iconfont 作为分隔符，注意这将使 separator 设置失效

```html
<jy-breadcrumb separator-class="Gildata-rightarrow">
  <jy-breadcrumb-item :to="{ path: '/' }">首页</jy-breadcrumb-item>
  <jy-breadcrumb-item>活动管理</jy-breadcrumb-item>
  <jy-breadcrumb-item>活动列表</jy-breadcrumb-item>
  <jy-breadcrumb-item actived>活动详情</jy-breadcrumb-item>
</jy-breadcrumb>
```

:::

### Breadcrumb Attributes

| 参数            | 说明                               | 类型    | 可选值       | 默认值  |
| --------------- | ---------------------------------- | ------- | ------------ | ------- |
| separator       | 分隔符                             | string  | —            | 斜杠'/' |
| separator-class | 图标分隔符 class                   | string  | —            | -       |
| collapse        | 开启折叠面包屑（新增属性）         | boolean | —            | false   |
| collapse-number | 超过多少项以后开始折叠（新增属性） | number  | —            | 5       |
| trigger         | 触发下拉的行为（新增属性）         | string  | hover, click | hover   |

### Breadcrumb Item Attributes

| 参数     | 说明                                                               | 类型          | 可选值 | 默认值 |
| -------- | ------------------------------------------------------------------ | ------------- | ------ | ------ |
| actived  | 激活状态                                                           | boolean       | —      | false  |
| to       | 路由跳转对象，同 `vue-router` 的 `to`                              | string/object | —      | —      |
| replace  | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | boolean       | —      | false  |
| disabled | 是否禁用状态(新增属性)                                             | boolean       | —      | false  |
