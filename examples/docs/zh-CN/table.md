## Table 表格



用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础表格

基础的表格展示用法。

:::demo 当`gj-table`元素中注入`data`对象数组后，在`gj-column`中用`field`属性来对应对象中的键名即可填入数据，用`title`属性来定义表格的列名。可以使用`width`属性来定义列宽。
```html
<template>
  <div>
    <div style="margin-bottom: 20px;">
       <gj-button @click="allAlign = 'left'">居左</gj-button>
       <gj-button @click="allAlign = 'center'">居中</gj-button>
       <gj-button @click="allAlign = 'right'">居右</gj-button>
    </div>
       
    <gj-table
      :align="allAlign"
      :data="tableData"
      :resizable="false"
      :column-config="{
          resizable:false
      }"
      border="none"
    >
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
    </gj-table>

    <p class="tip">使用 `gj-column` 属性启用 hover 行高亮</p>

    <gj-table
      border
      show-header-overflow
      show-overflow
      highlight-hover-row
      :align="allAlign"
      :data="tableData">
      <gj-column type="seq" title="序号" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address"></gj-column>
    </gj-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allAlign: null,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ]
    }
  }
}
</script>
```
:::

### 带序号的表格

带序号表格展示用法。

:::demo 设置 `type=seq` 开启序号列。
```html
<template>
  <div>
    <p class="tip">设置  `type=seq`  开启序号列</p>

    <gj-table
      border
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>
    
    <p class="tip">使用  `seq-config={startIndex}`  自定义起始序号</p>

    <gj-table
      border
      highlight-hover-row
      :seq-config="{startIndex: 100}"
      :data="tableData">
      <gj-column type="seq" title="序号" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>


    
    <p class="tip">使用 ` seq-config={seqMethod}` 自定义方法</p>

    <gj-table
      border
      highlight-hover-row
      :seq-config="{seqMethod}"
      :data="tableData">
      <gj-column type="seq" title="序号" width="80"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>


  
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
     
    }
  },
  methods: {
    seqMethod ({ rowIndex }) {
      return `NO${rowIndex + 1000}`
    }
  }
}
</script>

```
:::

### 列宽

调整表格的列宽。

:::demo 
```html
<template>
  <div>
    <p class="tip">
      列宽，通过设置 `width` 参数，支持固定像素、百分比、等比例分配等，如果不设置则按照表格的宽度进行均匀分配<br>
      <span class="red">(注：不应该全部都使用固定像素，应该当所有列加起来的宽度小于表格宽度时，就会出现空白区，可以配合 "%" 或 "min-width" 实现等比例缩放)</span>
    </p>

    <gj-table
      border
      :data="tableData">
      <gj-column type="seq"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="role" title="Role"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="date" title="Date"></gj-column>
    </gj-table>

   

    <p class="tip">部分固定列宽，其余自适应</p>

    <gj-table
      border
      :data="tableData">
      <gj-column type="seq" width="80"></gj-column>
      <gj-column field="name" title="Name" width="200"></gj-column>
      <gj-column field="role" title="Role"></gj-column>
      <gj-column field="sex" title="Sex" width="140"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
    </gj-table>

   

    <p class="tip">设置固定和最小宽，实现等比例放大</p>

    <gj-table
      border
      :data="tableData">
      <gj-column type="seq" width="80"></gj-column>
      <gj-column field="name" title="Name" min-width="200"></gj-column>
      <gj-column field="role" title="Role" min-width="140"></gj-column>
      <gj-column field="sex" title="Sex" min-width="120"></gj-column>
      <gj-column field="age" title="Age" min-width="120"></gj-column>
    </gj-table>

   

    <p class="tip">设置百分比</p>

    <gj-table
      border
      :data="tableData">
      <gj-column type="seq" width="10%"></gj-column>
      <gj-column field="name" title="Name" width="30%"></gj-column>
      <gj-column field="role" title="Role" width="20%"></gj-column>
      <gj-column field="sex" title="Sex" width="20%"></gj-column>
      <gj-column field="age" title="Age" width="20%"></gj-column>
    </gj-table>

   
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
     
    }
  }
}
</script>


```
:::


### 自动换行

在非大数据表格（大数据表格需要开启虚拟滚动）的情况下，默认支持自动换行。

:::demo 
```html
<template>
  <div>
    <p class="tip">单元格超出指定宽度自动换行，通过设置 《a href="scroll-y"="{enabled: false} 关闭虚拟滚动，则支持自动换行</p>

    <gj-table
      :data="tableData"
      :scroll-y="{enabled: false}">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="role" title="Role"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
    </gj-table>

   

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop Develop Develop Develop Develop Develop Develop Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2', role: 'Designer', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Test', sex: 'Women', age: 24, address: 'Shanghai' }
      ],
      demoCodes: [
        `
        <gj-table
          :data="tableData"
          :scroll-y="{enabled: false}">
          <gj-column type="seq" width="60"></gj-column>
          <gj-column field="name" title="Name"></gj-column>
          <gj-column field="role" title="Role"></gj-column>
          <gj-column field="age" title="Age"></gj-column>
        </gj-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop Develop Develop Develop Develop Develop Develop Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2', role: 'Designer', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Test', sex: 'Women', age: 24, address: 'Shanghai' }
              ]
            }
          }
        }
        `
      ]
    }
  }
}
</script>


```
:::

### 单元格工具提示

单元格工具提示

:::demo 
```html
<template>
  <div>
    <p class="tip">
      通过 tooltip-config.showAll 开启全表工具提示，还可以配合 contentMethod 方法重写默认的提示内容，显示逻辑完全自定义控制，可以返回 null 使用默认的提示消息
      还可以设置 tooltip-config.enterable 允许鼠标进入 tooltip 中，通过 title-help 设置列标题的帮助提示消息
    </p>

    <gj-table
      show-footer
      :footer-method="footerMethod"
      :tooltip-config="{showAll: true, enterable: true, contentMethod: showTooltipMethod}"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="名称" :title-help="{message: '自定义帮助提示信息',icon: 'Gildata-gauge'}"></gj-column>
      <gj-column field="role" title="角色" :titlePrefix="{message: '自定义图标', icon: 'Gildata-map'}"></gj-column>
      <gj-column field="date" title="Date"></gj-column>
      <gj-column field="rate" title="Rate">
        <template #header>
          <span>自定义标题</span>
        </template>
      </gj-column>
      <gj-column field="address" title="Address" width="160"></gj-column>
      <gj-column type="html" field="content" title="Content" width="200"></gj-column>
    </gj-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { name: 'Test1', role: '前端', date: '2020-02-28', rate: 5, address: 'address1', content: 'xxxxx1<br>换行换行11111111111' },
        { name: 'Test2', role: '后端', date: '2020-02-22', rate: 2, address: 'address2\ntooltip文本换行\n换行xx', content: 'xxxxx1<br>换行换行2' },
        { name: 'Test3', role: '前端', date: '2020-01-01', rate: 0, address: 'address3\ntooltip文本换行\n换行xx', content: 'xxxxx1<br>换行换行<br>3333' },
        { name: 'Test4', role: '设计师', date: '2020-02-23', rate: 1, address: 'address4', content: 'xxxxx1<br>换行换行4' },
        { name: 'Test5', role: '前端', date: '2020-01-20', rate: 3, address: 'address5\ntooltip文本换行\n换行xx', content: 'xxxxx1<br>换行换行55' }
      ],
     
    }
  },
  methods: {
    showTooltipMethod ({ type, column, row, items, _columnIndex }) {
      const { property } = column
      // 重写默认的提示内容
      if (property === 'role' || property === 'date') {
        if (type === 'header') {
          return column.title ? '自定义标题提示内容：' + column.title : ''
        } else if (type === 'footer') {
          return items[_columnIndex] ? '自定义表尾提示内容，\n并且自定义换行：\n' + items[_columnIndex] : ''
        }
        return row[property] ? '自定义提示内容：' + row[property] : ''
      } else if (property === 'rate') {
        // 返回空字符串，控制单元格不显示提示内容
        return ''
      }
      // 其余的单元格使用默认行为
      return null
    },
    footerMethod ({ columns }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          if (['date'].includes(column.property)) {
            return '2020-09-05'
          }
          if (['rate'].includes(column.property)) {
            return 999.8
          }
          return null
        })
      ]
      return footerData
    }
  }
}
</script>



```
:::

### 单元格溢出省略号

cell溢出后省略号的处理机制

:::demo 
```html
<template>
  <div>
    <p class="tip">
      通过 tooltip-config.showAll 开启全表工具提示，还可以配合 contentMethod 方法重写默认的提示内容，显示逻辑完全自定义控制，可以返回 null 使用默认的提示消息
      还可以设置 tooltip-config.enterable 允许鼠标进入 tooltip 中，通过 title-help 设置列标题的帮助提示消息
    </p>

    <gj-table
      show-footer
      :footer-method="footerMethod"
      :tooltip-config="{showAll: true, enterable: true, contentMethod: showTooltipMethod}"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="名称" :title-help="{message: '自定义帮助提示信息'}"></gj-column>
      <gj-column field="role" title="角色" :title-help="{message: '自定义图标', icon: 'fa fa-bell'}"></gj-column>
      <gj-column field="date" title="Date"></gj-column>
      <gj-column field="rate" title="Rate">
        <template #header>
          <span>自定义标题</span>
        </template>
      </gj-column>
      <gj-column field="address" title="Address" width="160"></gj-column>
      <gj-column type="html" field="content" title="Content" width="200"></gj-column>
    </gj-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { name: 'Test1', role: '前端', date: '2020-02-28', rate: 5, address: 'address1', content: 'xxxxx1<br>换行换行11111111111' },
        { name: 'Test2', role: '后端', date: '2020-02-22', rate: 2, address: 'address2\ntooltip文本换行\n换行xx', content: 'xxxxx1<br>换行换行2' },
        { name: 'Test3', role: '前端', date: '2020-01-01', rate: 0, address: 'address3\ntooltip文本换行\n换行xx', content: 'xxxxx1<br>换行换行<br>3333' },
        { name: 'Test4', role: '设计师', date: '2020-02-23', rate: 1, address: 'address4', content: 'xxxxx1<br>换行换行4' },
        { name: 'Test5', role: '前端', date: '2020-01-20', rate: 3, address: 'address5\ntooltip文本换行\n换行xx', content: 'xxxxx1<br>换行换行55' }
      ],
     
    }
  },
  methods: {
    showTooltipMethod ({ type, column, row, items, _columnIndex }) {
      const { property } = column
      // 重写默认的提示内容
      if (property === 'role' || property === 'date') {
        if (type === 'header') {
          return column.title ? '自定义标题提示内容：' + column.title : ''
        } else if (type === 'footer') {
          return items[_columnIndex] ? '自定义表尾提示内容，\n并且自定义换行：\n' + items[_columnIndex] : ''
        }
        return row[property] ? '自定义提示内容：' + row[property] : ''
      } else if (property === 'rate') {
        // 返回空字符串，控制单元格不显示提示内容
        return ''
      }
      // 其余的单元格使用默认行为
      return null
    },
    footerMethod ({ columns }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          if (['date'].includes(column.property)) {
            return '2020-09-05'
          }
          if (['rate'].includes(column.property)) {
            return 999.8
          }
          return null
        })
      ]
      return footerData
    }
  }
}
</script>



```
:::

### 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

:::demo `stripe`属性可以创建带斑马纹的表格。它接受一个`Boolean`，默认为`false`，设置为`true`即为启用。
```html
<template>
  <div>
    <p class="tip">
      斑马线条纹，通过设置 《a href="stripe" 参数<br>
      <span class="red">（注：不支持树形结构，在可编辑表格场景下，临时插入的数据不会有斑马纹样式）</span>
    </p>

    <gj-table
      stripe
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

   
    <p class="tip">使用 《a href="highlight-hover-row" 属性启用 hover 行高亮</p>

    <gj-table
      stripe
      highlight-current-row
      highlight-hover-row
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
    
    }
  }
}
</script>
```
:::

### 带边框表格

:::demo 默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用`border`属性，它接受一个`Boolean`，设置为`true`即可启用。
```html
<template>
  <div>
    <p class="tip">通过设置 border=none|default 默认不显示边框</p>

    <gj-table
      show-footer
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    <p class="tip">通过设置 border=true|full 显示完整边框</p>

    <gj-table
      border
      show-footer
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    <p class="tip">通过设置 border=outer 显示外边框</p>

    <gj-table
      show-footer
      border="outer"
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    <p class="tip">通过设置 border=inner 显示内边框</p>

    <gj-table
      show-footer
      border="inner"
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>
    
    <p class="tip">通过设置 border=false 显示外边框</p>

    <gj-table
      show-footer
      border="false"
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ]
    }
  },
  methods: {
    sumNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    },
    footerMethod ({ columns, data }) {
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('和值')
        } else {
          sums.push(this.sumNum(data, column.property))
        }
      })
      // 返回一个二维数组的表尾合计
      return [sums]
    }
  }
}
</script>

```
:::

### 带状态表格

表格的类。

:::demo 可以通过指定 Table 组件的 `row-class-name` 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。
```html
<template>
  <div>
    <p class="tip">
      行的样色、单元格样式，表头的样式、表尾的样式、全部都可以完全自定义，通过设置 "header-cell-class-name"、row-class-name ...等参数<br>
      <span class="red">（注：当自定义样式之后可能会覆盖表格的样式，比如选中行..等，记得自行处理好相关样式）</span>
    </p>

    <gj-table
      border
      class="mytable-style"
      :header-cell-class-name="headerCellClassName"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="attr1" title="Attr1"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

   
    <p class="tip">通过 "cell-click" 事件点击改变颜色</p>

    <gj-table
      border
      class="mytable-style"
      :cell-class-name="cellClassName2"
      :data="tableData"
      @cell-click="cellClickEvent2">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="attr1" title="Attr1"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

   
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      selectRow: null,
      selectColumn: null
    }
  },
  methods: {
    headerCellClassName ({ column }) {
      if (column.property === 'name') {
        return 'col-blue'
      }
    },
    rowClassName ({ rowIndex }) {
      if ([2, 3, 5].includes(rowIndex)) {
        return 'row-green'
      }
    },
    cellClassName ({ row, column }) {
      if (column.property === 'sex') {
        if (row.sex >= '1') {
          return 'col-red'
        } else if (row.age === 26) {
          return 'col-orange'
        }
      }
    },
    cellClassName2 ({ row, column }) {
      if (row === this.selectRow & column === this.selectColumn) {
        return 'col-orange'
      }
    },
    cellClickEvent2 ({ row, column }) {
      this.selectRow = row
      this.selectColumn = column
      
    }
  }
}
</script>

<style>
    .mytable-style.gj-table .gj-body--row.row-green {
      background-color: #187;
      color: #fff;
    }
    .mytable-style.gj-table .gj-header--column.col-blue {
      background-color: #2db7f5;
      color: #fff;
    }
    .mytable-style.gj-table .gj-body--column.col-red {
      background-color: red;
      color: #fff;
    }
    .mytable-style.gj-table .gj-body--column.col-orange {
      background-color: #f60;
      color: #fff;
    }
</style>

```
:::

### 滚动条样式

:::demo 默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用`border`属性，它接受一个`Boolean`，设置为`true`即可启用。
```html
<template>
  <div>
    <p class="tip">
      重写默认的滚动条样式，可以自行根据不同浏览器的特性去做修改，简单示例如下：<br>
      <span class="red">（组件不支持改动原生滚动条，各种兼容性问题可自行实现，该示例仅供参考）</span>
    </p>

    <gj-table
      border
      show-footer
      class="mytable-scrollbar"
      height="200"
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60" fixed="left"></gj-column>
      <gj-column field="name" title="Name" width="300"></gj-column>
      <gj-column field="sex" title="Sex" width="250"></gj-column>
      <gj-column field="age" title="Age" width="250"></gj-column>
      <gj-column field="role" title="Role" width="300"></gj-column>
      <gj-column field="address" title="Address" width="350" show-overflow></gj-column>
    </gj-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
    
    }
  },
  methods: {
    meanNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age'].includes(column.property)) {
            return parseInt(this.meanNum(data, column.property))
          }
          return '-'
        })
      ]
    }
  }
}
</script>

<style>
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}
</style>


```
:::

### 隐藏表头

:::demo 默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用`border`属性，它接受一个`Boolean`，设置为`true`即可启用。
```html
<template>
  <div>
    <p class="tip">隐藏头部，通过设置 " prop="show-header" 参数</p>

    <gj-table
      :show-header="false"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

    <p class="tip">当纵向或横向内容过多时，自动出现滚动条</p>

 
 
        <gj-button @click="showHeader = !showHeader">显示/隐藏表头</gj-button>
    
  

    <gj-table
      height="200"
      :show-header="showHeader"
      :data="tableData2">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

 
  </div>
</template>

<script>
export default {
  data () {
    return {
      showHeader: false,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      tableData2: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ]
    
    }
  }
}
</script>



```
:::

### 固定表头

纵向内容过多时，可选择固定表头。

:::demo 只要在`gj-table`元素中定义了`height`属性，即可实现固定表头的表格，而不需要额外的代码。
```html
<template>
  <div>
    <p class="tip">当纵向内容过多时，固定表头就非常有用了，通过设置 height 参数</p>

    <gj-table
      border
      height="400"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

   
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
        { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc' },
        { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc' },
        { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc' },
        { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc' },
        { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc' },
        { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc' },
        { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc' },
        { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc' },
        { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc' },
        { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc' },
        { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc' },
        { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc' }
      ],
     
    }
  }
}
</script>

```
:::

### 固定列和表头

横纵内容过多时，可选择固定列和表头。

:::demo 固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。
```html
<template>
  <div>
    <p class="tip">横纵内容过多时，同时固定列和表头</p>

    <gj-table
      border
      resizable
      
      highlight-hover-row
      :data="tableData">
      <gj-column type="seq" width="60" fixed="left"></gj-column>
      <gj-column field="name" title="Name" width="300"></gj-column>
      <gj-column field="role" title="Role" width="300"></gj-column>
      <gj-column field="sex" title="Sex" width="300"></gj-column>
      <gj-column field="date" title="Date" width="300"></gj-column>
      <gj-column title="操作" fixed="right" width="200">
        <template #default>
          <gj-button type="text">按钮1</gj-button>
          <gj-button type="text">按钮2</gj-button>
        </template>
      </gj-column>
    </gj-table>

  

    <p class="tip">固定列建议设置 "show-overflow" 该值，禁用自动换行，大幅提升渲染速度</p>

    <div style="margin-bottom:20px"> 
      <template >
        <gj-button @click="toggleFixedColumn(0, 'left')">切换第一列固定</gj-button>
        <gj-button @click="toggleFixedColumn(1, 'left')">切换第二列固定</gj-button>
        <gj-button @click="toggleFixedColumn(4, 'right')">切换第五列固定</gj-button>
        <gj-button @click="toggleFixedColumn(5, 'right')">切换第六列固定</gj-button>
      </template>
    </div>

    <gj-table
      border
      ref="xTable2"
      
      highlight-hover-row
      show-overflow
      :data="tableData">
      <gj-column type="seq" width="60" :fixed="colFixeds.col0"></gj-column>
      <gj-column field="name" title="Name" width="300" :fixed="colFixeds.col1"></gj-column>
      <gj-column field="role" title="Role" width="300"></gj-column>
      <gj-column field="sex" title="Sex" width="300"></gj-column>
      <gj-column field="date" title="Date" width="300" :fixed="colFixeds.col4"></gj-column>
      <gj-column title="操作" width="200" :fixed="colFixeds.col5">
        <template #default>
          <gj-button status="primary" type="mini">按钮1</gj-button>
          <gj-button type="mini">按钮2</gj-button>
        </template>
      </gj-column>
    </gj-table>

  

    <p class="tip">
      <span>分组表头<span class="red">（注：固定列必须按组进行设置）</span></span>
    </p>

    <gj-table
      border
      height="400"
      :data="tableData">
      <gj-colgroup title="基本信息" fixed="left">
        <gj-column type="seq" width="60" fixed="left"></gj-column>
        <gj-column field="name" title="Name" fixed="left" width="180"></gj-column>
      </gj-colgroup>
      <gj-colgroup title="更多信息">
        <gj-column field="role" title="Role" width="300"></gj-column>
        <gj-column field="age" title="Age" width="200"></gj-column>
        <gj-colgroup title="详细信息">
          <gj-column field="sex" title="Sex" width="200"></gj-column>
          <gj-column field="num" title="Num" width="200"></gj-column>
        </gj-colgroup>
      </gj-colgroup>
      <gj-colgroup title="额外信息" fixed="right">
        <gj-column field="date3" title="Date" fixed="right" width="140"></gj-column>
        <gj-column field="address" title="Address" fixed="right" width="200" show-overflow></gj-column>
      </gj-colgroup>
    </gj-table>

    
  </div>
</template>

<script>
export default {
  data () {
    return {
      colFixeds: {
        col0: '',
        col1: '',
        col2: '',
        col3: ''
      },
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
        { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc' },
        { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc' },
        { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc' },
        { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc' },
        { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc' },
        { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc' },
        { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc' },
        { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc' },
        { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc' },
        { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc' },
        { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc' },
        { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc' }
      ]
     
    }
  },
  methods: {
    toggleFixedColumn (index, type) {
      const xTable = this.$refs.xTable2
      const tableColumns = xTable.getColumns()
      const fxColumn = tableColumns[index]
      fxColumn.fixed = fxColumn.fixed ? null : type
      // 刷新列
      xTable.refreshColumn()
    }
  }
}
</script>

```
:::

### 流体高度

当数据量动态变化时，可以为 Table 设置一个最大高度。

:::demo 通过设置`max-height`属性为 Table 指定最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条。
```html
<template>
  <div>
    <p class="tip">当一个表格高度需要自适应的时候可以设置为最大高度，通过设置 "max-height" 参数</p>

    <gj-table
      border
      highlight-hover-row
      max-height="200"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="sex" title="Sex" align="center"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

 

    <p class="tip">如果设置 "max-height"，当内容为达到最大高度时会自适应</p>

    <gj-table
      border
      highlight-hover-row
      max-height="200"
      :data="tableData2">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

   
    <p class="tip">也可以设置相对于父容器的百分比</p>

    <div style="height: 400px;">
      <gj-table
        border
        highlight-hover-row
        max-height="100%"
        :data="tableData">
        <gj-column type="seq" width="60"></gj-column>
        <gj-column field="name" title="Name" sortable></gj-column>
        <gj-column field="sex" title="Sex"></gj-column>
        <gj-column field="age" title="Age"></gj-column>
        <gj-column field="address" title="Address" show-overflow></gj-column>
      </gj-table>
    </div>

   
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' }
      ],
      tableData2: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' }
      ],
     
    }
  }
}
</script>

```
:::

### 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

:::demo 只需要在 gj-column 里面嵌套 gj-column，就可以实现多级表头。
```html
<template>
  <div>
    <p class="tip">当数据结构比较复杂的时候，可以使用多级表头来更加直观的显示数据</p>

    <gj-table
      border
      height="400"
      :data="tableData">
      <gj-column title="基本信息">
        <gj-column type="seq" width="60"></gj-column>
        <gj-column field="name" title="Name"></gj-column>
      </gj-column>
      <gj-colgroup title="更多信息">
        <gj-column field="role" title="Role"></gj-column>
        <gj-colgroup title="详细信息">
          <gj-column field="sex" title="Sex"></gj-column>
          <gj-column field="age" title="Age"></gj-column>
        </gj-colgroup>
      </gj-colgroup>
      <gj-colgroup title="分类信息">
        <gj-column field="date3" title="Date"></gj-column>
      </gj-colgroup>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

  
  
  </div>
</template>

<script>

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
     
    }
  },
 
}
</script>

```
:::

### 高亮列

:::demo 高亮当前列，当前列是唯一的，通过设置 highlight-current-column 控制
```html
<template>
  <div>
    <p class="tip">高亮当前列，当前列是唯一的，通过设置 "highlight-current-column" 参数</p>

    <gj-table
      border
      highlight-hover-column
      highlight-current-column
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

   
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
    
    }
  }
}
</script>



```
:::

### 高亮行

:::demo 高亮当前列，当前列是唯一的，通过设置highlight-current-row 控制
```html
<template>
  <div>
    <p class="tip">使用 "highlight-current-row" 显示高亮行，当前行是唯一的；用户操作点击选项时会触发事件"current-change"</p>

 
          <gj-button @click="$refs.xTable.setCurrentRow(tableData[1])">设置第二行选中</gj-button>
          <gj-button @click="$refs.xTable.clearCurrentRow()">取消选中</gj-button>
          <gj-button @click="getCurrentEvent">获取高亮行</gj-button>

    <gj-table
      border
      highlight-hover-row
      highlight-current-row
      ref="xTable"
      
      :data="tableData"
      @current-change="currentChangeEvent">
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

   
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ],
    
    }
  },
  methods: {
    currentChangeEvent ({ rowIndex }) {
      console.log(`行选中事件 ${rowIndex}`)
    },
    getCurrentEvent () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable.getCurrentRecord()))
    }
  }
}
</script>




```
:::

### 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

:::demo 只需要在 gj-column 里面嵌套 gj-column，就可以实现多级表头。
```html
<template>
  <div>
    <p class="tip">当数据结构比较复杂的时候，可以使用多级表头来更加直观的显示数据</p>

    <gj-table
      border
      height="400"
      :data="tableData">
      <gj-colgroup title="基本信息">
        <gj-column type="seq" width="60"></gj-column>
        <gj-column field="name" title="Name"></gj-column>
      </gj-colgroup>
      <gj-colgroup title="更多信息">
        <gj-column field="role" title="Role"></gj-column>
        <gj-colgroup title="详细信息">
          <gj-column field="sex" title="Sex"></gj-column>
          <gj-column field="age" title="Age"></gj-column>
        </gj-colgroup>
      </gj-colgroup>
      <gj-colgroup title="分类信息">
        <gj-column field="date3" title="Date"></gj-column>
      </gj-colgroup>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

  
  
  </div>
</template>

<script>

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
     
    }
  },
 
}
</script>

```
:::

### 单选

选择单行数据时使用色块表示。

:::demo Table 组件提供了单选的支持，只需要配置`highlight-current-row`属性即可实现单选。之后由`current-change`事件来管理选中时触发的事件，它会传入`currentRow`，`oldCurrentRow`。如果需要显示索引，可以增加一列`gj-column`，设置`type`属性为`index`即可显示从 1 开始的索引号。
```html
<template>
  <div>
    <p class="tip">单选表格，用户手动选中时会触发事件 radio-change，还通过 "highlight" 设置高亮选中行</p>

    <gj-button @click="$refs.xTable1.setRadioRow(tableData[1])">设置第二行选中</gj-button>
          <gj-button @click="clearRadioRowEevnt">取消选中</gj-button>
          <gj-button @click="getRadioEvent1">获取选中</gj-button>

    <gj-table
      border
      ref="xTable1"
      
      :data="tableData"
      :radio-config="{highlight: true}"
      @cell-click="cellClickEvent"
      @radio-change="radioChangeEvent">
      <gj-column type="radio" width="40" align="center">
        
      </gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

   

    <p class="tip">
      还可以通过  `checkMethod` 方法控制 checkbox 是否允许用户手动选中，还可以配置 `labelField` 列显示属性
    </p>

    <div style="margin-bottom:20px">
      <template>
        <gj-button @click="$refs.xTable2.setRadioRow(tableData[0])">设置第一行选中（如果被禁用，不可选中）</gj-button>
        <gj-button @click="$refs.xTable2.setRadioRow(tableData[1])">设置第二行选中</gj-button>
        <gj-button @click="$refs.xTable2.clearRadioRow()">清除所有行选中</gj-button>
      </template>
    </div>

    <gj-table
      border
      ref="xTable2"
      
      :radio-config="{labelField: 'name', checkMethod: checkRadioMethod}"
      :data="tableData">
      <gj-column type="radio" title="请选择" width="100"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>



    <p class="tip">
      默认选中，通过指定 "checkRowKey" 设置默认选中的行，指定默认值需要有 "row-id"<br>
      <span class="red">（注：默认行为只会在 reload 之后触发一次）</span>
    </p>

    <gj-table
      border
      
      :row-config="{keyField: 'id'}"
      :data="tableData"
      :radio-config="{checkRowKey: defaultSelecteRow}">
      <gj-column type="radio" width="40"></gj-column>
      <gj-column field="id" title="ID"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

    <p class="tip">单选的默认行为是不允许取消的，可以通过设置 "radio-config.strict=false" 允许取消</p>

    <gj-table
      border
      
      :radio-config="{strict: false}"
      :data="tableData"
      @radio-change="radioChangeEvent4">
      <gj-column type="radio" width="40"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

    <p class="tip">两种方式混合使用</p>

    <gj-table
      border
      highlight-current-row
      
      :radio-config="{labelField: 'name'}"
      :data="tableData">
      <gj-column type="radio" title="还可以这样" width="120"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

    <p class="tip">当然也可以两种方式同时使用</p>

    <gj-table
      border
      highlight-hover-row
      highlight-current-row
      
      :radio-config="{labelField: 'name', trigger: 'row'}"
      :data="tableData">
      <gj-column type="radio" title="还可以这样" width="120"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      defaultSelecteRow: 10002,
      selectRow: null,
     
    }
  },
  methods: {
    checkRadioMethod ({ row }) {
      return row.age > 26
    },
    cellClickEvent () {
      console.log('单元格点击事件')
    },
    radioChangeEvent4 ({ newValue, oldValue }) {
      console.log(newValue, oldValue)
    },
    radioChangeEvent ({ row }) {
      this.selectRow = row
      console.log('单选事件')
    },
    clearRadioRowEevnt () {
      this.selectRow = null
      this.$refs.xTable1.clearRadioRow()
    },
    getRadioEvent1 () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable1.getRadioRecord()))
    }
  }
}
</script>

```
:::

### 多选

选择多行数据时使用 Checkbox。

:::demo 实现多选非常简单: 手动添加一个`gj-column`，设`type`属性为`selection`即可；默认情况下若内容过多会折行显示，若需要单行显示可以使用`show-overflow-tooltip`属性，它接受一个`Boolean`，为`true`时多余的内容会在 hover 时以 tooltip 的形式显示出来。
```html
<template>
  <div>
    <p class="tip">多选表格，用户手动勾选时会触发事件 "checkbox-change"</p>

    <gj-button @click="$refs.xTable1.toggleCheckboxRow(tableData[1])">切换第二行选中</gj-button>
           <gj-button @click="$refs.xTable1.setCheckboxRow([tableData[2], tableData[3]], true)">设置第三、四行选中</gj-button>
           <gj-button @click="$refs.xTable1.setAllCheckboxRow(true)">设置所有行选中</gj-button>
           <gj-button @click="$refs.xTable1.clearCheckboxRow()">清除所有行选中</gj-button>
           <gj-button @click="getSelectEvent1">获取选中</gj-button>

    <gj-table
      border
      ref="xTable1"
      :data="tableData"
      @checkbox-all="selectAllEvent"
      @checkbox-change="selectChangeEvent">
      <gj-column type="checkbox" width="40"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

    <p class="tip">
      还可以通过 "checkMethod" 方法控制 checkbox 是否允许用户手动勾选，还可以配置 "visibleMethod" 是否显示复选框<br>
    </p>

    <gj-button @click="$refs.xTable2.toggleCheckboxRow(tableData2[0])">设置第一行选中（如果被禁用，不可选中）</gj-button>
           <gj-button @click="$refs.xTable2.toggleCheckboxRow(tableData2[1])">切换第二行选中</gj-button>
           <gj-button @click="$refs.xTable2.setCheckboxRow([tableData2[2], tableData2[3]], true)">设置第三、四行选中</gj-button>
           <gj-button @click="$refs.xTable2.setAllCheckboxRow(true)">设置所有行选中</gj-button>
           <gj-button @click="$refs.xTable2.clearCheckboxRow()">清除所有行选中</gj-button>

    <gj-table
      border
      ref="xTable2"
      :data="tableData2"
      :checkbox-config="{labelField: 'name', checkMethod: checCheckboxkMethod2, visibleMethod: showCheckboxkMethod2}">
      <gj-column type="checkbox" title="All"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

   

    <p class="tip">当表格中不存在有效数据时列头复选框为禁用状态</p>

    <gj-table
      border
      :data="tableData"
      :checkbox-config="{labelField: 'name', checkMethod:checCheckboxkMethod3}">
      <gj-column type="checkbox" title="All"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

    <p class="tip">多选表格，通过配置 "trigger" 设置触发源，使用渲染最快的 "checkField" 属性绑定方式</p>

   <gj-button @click="$refs.xTable4.toggleCheckboxRow(tableData4[1])">切换第二行选中</gj-button>
          <gj-button @click="$refs.xTable4.setCheckboxRow([tableData4[2], tableData4[3]], true)">设置第三、四行选中</gj-button>
          <gj-button @click="$refs.xTable4.setAllCheckboxRow(true)">设置所有行选中</gj-button>
          <gj-button @click="$refs.xTable4.clearCheckboxRow()">清除所有行选中</gj-button>

    <gj-table
      border
      highlight-hover-row
      class="checkbox-table"
      ref="xTable4"
      :data="tableData4"
      :checkbox-config="{checkField: 'checked', trigger: 'row'}">
      <gj-column type="checkbox" width="40"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

    <p class="tip">
      默认选中，通过指定 "checkRowKeys" 设置默认选中的行，指定默认值需要有 "row-id"，通过 "highlight" 设置高亮选中行<br>
      <span class="red">（注：默认行为只会在 reload 之后触发一次）</span>
    </p>

    <gj-table
      border
      highlight-hover-row
      :row-config="{keyField: 'id'}"
      :data="tableData5"
      :checkbox-config="{checkRowKeys: defaultSelecteRows, highlight: true}"
      :radio-config="{labelField: 'name'}">
      <gj-column type="checkbox" width="40"></gj-column>
      <gj-column field="id" title="ID"></gj-column>
      <gj-column type="radio" width="300" title="Name"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

   

    <p class="tip">通过"checkStrictly" 设置父子节点不互相关联，启用后"showHeader" 默认为 false</p>

   <gj-button @click="$refs.xTable6.setCheckboxRow(tableData, true)">设置所有行选中</gj-button>
          <gj-button @click="$refs.xTable6.clearCheckboxRow()">清除所有行选中</gj-button>

    <gj-table
      border
      highlight-hover-row
      ref="xTable6"
      :data="tableData"
      :checkbox-config="{checkStrictly: true}">
      <gj-column type="checkbox" width="40"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  

    <p class="tip">多选可单选同时使用</p>

    <gj-table
      border
      highlight-hover-row
      :data="tableData"
      :radio-config="{labelField: 'name'}">
      <gj-column type="checkbox" width="40"></gj-column>
      <gj-column type="radio" width="300" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    

    <p class="tip">不仅如此，还可以多种方式混合使用，通过"range" 启用范围选中，通过鼠标按住复选框的列，向上或向下滑动选取，还可以同时按住 Ctrl 键局部选取</p>

    <gj-table
      border
      resizable
      highlight-hover-row
      highlight-current-row
      
      :data="tableData8"
      :radio-config="{labelField: 'role'}"
      :checkbox-config="{labelField: 'name', highlight: true, range: true}">
      <gj-column type="checkbox" title="Name"></gj-column>
      <gj-column type="radio" title="Role"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

  
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultSelecteRows: [10002, 10003],
      isCheckboxStrict: false,
      isAllCheckboxDisabled: false,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' }
      ],
      tableData2: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Women', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Man', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Test', sex: 'Women', age: 38, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', role: 'Develop', sex: 'Women', age: 29, address: 'Shenzhen' }
      ],
      tableData4: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', checked: false },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', checked: false },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', checked: false },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc', checked: false },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai', checked: false }
      ],
      tableData5: [
        { id: 0, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: '', name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: null, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: undefined, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' }
      ],
      tableData8: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'PM', sex: 'Women', age: 38, address: 'Shanghai' },
        { id: 10008, name: 'Test8', role: 'Designer', sex: 'Man', age: 24, address: 'test abc' },
        { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 35, address: 'Shanghai' },
        { id: 10010, name: 'Test10', role: 'Develop', sex: 'Women', age: 31, address: 'Shanghai' }
      ],
    
    }
  },
  methods: {
    checCheckboxkMethod2 ({ row }) {
      return row.age > 26
    },
    showCheckboxkMethod2 ({ row }) {
      return row.sex === 'Women'
    },
    checCheckboxkMethod3 () {
      return false
    },
    selectAllEvent ({ checked, records }) {
      console.log(checked ? '所有勾选事件' : '所有取消事件', records)
    },
    selectChangeEvent ({ checked, records }) {
      console.log(checked ? '勾选事件' : '取消事件', records)
    },
    getSelectEvent1 () {
      const selectRecords = this.$refs.xTable1.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>

```
:::

### 排序

对表格进行排序，可快速查找或对比数据。

:::demo 在列中设置`sortable`属性即可实现以该列为基准的排序，接受一个`Boolean`，默认为`false`。可以通过 Table 的`default-sort`属性设置默认的排序列和排序顺序。可以使用`sort-method`或者`sort-by`使用自定义的排序规则。如果需要后端排序，需将`sortable`设置为`custom`，同时在 Table 上监听`sort-change`事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。在本例中，我们还使用了`formatter`属性，它用于格式化指定列的值，接受一个`Function`，会传入两个参数：`row`和`column`，可以根据自己的需求进行处理。
```html
<template>
  <div>
    <p class="tip">
      通过给需要排序功能的列加上"sortable" 属性可以支持排序，还可以通过设置 " prop="sort-by" 指定字段进行排序<br>
      如果该列的值为字符串类型，但实际是数值，可以设置 " prop="sort-type"=number|string 按指定类型进行排序，默认 auto 自动转换数值<br>
      如果是自定义排序，可以通过"sort-config".sortMethod" 实现自定义排序<br>
      如果是服务端排序，只需加上"sort-config".remote" 和"sort-change" 事件就可以实现<br>
      还可以通过调用"sort" 方法实现手动排序
    </p>
        <div style="margin-bottom:20px">
                    <gj-button @click="$refs.xTable.sort('name', 'asc')">Name 升序</gj-button>
                   <gj-button @click="$refs.xTable.sort('name', 'desc')">Name 降序</gj-button>
                   <gj-button @click="$refs.xTable.clearSort()">清除排序</gj-button>
        </div>
         

    <gj-table
      border
      highlight-hover-row
      ref="xTable"
      
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="role" title="Role" sortable></gj-column>
      <gj-column field="age" title="Age" sortable></gj-column>
      <gj-column field="num" title="字符串" sort-type="string" sortable></gj-column>
      <gj-column field="num2" title="数值" sort-type="number" sortable></gj-column>
      <gj-column field="address" title="Address" sortable></gj-column>
    </gj-table>

   

    <p class="tip">配置 " prop="sort-by" 指定字段排序、或者方法返回自定义排序的值；例如：当使用格式化函数时，排序还是使用原始值</p>

    <gj-table
      border
      highlight-hover-row
      
      :data="tableData2">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" :sort-by="sortNameMethod2" sortable>
      </gj-column>
      <gj-column field="num" title="Num" sortable></gj-column>
      <gj-column field="num1" title="分离格式化与数值字段" sort-by="num1" sortable ></gj-column>
    </gj-table>
    <p class="tip">配置"sort-config".sortMethod" 自定义排序</p>

    <gj-table
      border
      highlight-hover-row
      
      :data="tableData3"
      :sort-config="{sortMethod: customSortMethod}">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="role" title="Role"></gj-column>
      <gj-column field="num1" title="Num1"></gj-column>
      <gj-column field="num2" title="Num2"></gj-column>
    </gj-table>

   

    <p class="tip">配置"multiple" 启用多字段组合排序</p>

    <gj-table
      border
      highlight-hover-row
      
      :sort-config="{multiple: true}"
      :data="tableData4"
      @sort-change="sortChangeEvent3">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="role" title="Role" sortable></gj-column>
      <gj-column field="num" title="Num" sortable></gj-column>
    </gj-table>

    

    <p class="tip">点击表头排序，通过"defaultSort" 默认排序、orders" 自定义轮转顺序、通过配置"trigger" 设置触发源</p>

    <gj-table
      border
      highlight-hover-row
      highlight-hover-column
      
      :data="tableData"
      :sort-config="{trigger: 'cell', defaultSort: {field: 'age', order: 'desc'}, orders: ['desc', 'asc', null]}"
      @sort-change="sortChangeEvent4">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="role" title="Role" sortable></gj-column>
      <gj-column field="sex" title="Sex" sortable></gj-column>
      <gj-column field="age" title="Age" sortable></gj-column>
      <gj-column field="address" title="Address" sortable></gj-column>
    </gj-table>

    
  </div>
</template>

<script>

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, num: '3.8', num2: '3.8', address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, num: '511', num2: '511', address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, num: '12.8', num2: '12.8', address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, num: '103', num2: '103', address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, num: '56', num2: '56', address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, num: '49', num2: '49', address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, num: '400.9', num2: '400.9', address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, num: '5000', num2: '5000', address: 'test abc' }
      ],
      tableData2: [
        { name: '小红11', role: '前端', num: 7, num1: 1368.7, num2: '1368.7' },
        { name: '老王1', role: '后端', num: 6, num1: 89657, num2: '89657' },
        { name: '小红111111', role: '后端', num: 1, num1: 672, num2: '672' },
        { name: '小明11', role: '前端', num: 2, num1: 482456, num2: '482456' },
        { name: '老徐111', role: '测试', num: 3, num1: 7546.7, num2: '7546.7' },
        { name: '老王11', role: '前端', num: 3, num1: 6897, num2: '6897' },
        { name: '老徐11111111', role: '测试', num: 4, num1: 8957, num2: '8957' },
        { name: '小明111111111', role: '前端', num: 4, num1: 56433.57, num2: '56433.57' },
        { name: '小明1', role: '前端', num: 8, num1: 977, num2: '977' },
        { name: '小明111', role: '测试', num: 6, num1: 98477, num2: '98477' },
        { name: '小红11111', role: '后端', num: 9, num1: 67017, num2: '67017' },
        { name: '老徐11', role: '前端', num: 5, num1: 7364, num2: '7364' },
        { name: '老徐11', role: '测试', num: 1, num1: 1573.7, num2: '1573.7' },
        { name: '小红1111', role: '前端', num: 4, num1: 16807, num2: '16807' },
        { name: '小红111', role: '前端', num: 2, num1: 744345.7, num2: '744345.7' },
        { name: '小明111', role: '测试', num: 3, num1: 10957, num2: '10957' },
        { name: '老王1', role: '前端', num: 6, num1: 6737, num2: '6737' },
        { name: '老王1111', role: '后端', num: 4, num1: 83445.1, num2: '83445.1' },
        { name: '老徐11', role: '前端', num: 8, num1: 4636677, num2: '4636677' },
        { name: '小明111111', role: '测试', num: 7, num1: 5783537, num2: '5783537' }
      ],
      tableData3: [
        { name: 'lefa', role: '前端', num: 7, num1: 1368.7, num2: '1368.7' },
        { name: '老王1', role: '后端', num: 6, num1: 89657, num2: '89657' },
        { name: 'xgy王', role: '后端', num: 1, num1: 672, num2: '672' },
        { name: '小明11', role: '前端', num: 2, num1: 482456, num2: '482456' },
        { name: '好吧', role: '测试', num: 3, num1: 7546.7, num2: '7546.7' },
        { name: '老王11', role: '前端', num: 3, num1: 6897, num2: '6897' },
        { name: 'tfhn', role: '测试', num: 4, num1: 8957, num2: '8957' },
        { name: '踢fhz', role: '测试', num: 4, num1: 8957, num2: '8957' },
        { name: 'qtjh1111111', role: '前端', num: 4, num1: 56433.57, num2: '56433.57' },
        { name: 'lhfgt', role: '前端', num: 8, num1: 977, num2: '977' },
        { name: 'h小明111', role: '测试', num: 6, num1: 98477, num2: '98477' },
        { name: '小红11111', role: '后端', num: 9, num1: 67017, num2: '67017' },
        { name: 'tfhnhy', role: '测试', num: 4, num1: 8957, num2: '8957' },
        { name: '老徐11', role: '前端', num: 5, num1: 7364, num2: '7364' },
        { name: 'qth', role: '测试', num: 1, num1: 1573.7, num2: '1573.7' },
        { name: '小红1111', role: '前端', num: 4, num1: 16807, num2: '16807' },
        { name: '小红111', role: '前端', num: 2, num1: 744345.7, num2: '744345.7' },
        { name: '前任', role: '测试', num: 3, num1: 10957, num2: '10957' },
        { name: 'q老王1', role: '前端', num: 6, num1: 6737, num2: '6737' }
      ],
      tableData4: [
        { name: '小红', role: '前端', num: 7 },
        { name: '老王', role: '后端', num: 6 },
        { name: '小红', role: '后端', num: 1 },
        { name: '小明', role: '前端', num: 2 },
        { name: '老徐', role: '测试', num: 3 },
        { name: '老王', role: '前端', num: 3 },
        { name: '老徐', role: '测试', num: 4 },
        { name: '小明', role: '前端', num: 4 },
        { name: '小明', role: '前端', num: 8 },
        { name: '小明', role: '测试', num: 6 },
        { name: '小红', role: '后端', num: 9 },
        { name: '老徐', role: '前端', num: 5 },
        { name: '老徐', role: '测试', num: 1 },
        { name: '小红', role: '前端', num: 4 },
        { name: '小红', role: '前端', num: 2 },
        { name: '小明', role: '测试', num: 3 },
        { name: '老王', role: '前端', num: 6 },
        { name: '老王', role: '后端', num: 4 },
        { name: '老徐', role: '前端', num: 8 },
        { name: '小明', role: '测试', num: 7 }
      ]
     
    }
  },
  methods: {
  
    sortNameMethod2 ({ row }) {
      // 按名称长度进行排序
      return row.name.length
    },
    sortChangeEvent3 ({ sortList }) {
      console.info(sortList.map((item) => `${item.property},${item.order}`).join('; '))
    },
    sortChangeEvent4 ({ property, order }) {
      console.info(property, order)
    },
    getPinYin (str) {
      return str.split('').map(char => {
        switch (char.charAt(0)) {
          case '老': return 'lao'
          case '小': return 'xiao'
          case '前': return 'qian'
          case '好': return 'hao'
          case '王': return 'wang'
          case '红': return 'hong'
          case '明': return 'ming'
          case '吧': return 'ba'
          case '踢': return 'ti'
        }
        return char.charAt(0)
      }).join('')
    },
    customSortMethod ({ data, sortList }) {
      const sortItem = sortList[0]
      // 取出第一个排序的列
      const { property, order } = sortItem
      let list = []
      if (order === 'asc' || order === 'desc') {
        if (property === 'name') {
          // 例如：实现中英文混排，按照字母排序
          list = data.sort((a, b) => {
            return this.getPinYin(a.name).localeCompare(this.getPinYin(b.name))
          })
        } else {
          list = data.sort()
        }
      }
      if (order === 'desc') {
        list.reverse()
      }
      return list
    }
  }
}
</script>

```
:::

### 筛选

对表格进行筛选，可快速查找到自己想看的数据。

:::demo 在列中设置`filters` `filter-method`属性即可开启该列的筛选，filters 是一个数组，`filter-method`是一个方法，它用于决定某些数据是否显示，会传入三个参数：`value`, `row` 和 `column`。
```html
<template>
  <div>
    <p class="tip">
      通过设置 " prop="filters" 属性和 " prop="filter-method" 方法可以开启列筛选功能，通过 " prop="filter-multiple"=false 设置为单选<br>
      如果是服务端筛选，只需加上"filter-config"={remote": true} 和"filter-change" 事件就可以实现<br>
      如果是动态数据请通过"setFilter" 方法更新，参数 " prop="filters" 不支持动态数据<br>
      $panel 对象（<router-link  class="link" :to="{name: 'TableManualFilter'}">查看高级用法</router-link>）:<br>
      &nbsp;&nbsp;<span class="orange">changeOption(event, checked, option) 更新选项的状态</span><br>
      &nbsp;&nbsp;<span class="orange">confirmFilter() 确认筛选</span><br>
      &nbsp;&nbsp;<span class="orange">resetFilter() 清除筛选条件</span>
    </p>

    <gj-table
      border
      highlight-hover-row
      ref="xTable1"
      :data="tableData"
      @filter-visible="filterVisibleEvent"
      @filter-change="filterChangeEvent">
      <gj-column field="id" title="ID"></gj-column>
      <gj-column field="name" title="Name" sortable :filters="[]" :filter-method="filterNameMethod"></gj-column>
      <gj-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></gj-column>
      <gj-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod">
       
      </gj-column>
      <gj-column field="time" title="Time" sortable></gj-column>
    </gj-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Test', sex: '1', age: 24, address: 'Shanghai' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 32, address: 'Shenzhen' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 28, address: 'Shanghai' }
      ],
     
    }
  },
  mounted () {
    // 异步加载筛选数据
    setTimeout(() => {
      const $table = this.$refs.xTable1
      if ($table) {
        const nameColumn = $table.getColumnByField('name')
        if (nameColumn) {
          $table.setFilter(nameColumn, [
            { label: 'id大于10002', value: 10002 },
            { label: 'id大于10003', value: 10003 }
          ])
        }
      }
    }, 500)
  },
  methods: {
    filterVisibleEvent ({ column, visible }) {
      console.log(`${column.property} ${visible ? '打开' : '关闭'}筛选面板`)
    },
    filterChangeEvent ({ column }) {
      console.log(`${column.property} 筛选了数据`)
    },
    filterNameMethod ({ value, row }) {
      return row.id >= value
    },
    filterAgeMethod ({ option, row }) {
      return row.age === Number(option.data)
    }
  }
}
</script>

```
:::

### 空数据

空数据展示
:::demo 当tableData数据为空时。
```html
<template>
  <div>
    <p class="tip">当数据为空时，通过"empty-text" 设置空数据提示文本，可以使用 <router-link class="link" :to="{name: 'RendererEmpty'}">渲染器</router-link> 实现全局复用</p>

    <gj-table
      empty-text="没有更多数据了！"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
    </gj-table>

  

    <p class="tip">可以通过 slot=empty" 自定义提示语</p>

    <gj-table
      border
      :loading="loading"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
      <template slot="empty">
        <gj-empty empty-type="noResult" description="无搜索结果"></gj-empty>
      </template>
    </gj-table>

  

    <p class="tip">出现滚动条</p>

    <gj-table
      border
      
      :loading="loading"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" width="300"></gj-column>
      <gj-column field="sex" title="Sex" width="300"></gj-column>
      <gj-column field="age" title="Age" width="300"></gj-column>
      <gj-column field="date12" title="Date" width="300"></gj-column>
      <gj-column field="address" title="Address" width="300" show-overflow></gj-column>
      <template #empty  >
          <gj-empty empty-type="noData"></gj-empty>

      </template>
    </gj-table>
 
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: [],
      tableData2: [],
    
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.tableData = []
      this.loading = false
    }, 1000)
  }
}
</script>

```
:::

### 加载中

空数据展示
:::demo 当tableData数据为loading状态时。表格高度需要由由开发人员自行控制，loading默认居中，如果没有设置loading会展示异常。
```html
<template>
  <div>
    <p class="tip">通过设置 "loading" 属性可以使用自带的加载效果</p>

    <gj-table
      border
      highlight-hover-row
      height="300"
      :loading="true"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>


    <p class="tip">加载中</p>

    <gj-table
      border
      highlight-hover-row
      height="300"
      :loading="loading"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>


  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: [],
    
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.tableData = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ]
      this.loading = false
    }, 3000)
  }
}
</script>


```
:::

### 树形表格

:::demo 支持树类型的数据的显示。当 row 中包含 `children` 字段时，被视为树形数据。渲染树形数据时，必须要指定 `row-key`。支持子节点数据异步加载。设置 Table 的 `lazy` 属性为 true 与加载函数 `load` 。通过指定 row 中的 `hasChildren` 字段来指定哪些行是包含子节点。`children` 与 `hasChildren` 都可以通过 `tree-props` 配置。

```html
<template>
  <div>
    <p class="tip">
      树表格，通过配置"tree-config" 和指定列 " prop="tree-node" 属性来开启树表格，<br>
      设置"transform" 开启自动将列表转成树结构，通过"rowField" 和"parentField"指定字段名<br>
      通过"row-id" 指定主键，还可以通过"trigger" 指定触发方式<br>
    </p>

    <gj-button @click="getTreeExpansionEvent">获取已展开</gj-button>
           <gj-button @click="$refs.xTree.setAllTreeExpand(true)">展开所有</gj-button>
           <gj-button @click="$refs.xTree.clearTreeExpand()">关闭所有</gj-button>

    <gj-table
      resizable
      border="inner"
      ref="xTree"
      :tree-config="{children: 'childs'}"
      :data="tableData1"
      @toggle-tree-expand="toggleExpandChangeEvent">
      <gj-column type="seq" width="80"></gj-column>
      <gj-column field="name" title="app.body.label.name" tree-node></gj-column>
      <gj-column field="size" title="Size"></gj-column>
      <gj-column field="type" title="Type"></gj-column>
      <gj-column field="date" title="Date"></gj-column>
    </gj-table>

    

    <p class="tip">默认展开树节点，通过"tree-config"={expandRowKeys": []} 设置默认展开树节点的主键</p>

    <gj-table
      resizable
      :row-config="{keyField: 'id'}"
      :tree-config="{transform: true, expandRowKeys: defaultExpandKeys}"
      :data="tableData2">
      <gj-column field="name" title="app.body.label.name" tree-node></gj-column>
      <gj-column field="size" title="Size"></gj-column>
      <gj-column field="type" title="Type"></gj-column>
      <gj-column field="date" title="Date"></gj-column>
    </gj-table>


    <p class="tip">默认展开所有树节点，通过"tree-config"={expandAll": true} 设置默认展开所有树节点</p>

    <gj-table
      border
      show-overflow
      :row-config="{keyField: 'id'}"
      :data="tableData3"
      :tree-config="{transform: true, expandAll: true}">
      <gj-column type="seq" width="180" title="序号" tree-node></gj-column>
      <gj-column field="name" title="app.body.label.name"></gj-column>
      <gj-colgroup title="基本信息">
        <gj-column field="size" title="Size"></gj-column>
        <gj-column field="type" title="Type"></gj-column>
      </gj-colgroup>
      <gj-column field="date" title="Date"></gj-column>
    </gj-table>

   
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData1: [
        { id: 1000, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          childs: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'test abc96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              childs: [
                { id: 24330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ],
      tableData2: [
        { id: 10000, parentId: null, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
        { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
        { id: 20045, parentId: 24300, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
        { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', size: null, date: '2021-04-01' },
        { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', size: 25, date: '2021-10-01' },
        { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 22200, parentId: 10053, name: 'Test8', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23666, parentId: null, name: 'Test9', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 23677, parentId: 23666, name: 'Test10', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23671, parentId: 23677, name: 'Test11', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23672, parentId: 23677, name: 'Test12', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23688, parentId: 23666, name: 'Test13', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23681, parentId: 23688, name: 'Test14', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23682, parentId: 23688, name: 'Test15', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 24555, parentId: null, name: 'Test16', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 24566, parentId: 24555, name: 'Test17', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 24577, parentId: 24555, name: 'Test18', type: 'js', size: 1024, date: '2021-06-01' }
      ],
      defaultExpandKeys: [10050],
      tableData3: [
        { id: 10000, parentId: null, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
        { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
        { id: 20045, parentId: 24300, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
        { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', size: null, date: '2021-04-01' },
        { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', size: 25, date: '2021-10-01' },
        { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 22200, parentId: 10053, name: 'Test8', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23666, parentId: null, name: 'Test9', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 23677, parentId: 23666, name: 'Test10', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23671, parentId: 23677, name: 'Test11', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23672, parentId: 23677, name: 'Test12', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23688, parentId: 23666, name: 'Test13', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23681, parentId: 23688, name: 'Test14', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23682, parentId: 23688, name: 'Test15', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 24555, parentId: null, name: 'Test16', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 24566, parentId: 24555, name: 'Test17', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 24577, parentId: 24555, name: 'Test18', type: 'js', size: 1024, date: '2021-06-01' }
      ],
     
    }
  },
  methods: {
    toggleExpandChangeEvent ({ expanded }) {
      console.log('节点展开事件' + expanded)
    },
    getTreeExpansionEvent () {
      const treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
      this.$XModal.alert(treeExpandRecords.length)
    }
  }
}
</script>

```
:::

### 自定义模板

表头支持自定义。

:::demo 通过设置 [Scoped slot](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD) 来自定义表头。
```html
<template>
  <div>
    <p class="tip">使用 " prop="slot" 自定义模板；可以实现自定义任意内容及 html 元素<br>
      " prop="default" />：自定义内容模板（提前格式化（最优） > " prop="formatter"（field值发生变化时） > " prop="slots"（即时））<br>
      " prop="header"：自定义表头模板<br>
      " prop="footer"：自定义表尾模板<br>
      " prop="filter"：自定义筛选模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）<br>
      " prop="edit"：自定义可编辑模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）
    </p>

    <gj-table
      border
      resizable
      show-footer
      ref="xTable"
   
      :footer-method="footerMethod"
      :data="tableData"
      @checkbox-change="checkboxChangeEvent"
      @checkbox-all="checkboxChangeEvent">
      <gj-column type="checkbox" width="60"></gj-column>
      <gj-column type="seq" width="160" :resizable="false" show-overflow>
        <template #header>
          <div class="first-col">
            <div class="first-col-top">名称</div>
            <div class="first-col-bottom">序号</div>
          </div>
        </template>
        <template #footer="{ items, _columnIndex }">
          <gj-button status="primary" @click="clickFooterItem(items, _columnIndex)" size="mini">支持</gj-button>
          <gj-button @click="clickFooterItem(items, _columnIndex)" size="mini">test abc</gj-button>
        </template>
      </gj-column>
      <gj-column field="name" width="200" title="app.body.label.name" sortable>
        <template #default="{ row }">
          <a href="http://confluence.gildata.com/pages/viewpage.action?pageId=135531865" target="_black">我是超链接：{{ row.name }}</a>
        </template>
      </gj-column>
      <gj-column field="time" width="200" title="Time">
        <template #header>
          <gj-input v-model="value1" placeholder="放个输入框" size="mini"></gj-input>
        </template>
        <template #default="{ row, rowIndex }">
          <template v-if="rowIndex === 2">
             <gj-radio v-model="row.flag" label="1">备选项</gj-radio>
             <gj-checkbox v-model="row.flag">备选项</gj-checkbox>
          </template>
          <template v-else-if="rowIndex === 3">
            <gj-switch v-model="row.flag" open-label="开" close-label="关"></gj-switch>
          </template>
          <template v-else>
            <span>{{ formatDate(row.time) }}</span>
          </template>
        </template>
      </gj-column>
      <gj-column field="address" title="Address" width="200" show-overflow>
        <template #default="{ row, rowIndex }">
          <template v-if="rowIndex === 1">
            <gj-select v-model="row.flag1" transfer>
              <gj-option value="Y" label="是"></gj-option>
              <gj-option value="N" label="否"></gj-option>
            </gj-select>
          </template>
          <template v-else>
            <a href="https://github.com/x-extends/gj-table">{{ row.name }}</a>
          </template>
        </template>
      </gj-column>
      <gj-column field="html1" title="Html片段" width="200" show-overflow>
        <template #default="{ row }">
          <span v-html="row.html1"></span>
        </template>
        <template #footer>
          <span>
            <img src="../../assets/images/intro-theme-b.png" style="width: 36px;">自定义模板<img src="/gj-table/static/other/img2.gif" style="width: 30px;">
          </span>
        </template>
      </gj-column>
      <gj-column field="img1" title="图片路径" width="120">
        <template #default="{ row }">
          <img v-if="row.img1" :src="row.img1" style="width: 100px;">
          <span v-else>无</span>
        </template>
      </gj-column>
    </gj-table>

   

   
  </div>
</template>

<script>

export default {
  data () {
    return {
      value1: '',
      value2: '',
      showDetails: false,
      selectRow: null,
      isAllChecked: false,
      isIndeterminate: false,
      selectRecords: [],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', flag: false, time: 1600261774531, html1: '<span style="color:red">自定义HTML</span>', img1: '../../assets/images/intro-theme-b.png' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', flag: false, time: 1600261774531, html1: '', img1: '../../assets/images/intro-theme-b.png' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', flag: true, time: 1600261774531, html1: '<span style="color:orange">自定义HTML</span>', img1: '../../assets/images/intro-theme-b.png' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc', flag: false, time: 1600261774531, html1: '', img1: '../../assets/images/intro-theme-b.png' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai', flag: true, time: 1600261774531, html1: '', img1: '../../assets/images/intro-theme-b.png' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc', flag: true, time: 1600261774531, html1: '<span style="color:blue">自定义HTML</span>', img1: '../../assets/images/intro-theme-b.png' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc', flag: false, time: 1600261774531, html1: '', img1: '../../assets/images/intro-theme-b.png' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc', flag: false, time: 1600261774531, html1: '', img1: '../../assets/images/intro-theme-b.png' }
      ],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
    }
  },
  methods: {
    formatDate (value) {
      return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
    },
    filterSexMethod ({ option, row }) {
      return row.sex === option.data
    },
    changeFilterEvent (evnt, option, $panel) {
      $panel.changeOption(evnt, !!option.data, option)
    },
    showDetailEvent (row) {
        alert(row.sex)
    },
    clickFooterItem (items, _columnIndex) {
      alert(`点击了表尾第${_columnIndex}列`)
    },
    checkboxChangeEvent ({ records }) {
      this.isAllChecked = this.$refs.xTable.isAllCheckboxChecked()
      this.isIndeterminate = this.$refs.xTable.isAllCheckboxIndeterminate()
      this.selectRecords = records
    },
    changeAllEvent () {
      this.$refs.xTable.setAllCheckboxRow(this.isAllChecked)
      this.selectRecords = this.$refs.xTable.getCheckboxRecords()
    },
    sumNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map(column => {
          if (['num'].includes(column.property)) {
            return this.sumNum(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>

<style scoped>
.first-col {
  position: relative;
  height: 20px;
}
.first-col:before {
  content: "";
  position: absolute;
  left: -15px;
  top: 10px;
  width: 170px;
  height: 1px;
  transform: rotate(18deg);
  background-color: #e8eaec;
}
.first-col .first-col-top {
  position: absolute;
  right: 4px;
  top: -10px;
}
.first-col .first-col-bottom {
  position: absolute;
  left: 4px;
  bottom: -10px;
}
.my-filter {
  margin: 10px;
}
.page-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
</style>

```
:::


### 合并行或列

多行或多列共用一个数据时，可以合并行或列。
:::demo 通过给`table`传入`span-method`方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行`row`、当前列`column`、当前行号`rowIndex`、当前列号`columnIndex`四个属性。该函数可以返回一个包含两个元素的数组，第一个元素代表`rowspan`，第二个元素代表`colspan`。 也可以返回一个键名为`rowspan`和`colspan`的对象。

```html
<template>
  <div>
    <p class="tip">
      合并行或列，通过"merge-cells" 临时合并，或者自定义"span-method 合并方法<br>
      <span class="red">（注：span-method" ，不能用于虚拟滚动、树形结构、展开行、固定列，合并的逻辑都是自行实现的，该示例仅供参考）</span>
    </p>

   <gj-button @click="allAlign = 'left'">居左</gj-button>
           <gj-button @click="allAlign = 'center'">居中</gj-button>
           <gj-button @click="allAlign = 'right'">居右</gj-button>

    <gj-table
      border
      resizable
      :stripe="false"
      :align="allAlign"
      :merge-cells="mergeCells"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="role" title="Role"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
    </gj-table>

 

    <p class="tip">合并列</p>

    <gj-table
      border
      resizable
      
      :scroll-y="{enabled: false}"
      :span-method="colspanMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="role" title="Role"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
    </gj-table>

   

    <p class="tip">合并行</p>

    <gj-table
      border
      resizable
      
      :scroll-y="{enabled: false}"
      :span-method="mergeRowMethod"
      :data="tableData3">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="key" title="Key"></gj-column>
      <gj-column field="content" title="Translate"></gj-column>
      <gj-column field="language" title="Language" :filters="[{label: '中文', value: 'zh_CN' }, {label: 'English', value: 'en_US'}]"></gj-column>
    </gj-table>

  

  </div>
</template>

<script>
export default {
  data () {
    return {
      allAlign: null,
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      mergeCells: [
        { row: 1, col: 1, rowspan: 3, colspan: 3 },
        { row: 5, col: 0, rowspan: 2, colspan: 2 }
      ],
      tableData3: [
        { id: 10001, key: 'app.label.name', content: '名称', language: 'zh_CN' },
        { id: 10002, key: 'app.label.name', content: 'Name', language: 'en_US' },
        { id: 10003, key: 'app.label.sex', content: '性别', language: 'zh_CN' },
        { id: 10004, key: 'app.label.sex', content: 'Sex', language: 'en_US' },
        { id: 10005, key: 'app.label.age', content: '年龄', language: 'zh_CN' },
        { id: 10006, key: 'app.label.age', content: 'Age', language: 'en_US' },
        { id: 10007, key: 'app.label.role', content: '角色', language: 'zh_CN' },
        { id: 10008, key: 'app.label.role', content: 'Role', language: 'en_US' },
        { id: 10009, key: 'app.label.address', content: '地址', language: 'zh_CN' },
        { id: 10010, key: 'app.label.address', content: 'Address', language: 'en_US' },
        { id: 10011, key: 'app.label.nickname', content: '昵称', language: 'zh_CN' },
        { id: 10012, key: 'app.label.nickname', content: 'Nickname', language: 'en_US' }
      ],
     
    }
  },
  methods: {
    colspanMethod ({ _rowIndex, columnIndex }) {
      if (_rowIndex % 2 === 0) {
        if (columnIndex === 2) {
          return { rowspan: 1, colspan: 2 }
        } else if (columnIndex === 3) {
          return { rowspan: 0, colspan: 0 }
        }
      }
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    mergeRowMethod ({ row, _rowIndex, column, visibleData }) {
      const fields = ['key']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    }
  }
}
</script>

```
:::

### 快捷菜单

多行或多列共用一个数据时，可以合并行或列。
:::demo 通过给`table`传入`span-method`方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行`row`、当前列`column`、当前行号`rowIndex`、当前列号`columnIndex`四个属性。该函数可以返回一个包含两个元素的数组，第一个元素代表`rowspan`，第二个元素代表`colspan`。 也可以返回一个键名为`rowspan`和`colspan`的对象。

```html
<template>
  <div>
    <p class="tip">右键菜单，支持表头菜单、内容菜单、表尾菜单，自定义样式，配置项 ={header,body,footer}</p>

    <gj-table
      border
      show-footer
      highlight-current-row
      highlight-current-column
      ref="xTable"
      :footer-method="footerMethod"
      :data="tableData"
      :menu-config="tableMenu"
      @menu-click="contextMenuClickEvent">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" sortable></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="time" title="Time"></gj-column>
    </gj-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'test abc' }
      ],
      tableMenu: {
        className: 'my-menus',
        header: {
          options: [
            [
              { code: 'exportAll', name: '导出所有.csv' }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'copy', name: 'app.body.label.copy', prefixIcon: 'fa fa-copy', className: 'my-copy-item' }
            ],
            [
              { code: 'remove', name: '删除', prefixIcon: 'fa fa-trash-o color-red' },
              {
                name: '筛选',
                children: [
                  { code: 'clearFilter', name: '清除筛选' },
                  { code: 'filterSelect', name: '按所选单元格的值筛选' }
                ]
              },
              {
                code: 'sort',
                name: '排序',
                prefixIcon: 'fa fa-sort color-blue',
                children: [
                  { code: 'clearSort', name: '清除排序' },
                  { code: 'sortAsc', name: '升序', prefixIcon: 'fa fa-sort-alpha-asc color-orange' },
                  { code: 'sortDesc', name: '倒序', prefixIcon: 'fa fa-sort-alpha-desc color-orange' }
                ]
              },
              { code: 'print', name: '打印', disabled: true }
            ]
          ]
        },
        footer: {
          options: [
            [
              { code: 'clearAll', name: '清空数据' }
            ]
          ]
        }
      },
    }
  },
  methods: {
    contextMenuClickEvent ({ menu, row, column }) {
      console.log({ menu, row, column })
      switch (menu.code) {
        case 'copy':
          // 示例
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              this.$XModal.message({ content: '已复制到剪贴板！', status: 'success' })
            }
          }
          break
        default:
          this.$message(`点击了 ${menu.name} 选项`)
      }
    },
    meanNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return parseInt(this.meanNum(data, column.property))
          }
          return null
        })
      ]
    }
  }
}
</script>

<style>
.my-menus {
  background-color: #F8F8F9;
}
.my-menus .vxe-ctxmenu--link {
  width: 200px;
}
.my-copy-item {
  font-weight: 700;
  font-style: oblique;
}
.color-red {
  color: red;
}
.color-blue {
  color: blue;
}
.color-orange {
  color: orange;
}
</style>


```
:::



### gj-TABLE API


<iframe height="865" style="width: 100%;" scrolling="no" title="GildataDesign demo" src="http://10.106.1.122//tableDoc/#/table/api" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ziyoung/pen/rRKYpd/'>GildataDesign demo</a> by hetech
  (<a href='https://codepen.io/ziyoung'>@ziyoung</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### gj-COLUM API


<iframe height="865" style="width: 100%;" scrolling="no" title="GildataDesign demo" src="http://10.106.1.122/tableDoc/#/column/api" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ziyoung/pen/rRKYpd/'>GildataDesign demo</a> by hetech
  (<a href='https://codepen.io/ziyoung'>@ziyoung</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>




