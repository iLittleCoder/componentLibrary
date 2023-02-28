## Autocomplete 自动完成

### 带输入建议

根据输入内容提供对应的输入建议

:::demo autocomplete 是一个可带输入建议的输入框组件，`fetch-suggestions` 是一个返回输入建议的方法属性，如 querySearch(queryString, cb)，在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中。

```html
<jy-row class="demo-autocomplete">
  <jy-col :span="12">
    <div class="sub-title">激活即列出输入建议</div>
    <jy-autocomplete
      ref="autoComplete"
      :noHighLight="false"
      class="inline-input"
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></jy-autocomplete>
  </jy-col>
  <jy-col :span="12">
    <div class="sub-title">输入后匹配输入建议</div>
    <jy-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></jy-autocomplete>
  </jy-col>
</jy-row>
<script>
  export default {
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (
            restaurant.value
              .toLowerCase()
              .indexOf(queryString.toLowerCase()) === 0
          );
        };
      },
      loadAll() {
        return [
          { value: '恒生电子', address: '上海市' },
          {
            value: '恒生聚源',
            address: '上海市'
          },
          { value: '阿里巴巴', address: '杭州市' },
          {
            value: '平安银行',
            address: '上海市'
          }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleFocus() {
        this.$refs.autoComplete.focus();
      },
      handleBlur() {
        this.$refs.autoComplete.blur();
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  };
</script>
```

:::

### 自定义模板

可自定义输入建议的显示

:::demo 使用`scoped slot`自定义输入建议的模板。该 scope 的参数为`item`，表示当前输入建议对象。

```html
<jy-autocomplete
  popper-class="my-autocomplete"
  v-model="state"
  :fetch-suggestions="querySearch"
  placeholder="请输入内容"
  @select="handleSelect"
>
  <i class="Gildata-edit jy-input__icon" slot="suffix" @click="handleIconClick">
  </i>
  <template slot-scope="{ item }">
    <div class="name">{{ item.value }}</div>
    <span class="addr">{{ item.address }}</span>
  </template>
</jy-autocomplete>

<style>
  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        restaurants: [],
        state: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (
            restaurant.value
              .toLowerCase()
              .indexOf(queryString.toLowerCase()) === 0
          );
        };
      },
      loadAll() {
        return [
          { value: '恒生电子', address: '上海市' },
          {
            value: '恒生聚源',
            address: '上海市'
          },
          { value: '阿里巴巴', address: '杭州市' },
          {
            value: '平安银行',
            address: '上海市'
          }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  };
</script>
```

:::

### 远程搜索

从服务端搜索数据

:::demo

```html
<jy-autocomplete
  v-model="state"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  @select="handleSelect"
></jy-autocomplete>
<script>
  export default {
    data() {
      return {
        restaurants: [],
        state: '',
        timeout: null
      };
    },
    methods: {
      loadAll() {
        return [
          { value: '恒生电子', address: '上海市' },
          {
            value: '恒生聚源',
            address: '上海市'
          },
          { value: '阿里巴巴', address: '杭州市' },
          {
            value: '平安银行',
            address: '上海市'
          }
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString
          ? restaurants.filter(this.createStateFilter(queryString))
          : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (
            state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  };
</script>
```

:::

### Autocomplete Attributes

| 参数                  | 说明                                                                                     | 类型                            | 可选值                                                         | 默认值       |
| --------------------- | ---------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------- | ------------ |
| placeholder           | 输入框占位文本                                                                           | string                          | —                                                              | —            |
| disabled              | 禁用                                                                                     | boolean                         | —                                                              | false        |
| value-key             | 输入建议对象中用于显示的键名                                                             | string                          | —                                                              | value        |
| value                 | 必填值，输入绑定值                                                                       | string                          | —                                                              | —            |
| debounce              | 获取输入建议的去抖延时                                                                   | number                          | —                                                              | 300          |
| placement             | 菜单弹出位置                                                                             | string                          | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |
| fetch-suggestions     | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它 | Function(queryString, callback) | —                                                              | —            |
| popper-class          | Autocomplete 下拉列表的类名                                                              | string                          | —                                                              | —            |
| trigger-on-focus      | 是否在输入框 focus 时显示建议列表                                                        | boolean                         | —                                                              | true         |
| name                  | 原生属性                                                                                 | string                          | —                                                              | —            |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件                           | boolean                         | —                                                              | false        |
| label                 | 输入框关联的 label 文字                                                                  | string                          | —                                                              | —            |
| prefix-icon           | 输入框头部图标                                                                           | string                          | —                                                              | —            |
| suffix-icon           | 输入框尾部图标                                                                           | string                          | —                                                              | —            |
| hide-loading          | 是否隐藏远程加载时的加载图标                                                             | boolean                         | —                                                              | false        |
| popper-append-to-body | 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false       | boolean                         | -                                                              | true         |
| highlight-first-item  | 是否默认突出显示远程搜索建议中的第一项                                                   | boolean                         | —                                                              | false        |
| no-high-light         | 是否使用上下按钮显示选项高亮                                                             | boolean                         | —                                                              | true         |

### Autocomplete Slots

| name    | 说明           |
| ------- | -------------- |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

### Autocomplete Scoped Slot

| name | 说明                            |
| ---- | ------------------------------- |
| —    | 自定义输入建议，参数为 { item } |

### Autocomplete Events

| 事件名称 | 说明                  | 回调参数                  |
| -------- | --------------------- | ------------------------- |
| select   | 点击选中建议项时触发  | 选中建议项                |
| change   | 在 Input 值改变时触发 | (value: string \| number) |

### Autocomplete Methods

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| focus  | 使 input 获取焦点 | -    |
| blur   | 使 input 失去焦点 | -    |
