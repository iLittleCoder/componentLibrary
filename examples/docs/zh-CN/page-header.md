## PageHeader 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

### 基础

:::demo
```html
<jy-page-header @back="goBack" subtitle="这是一个副标题">
  <template slot="content">
    <jy-radio-group :show-background="false" v-model="radio1" size="mini">
       <jy-radio-button label="选项1"></jy-radio-button>
       <jy-radio-button label="选项2"></jy-radio-button>
       <jy-radio-button label="选项3"></jy-radio-button>
    </jy-radio-group>
</template>
</jy-page-header>

<script>
  export default {
    data() {
      return {
        radio1: '选项2'
      };
    },
    methods: {
      goBack() {
        console.log('go back');
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |------------------------------ | ------ |
| title     | 标题           | string    |  —                            | 返回   |
| content   | 内容           | string    |  —                            | —      |
| subtitle  | 副标题          | string    |  —                            | —      |


### Events
| 事件名称   | 说明           | 回调参数   |
|---------- |-------------- |---------- |
| back      | 点击左侧区域触发 | —        |

### Slots
| 事件名称    | 说明         |
|---------- |------------- |
| title     | 标题内容      |
| content   | 内容         |
