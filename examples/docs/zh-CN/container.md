## Container 布局容器
用于布局的容器组件，方便快速搭建页面的基本结构：

`<jy-container>`：外层容器。当子元素中包含 `<jy-header>` 或 `<jy-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<jy-header>`：顶栏容器。

`<jy-aside>`：侧边栏容器。

`<jy-main>`：主要区域容器。

`<jy-footer>`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<jy-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<jy-container>`。
:::

### 常见页面布局

:::demo
```html
<jy-container>
  <jy-header>Header</jy-header>
  <jy-main>Content</jy-main>
</jy-container>

<jy-container>
  <jy-header>Header</jy-header>
  <jy-main>Content</jy-main>
  <jy-footer>Footer</jy-footer>
</jy-container>

<jy-container>
  <jy-aside width="200px">Aside</jy-aside>
  <jy-main>Content</jy-main>
</jy-container>

<jy-container>
  <jy-header>Header</jy-header>
  <jy-container>
    <jy-aside width="200px">Aside</jy-aside>
    <jy-main>Content</jy-main>
  </jy-container>
</jy-container>

<jy-container>
  <jy-header>Header</jy-header>
  <jy-container>
    <jy-aside width="200px" style="line-height: 260px;">Aside</jy-aside>
    <jy-container>
      <jy-main>Content</jy-main>
      <jy-footer>Footer</jy-footer>
    </jy-container>
  </jy-container>
</jy-container>

<jy-container>
  <jy-aside width="200px" style="line-height: 260px;">Aside</jy-aside>
  <jy-container>
    <jy-header>Header</jy-header>
    <jy-main>Content</jy-main>
  </jy-container>
</jy-container>

<jy-container>
  <jy-aside width="200px" style="line-height: 320px;">Aside</jy-aside>
  <jy-container>
    <jy-header>Header</jy-header>
    <jy-main>Content</jy-main>
    <jy-footer>Footer</jy-footer>
  </jy-container>
</jy-container>
```
:::

<!--
### 示例

:::demo
```html
<jy-container style="height: 500px; border: 1px solid #eee">
  <jy-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <jy-menu :default-openeds="['1', '3']">
      <jy-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <jy-menu-item-group>
          <template slot="title">分组一</template>
          <jy-menu-item index="1-1">选项1</jy-menu-item>
          <jy-menu-item index="1-2">选项2</jy-menu-item>
        </jy-menu-item-group>
        <jy-menu-item-group title="分组2">
          <jy-menu-item index="1-3">选项3</jy-menu-item>
        </jy-menu-item-group>
        <jy-submenu index="1-4">
          <template slot="title">选项4</template>
          <jy-menu-item index="1-4-1">选项4-1</jy-menu-item>
        </jy-submenu>
      </jy-submenu>
      <jy-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <jy-menu-item-group>
          <template slot="title">分组一</template>
          <jy-menu-item index="2-1">选项1</jy-menu-item>
          <jy-menu-item index="2-2">选项2</jy-menu-item>
        </jy-menu-item-group>
        <jy-menu-item-group title="分组2">
          <jy-menu-item index="2-3">选项3</jy-menu-item>
        </jy-menu-item-group>
        <jy-submenu index="2-4">
          <template slot="title">选项4</template>
          <jy-menu-item index="2-4-1">选项4-1</jy-menu-item>
        </jy-submenu>
      </jy-submenu>
      <jy-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <jy-menu-item-group>
          <template slot="title">分组一</template>
          <jy-menu-item index="3-1">选项1</jy-menu-item>
          <jy-menu-item index="3-2">选项2</jy-menu-item>
        </jy-menu-item-group>
        <jy-menu-item-group title="分组2">
          <jy-menu-item index="3-3">选项3</jy-menu-item>
        </jy-menu-item-group>
        <jy-submenu index="3-4">
          <template slot="title">选项4</template>
          <jy-menu-item index="3-4-1">选项4-1</jy-menu-item>
        </jy-submenu>
      </jy-submenu>
    </jy-menu>
  </jy-aside>
  
  <jy-container>
    <jy-header style="text-align: right; font-size: 12px">
      <jy-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <jy-dropdown-menu slot="dropdown">
          <jy-dropdown-item>查看</jy-dropdown-item>
          <jy-dropdown-item>新增</jy-dropdown-item>
          <jy-dropdown-item>删除</jy-dropdown-item>
        </jy-dropdown-menu>
      </jy-dropdown>
      <span>王小虎</span>
    </jy-header>
    
    <jy-main>
      <jy-table :data="tableData">
        <jy-column field="date" title="日期" width="140">
        </jy-column>
        <jy-column field="name" title="姓名" width="120">
        </jy-column>
        <jy-column field="address" title="地址">
        </jy-column>
      </jy-table>
    </jy-main>
  </jy-container>
</jy-container>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
```
:::
-->


### Container Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `jy-header` 或 `jy-footer` 时为 vertical，否则为 horizontal |

### Header Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 顶栏高度 | string | — | 60px |

### Aside Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 侧边栏宽度 | string | — | 300px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |
