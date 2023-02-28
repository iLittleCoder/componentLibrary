## Result 结果

用于对用户的操作结果或者异常状态做反馈。

### 基础用法

:::demo

```html
<jy-row>
  <jy-col :sm="12" :lg="6">
    <jy-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <jy-button type="primary">返回</jy-button>
      </template>
    </jy-result>
  </jy-col>
  <jy-col :sm="12" :lg="6">
    <jy-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <jy-button type="primary">返回</jy-button>
      </template>
    </jy-result>
  </jy-col>
  <jy-col :sm="12" :lg="6">
    <jy-result icon="error" title="错误提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <jy-button type="primary">返回</jy-button>
      </template>
    </jy-result>
  </jy-col>
  <jy-col :sm="12" :lg="6">
    <jy-result icon="info" title="信息提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <jy-button type="primary">返回</jy-button>
      </template>
    </jy-result>
  </jy-col>
</jy-row>
```

:::

### 自定义内容

:::demo

```html
<jy-result title="404" subTitle="抱歉，请求错误">
  <template slot="icon">
    <jy-image style="width: 160px;" :src="src"></jy-image>
  </template>
  <template slot="extra">
    <jy-button type="primary" size="medium">返回</jy-button>
  </template>
</jy-result>

<script>
  export default {
    data() {
      return {
        src: require('../../assets/images/result-title.jpg')
      }
    }
  }
</script>
```

:::

### Result Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| title          | 标题         | string  |          —             |    —     |
| sub-title    | 二级标题  | string | — |    —  |
| icon  | 图标类型    | string  |    success / warning / info / error  |  info |

### Result Slots

| Name | 说明 |
|------|--------|
| icon | 自定义图标  |
| title | 自定义标题     |
| subTitle | 自定义二级标题     |
| extra | 自定义底部额外区域     |
