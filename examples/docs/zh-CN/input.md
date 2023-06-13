## Input 输入框

通过鼠标或键盘输入字符

:::warning
Input 为受控组件，它**总会显示 Vue 绑定值**。

通常情况下，应当处理 `input` 事件，并更新组件的绑定值（或使用`v-model`）。否则，输入框内显示的值将不会改变。

不支持 `v-model` 修饰符。
:::

### 基础用法

:::demo

```html
<gj-input v-model="input" placeholder="请输入内容" class="normal-input"></gj-input>

<script>
  export default {
    data() {
      return {
        input: ''
      };
    }
  };
</script>
```

:::

### 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件

```html
<gj-input placeholder="请输入内容" v-model="input" :disabled="true" class="normal-input"> </gj-input>

<script>
  export default {
    data() {
      return {
        input: '禁用'
      };
    }
  };
</script>
```

:::

### 其他状态

:::demo 通过 `state=success,warning,danger` 属性指定 input 组件的状态

```html
<gj-input
  placeholder="success"
  v-model="inputSuccess"
  :state="successStatus"
  @blur="handleSuccessBlur"
  class="normal-input"
>
  <span slot="suffix" v-if="successStatus!=='primary'">
    <gj-icon name="Gildata-color-correct1"></gj-icon>
  </span>
</gj-input>
<gj-input class="normal-input" placeholder="danger" v-model="inputError" :state="errorStatus" @blur="handleErrorBlur">
  <span slot="suffix" v-if="errorStatus!=='primary'">
    <gj-icon name="Gildata-color-error1"></gj-icon>
  </span>
</gj-input>

<gj-input class="normal-input" placeholder="warning" v-model="inputWarn" :state="warnStatus" @blur="handleWarnBlur">
  <span slot="suffix" v-if="warnStatus!=='primary'">
    <gj-icon name="Gildata-color-warning1"></gj-icon>
  </span>
</gj-input>

<script>
  export default {
    data() {
      return {
        inputSuccess: '',
        inputError: '',
        inputWarn: '',
        successStatus: 'primary',
        errorStatus: 'primary',
        warnStatus: 'primary'
      };
    },
    methods: {
      handleSuccessBlur() {
        this.successStatus = 'success';
      },
      handleErrorBlur() {
        this.errorStatus = 'danger';
      },
      handleWarnBlur() {
        this.warnStatus = 'warning';
      }
    }
  };
</script>
```

:::

### 可清空

:::demo 使用`clearable`属性即可得到一个可清空的输入框

```html
<gj-input placeholder="请输入内容" v-model="input" clearable size="large" class="normal-input"> </gj-input>
<gj-input placeholder="请输入内容" v-model="input1" clearable size="medium" class="normal-input"> </gj-input>
<gj-input placeholder="请输入内容" v-model="input2" clearable class="normal-input"> </gj-input>

<gj-input placeholder="请输入内容" v-model="input3" clearable size="mini" class="normal-input"> </gj-input>

<script>
  export default {
    data() {
      return {
        input: '',
        input1: '',
        input2: '',
        input3: ''
      };
    }
  };
</script>
```

:::

### 密码框

:::demo 使用`show-password`属性即可得到一个可切换显示隐藏的密码框

```html
<gj-input placeholder="请输入密码" v-model="input" clearable class="normal-input"></gj-input>
<gj-input placeholder="请输入密码" v-model="input2" show-password clearable class="normal-input"></gj-input>

<script>
  export default {
    data() {
      return {
        input: '',
        input2: ''
      };
    }
  };
</script>
```

:::

### 带 icon 的输入框

带有图标标记输入类型

:::demo 可以通过 `prefix-icon` 和 `suffix-icon` 属性在 input 组件首部和尾部增加显示图标，也可以通过 slot 来放置图标。

```html
<div class="demo-input-suffix">
  属性方式：
  <gj-input placeholder="请选择日期" suffix-icon="Gildata-calendar" v-model="input1" size="large" class="normal-input">
  </gj-input>
  <gj-input placeholder="请输入内容" prefix-icon="Gildata-user" v-model="input2" class="normal-input"> </gj-input>
</div>
<div class="demo-input-suffix">
  slot 方式：
  <gj-input placeholder="请选择日期" v-model="input3" class="normal-input">
    <i slot="suffix" class="gj-input__icon Gildata-calendar"></i>
  </gj-input>
  <gj-input placeholder="请输入内容" v-model="input4" class="normal-input">
    <i slot="prefix" class="gj-input__icon Gildata-user"></i>
  </gj-input>
</div>
<div class="demo-input-suffix">
  左右都有icon：
  <gj-input placeholder="请选择日期" v-model="input3" class="normal-input">
    <i slot="suffix" class="gj-input__icon Gildata-calendar"></i>
    <i slot="prefix" class="gj-input__icon Gildata-user"></i>
  </gj-input>
</div>

<script>
  export default {
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        input4: ''
      };
    }
  };
</script>
```

:::

### 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。

:::demo 文本域高度可通过 `rows` 属性控制

```html
<gj-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </gj-input>

<script>
  export default {
    data() {
      return {
        textarea: ''
      };
    }
  };
</script>
```

:::

### 可自适应文本高度的文本域

通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。

:::demo

```html
<gj-input type="textarea" autosize placeholder="请输入内容" v-model="textarea1"> </gj-input>
<div style="margin: 20px 0;"></div>
<gj-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2">
</gj-input>

<script>
  export default {
    data() {
      return {
        textarea1: '',
        textarea2: ''
      };
    }
  };
</script>
```

:::

### 前缀和尾缀标签组合

可前置或后置元素，一般为标签或按钮

:::demo 可通过 slot 来指定在 input 中前置或者后置内容。

```html
<div>
  <gj-input placeholder="请输入内容" v-model="input1">
    <template slot="prepend"
      >Http://</template
    >
  </gj-input>
</div>
<div style="margin-top: 15px;">
  <gj-input placeholder="请输入内容" v-model="input2">
    <template slot="append"
      >.com</template
    >
  </gj-input>
</div>
<div style="margin-top: 15px;">
  <gj-input placeholder="请输入内容" v-model="input3" class="input-with-select">
    <gj-select border v-model="select" slot="prepend" placeholder="请选择">
      <gj-option label="恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>
    <gj-button slot="append" icon="Gildata-search1" type="primary"></gj-button>
  </gj-input>
</div>
<style>
  .gj-select .gj-input {
    width: 230px;
  }
  .input-with-select .gj-input-group__prepend {
    background-color: #fff;
  }
</style>
<script>
  export default {
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        select: ''
      };
    }
  };
</script>
```

:::

### 尺寸

:::demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。

```html
<div class="demo-input-size">
  <gj-input size="large" placeholder="请输入内容" suffix-icon="Gildata-calendar" v-model="input1" class="normal-input">
  </gj-input>
  <gj-input size="medium" placeholder="请输入内容" suffix-icon="Gildata-calendar" v-model="input2" class="normal-input">
  </gj-input>
  <gj-input placeholder="请输入内容" suffix-icon="Gildata-calendar" v-model="input3" class="normal-input"> </gj-input>
  <gj-input size="mini" placeholder="请输入内容" suffix-icon="Gildata-calendar" v-model="input4" class="normal-input">
  </gj-input>
</div>

<script>
  export default {
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        input4: ''
      };
    }
  };
</script>
```

:::

### 带输入建议

根据输入内容提供对应的输入建议

:::demo autocomplete 是一个可带输入建议的输入框组件，`fetch-suggestions` 是一个返回输入建议的方法属性，如 querySearch(queryString, cb)，在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中。

```html
<gj-row class="demo-autocomplete">
  <gj-col :span="12">
    <div class="sub-title">激活即列出输入建议</div>
    <gj-autocomplete
      class="inline-input"
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></gj-autocomplete>
  </gj-col>
  <gj-col :span="12">
    <div class="sub-title">输入后匹配输入建议</div>
    <gj-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></gj-autocomplete>
  </gj-col>
</gj-row>
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
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
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
<gj-autocomplete
  popper-class="my-autocomplete"
  v-model="state"
  :fetch-suggestions="querySearch"
  placeholder="请输入内容"
  @select="handleSelect"
>
  <i class="Gildata-edit gj-input__icon" slot="suffix" @click="handleIconClick"> </i>
  <template slot-scope="{ item }">
    <div class="name">{{ item.value }}</div>
    <span class="addr">{{ item.address }}</span>
  </template>
</gj-autocomplete>

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
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
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
<gj-autocomplete
  v-model="state"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  @select="handleSelect"
></gj-autocomplete>
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
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
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

### 输入长度限制

:::demo `maxlength` 和 `minlength` 是原生属性，用来限制输入框的字符长度，其中字符长度是用 Javascript 的字符串长度统计的。对于类型为 `text` 或 `textarea` 的输入框，在使用 `maxlength` 属性限制最大输入长度的同时，可通过设置 `show-word-limit` 属性来展示字数统计。

```html
<gj-input type="text" placeholder="请输入内容" v-model="text" maxlength="10" show-word-limit class="normal-input">
</gj-input>
<div style="margin: 20px 0;"></div>
<gj-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="30" show-word-limit> </gj-input>

<script>
  export default {
    data() {
      return {
        text: '',
        textarea: ''
      };
    }
  };
</script>
```

:::

### 带下拉输入框

可前置或后置元素，一般为标签或按钮

:::demo 可通过 slot 来指定在 input 中前置或者后置内容。

```html
<div style="width:260px">
  <gj-input placeholder="请输入内容" v-model="input1" class="input-select-append">
    <gj-select border v-model="select" slot="append" placeholder="请选择">
      <gj-option label=" 恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>
  </gj-input>
</div>

<div style="width:260px; margin-top:20px">
  <gj-input placeholder="请输入内容" v-model="input1" class="input-select-append">
    <gj-select disabled border v-model="select1" slot="append" placeholder="请选择">
      <gj-option label="恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>
  </gj-input>
</div>
<style></style>
<script>
  export default {
    data() {
      return {
        input1: '',
        select: '',
        select1: ''
      };
    }
  };
</script>
```

:::

### 常见搜索框

可前置或后置元素，一般为标签或按钮

:::demo 可通过 slot 来指定在 input 中前置或者后置内容。

```html
<div style="width:260px">
  <gj-input placeholder="请输入内容" v-model="input1">
    <template slot="append">
      <div class="input-append1 cursor-pointer" @click="handleSearch1">
        <span v-if="!loading1">搜索 </span>
        <i class="Gildata-loading" v-else></i>
      </div>
    </template>
  </gj-input>
</div>
<div style="margin-top: 15px; width:260px">
  <gj-input placeholder="请输入内容" v-model="input2">
    <template slot="append">
      <div class="input-append2 cursor-pointer" @click="handleSearch2">
        <gj-icon v-if="!loading2" name="Gildata-search1"></gj-icon>
        <gj-icon v-else name="Gildata-loading"></gj-icon>
      </div>
    </template>
  </gj-input>
</div>

<div style="margin-top: 15px; width:260px" class="input-append-bg-white">
  <gj-input placeholder="请输入内容" v-model="input3">
    <template slot="append">
      <div class="input-append3 cursor-pointer" @click="handleSearch3">
        <gj-icon v-if="!loading3" name="Gildata-search1"></gj-icon>
        <gj-icon v-else name="Gildata-loading"></gj-icon>
      </div>
    </template>
  </gj-input>
</div>

<div style="margin-top: 15px;">
  <gj-input style="width:260px" placeholder="请输入内容" v-model="input4">
    <template slot="suffix">
      <span @click="handleSearch4" class="color-pimary">
        <i class="Gildata-search1 cursor-pointer search-item" v-if="!loading4"></i>
        <i class="Gildata-loading cursor-pointer loading-item" v-else></i>
      </span>
    </template>
  </gj-input>
</div>

<script>
  export default {
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        input4: '',

        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false
      };
    },
    methods: {
      handleSearch1() {
        this.loading1 = true;
        setTimeout(() => {
          this.loading1 = false;
        }, 2000);
      },
      handleSearch2() {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
        }, 2000);
      },
      handleSearch3() {
        this.loading3 = true;
        setTimeout(() => {
          this.loading3 = false;
        }, 2000);
      },
      handleSearch4() {
        this.loading4 = true;
        setTimeout(() => {
          this.loading4 = false;
        }, 2000);
      }
    }
  };
</script>

<style lang="scss">
  .color-pimary {
    .search-item {
      color: var(--color-text-regular);
      &:hover {
        color: var(--color-primary-hover);
      }
      &:active {
        color: var(--color-primary-pressed);
      }
    }
    .loading-item {
      color: var(--color-primary);
    }
  }
</style>
```

:::

### 组合输入框

可前置或后置元素，一般为标签或按钮

:::demo 可通过 slot 来指定在 input 中前置或者后置内容。

```html
<div style="width:260px" class="input-with-select input-select-width">
  <gj-input placeholder="请输入内容" v-model="input1">
    <gj-select selectWidth="88px" border v-model="select1" slot="prepend" placeholder="请选择">
      <gj-option label="恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>

    <template slot="append">
      <div class="input-append1 cursor-pointer" @click="handleSearch1">
        <span v-if="!loading1">搜索 </span>
        <i class="Gildata-loading" v-else></i>
      </div>
    </template>
  </gj-input>
</div>
<div style="margin-top: 15px; width:260px" class="input-with-select input-select-width">
  <gj-input placeholder="请输入内容" v-model="input2">
    <gj-select border v-model="select2" slot="prepend" placeholder="请选择">
      <gj-option label="恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>
    <template slot="append">
      <div class="input-append2 cursor-pointer" @click="handleSearch2">
        <gj-icon v-if="!loading2" name="Gildata-search1"></gj-icon>
        <gj-icon v-else name="Gildata-loading"></gj-icon>
      </div>
    </template>
  </gj-input>
</div>

<div style="margin-top: 15px; width:260px" class="input-append-bg-white input-with-select input-select-width">
  <gj-input placeholder="请输入内容" v-model="input3">
    <gj-select border v-model="select3" slot="prepend" placeholder="请选择">
      <gj-option label="恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>
    <template slot="append">
      <div class="input-append3 cursor-pointer" @click="handleSearch3">
        <gj-icon v-if="!loading3" name="Gildata-search1"></gj-icon>
        <gj-icon v-else name="Gildata-loading"></gj-icon>
      </div>
    </template>
  </gj-input>
</div>

<div style="margin-top: 15px;" class="input-with-select input-select-width">
  <gj-input style="width:260px" placeholder="请输入内容" v-model="input4">
    <gj-select border v-model="select4" slot="prepend" placeholder="请选择">
      <gj-option label="恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>
    <template slot="suffix">
      <span @click="handleSearch4" class="color-pimary">
        <i class="Gildata-search1 cursor-pointer search-item" v-if="!loading4"></i>
        <i class="Gildata-loading cursor-pointer loading-item" v-else></i>
      </span>
    </template>
  </gj-input>
</div>

<div style="margin-top: 15px;" class="input-with-select input-select-width">
  <gj-input style="width:260px" placeholder="请输入内容" v-model="input6">
    <gj-select border v-model="select6" slot="prepend" placeholder="请选择">
      <gj-option label="恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>
    <template slot="prefix">
      <span class="color-info">
        ¥
      </span>
    </template>
    <template slot="suffix">
      <span class="color-info">
        RMB
      </span>
    </template>
  </gj-input>
</div>

<div style="margin-top: 15px;" class="input-with-select input-select-width">
  <gj-input style="width:260px" placeholder="请输入内容" v-model="input7" maxlength="10" show-word-limit>
    <gj-select border v-model="select7" slot="prepend" placeholder="请选择">
      <gj-option label="恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>
  </gj-input>
</div>

<div style="margin-top: 15px;" class="input-append-bg-white input-with-select input-select-width">
  <gj-input style="width:260px" placeholder="请输入内容" v-model="input8">
    <template slot="prefix">
      <i class="gj-input__icon Gildata-user"></i>
    </template>
    <gj-select border v-model="select8" slot="append" placeholder="请选择">
      <gj-option label="恒生电子" value="1"></gj-option>
      <gj-option label="恒生聚源" value="2"></gj-option>
      <gj-option label="数字丹喔" value="3"></gj-option>
    </gj-select>
  </gj-input>
</div>

<script>
  export default {
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        input4: '',

        select1: '',
        select2: '',
        select3: '',
        select4: '',

        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false,

        input5: '',
        select5: '',
        input6: '',
        select6: '',
        input7: '',
        select7: '',
        input8: '',
        select8: ''
      };
    },
    methods: {
      handleSearch1() {
        this.loading1 = true;
        setTimeout(() => {
          this.loading1 = false;
        }, 2000);
      },
      handleSearch2() {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
        }, 2000);
      },
      handleSearch3() {
        this.loading3 = true;
        setTimeout(() => {
          this.loading3 = false;
        }, 2000);
      },
      handleSearch4() {
        this.loading4 = true;
        setTimeout(() => {
          this.loading4 = false;
        }, 2000);
      },
      handleBlur(e) {
        let value = e.target.value;
        if (!!value && !isNaN(value)) {
          this.input5 = e.target.value;
        } else {
          this.input5 = '';
        }
      },
      handleUp() {
        if (!this.input5) {
          this.input5 = 1;
        } else {
          this.input5 = this.input5 + 1;
        }
      },
      handleDown() {
        if (!this.input5) {
          this.input5 = 0;
        } else {
          this.input5 = this.input5 - 1;
        }
      }
    }
  };
</script>

<style lang="scss">
  .color-pimary {
    .search-item {
      color: var(--color-text-regular);
      &:hover {
        color: var(--color-primary-hover);
      }
      &:active {
        color: var(--color-primary-pressed);
      }
    }
    .loading-item {
      color: var(--color-primary);
    }
  }
</style>
```

:::

### Input Attributes

| 参数            | 说明                                                                                    | 类型             | 可选值                                                                                                                                | 默认值 |
| --------------- | --------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| type            | 类型                                                                                    | string           | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text   |
| value / v-model | 绑定值                                                                                  | string / number  | —                                                                                                                                     | —      |
| maxlength       | 原生属性，最大输入长度                                                                  | number           | —                                                                                                                                     | —      |
| minlength       | 原生属性，最小输入长度                                                                  | number           | —                                                                                                                                     | —      |
| show-word-limit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效                | boolean          | —                                                                                                                                     | false  |
| placeholder     | 输入框占位文本                                                                          | string           | —                                                                                                                                     | —      |
| clearable       | 是否可清空                                                                              | boolean          | —                                                                                                                                     | false  |
| show-password   | 是否显示切换密码图标                                                                    | boolean          | —                                                                                                                                     | false  |
| disabled        | 禁用                                                                                    | boolean          | —                                                                                                                                     | false  |
| size            | 输入框尺寸，只在 `type!="textarea"` 时有效                                              | string           | large / medium / mini                                                                                                                 | —      |
| prefix-icon     | 输入框头部图标                                                                          | string           | —                                                                                                                                     | —      |
| suffix-icon     | 输入框尾部图标                                                                          | string           | —                                                                                                                                     | —      |
| rows            | 输入框行数，只对 `type="textarea"` 有效                                                 | number           | —                                                                                                                                     | 2      |
| autosize        | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object | —                                                                                                                                     | false  |
| autocomplete    | 原生属性，自动补全                                                                      | string           | on, off                                                                                                                               | off    |
| auto-complete   | 下个主版本弃用                                                                          | string           | on, off                                                                                                                               | off    |
| name            | 原生属性                                                                                | string           | —                                                                                                                                     | —      |
| readonly        | 原生属性，是否只读                                                                      | boolean          | —                                                                                                                                     | false  |
| max             | 原生属性，设置最大值                                                                    | —                | —                                                                                                                                     | —      |
| min             | 原生属性，设置最小值                                                                    | —                | —                                                                                                                                     | —      |
| step            | 原生属性，设置输入字段的合法数字间隔                                                    | —                | —                                                                                                                                     | —      |
| resize          | 控制是否能被用户缩放                                                                    | string           | none, both, horizontal, vertical                                                                                                      | —      |
| autofocus       | 原生属性，自动获取焦点                                                                  | boolean          | true, false                                                                                                                           | false  |
| form            | 原生属性                                                                                | string           | —                                                                                                                                     | —      |
| label           | 输入框关联的 label 文字                                                                 | string           | —                                                                                                                                     | —      |
| tabindex        | 输入框的 tabindex                                                                       | string           | -                                                                                                                                     | -      |
| validate-event  | 输入时是否触发表单的校验                                                                | boolean          | -                                                                                                                                     | true   |
| sate            | 输入框状态                                                                              | string           | success,waring,danger,normal                                                                                                          | normal |

### Input Slots

| name    | 说明                                    |
| ------- | --------------------------------------- |
| prefix  | 输入框头部内容，只对 `type="text"` 有效 |
| suffix  | 输入框尾部内容，只对 `type="text"` 有效 |
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append  | 输入框后置内容，只对 `type="text"` 有效 |

### Input Events

| 事件名称 | 说明                                          | 回调参数                  |
| -------- | --------------------------------------------- | ------------------------- |
| blur     | 在 Input 失去焦点时触发                       | (event: Event)            |
| focus    | 在 Input 获得焦点时触发                       | (event: Event)            |
| change   | 仅在输入框失去焦点或用户按下回车时触发        | (value: string \| number) |
| input    | 在 Input 值改变时触发                         | (value: string \| number) |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发 | —                         |

### Input Methods

| 方法名 | 说明                | 参数 |
| ------ | ------------------- | ---- |
| focus  | 使 input 获取焦点   | —    |
| blur   | 使 input 失去焦点   | —    |
| select | 选中 input 中的文字 | —    |

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
