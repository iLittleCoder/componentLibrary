<template>
  <div>
    <p class="tip">通过设置 <table-api-link prop="border"/>=false|default 默认显示边框</p>

    <gj-table
      show-footer
      height="200"
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    <p class="tip">通过设置 <table-api-link prop="border"/>=true|full 显示完整边框</p>

    <gj-table
      border
      show-footer
      height="200"
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    <p class="tip">通过设置 <table-api-link prop="border"/>=outer 显示外边框</p>

    <gj-table
      show-footer
      height="200"
      border="outer"
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    <p class="tip">通过设置 <table-api-link prop="border"/>=inner 显示内边框</p>

    <gj-table
      show-footer
      height="200"
      border="inner"
      :footer-method="footerMethod"
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    <p class="tip">通过设置 <table-api-link prop="border"/>=none 去掉所有边框</p>

    <gj-table
      show-footer
      height="200"
      border="none"
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
