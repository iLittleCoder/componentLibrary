<template>
  <div>
    <p class="tip">
      <table-api-link name="gj-table"/> 基础表格，基于模板方式使用非常简单、便捷<br>
      <span class="red">（注：每一列 field 字段属性不可更改）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="allAlign = 'left'">居左</vxe-button>
        <vxe-button @click="allAlign = 'center'">居中</vxe-button>
        <vxe-button @click="allAlign = 'right'">居右</vxe-button>
      </template>
    </vxe-toolbar>
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

    <p class="tip">使用 <table-api-link prop="highlight-hover-row"/> 属性启用 hover 行高亮</p>

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
