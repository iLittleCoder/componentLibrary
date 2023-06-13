<template>
  <div>
    <p>子路由 3</p>

    <gj-table
      border
      height="400"
      :loading="loading"
      :data="tableData">
      <gj-column type="checkbox" width="60"></gj-column>
      <gj-column field="nickname" title="nickname"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="amount" title="Amount"></gj-column>
      <gj-column field="address" title="Address"></gj-column>
    </gj-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.tableData = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' }
      ]
      this.loading = false
    }, 300)
  }
}
</script>
