<template>
  <div>
    <p>子路由 3</p>

    <jy-table
      border
      height="400"
      :loading="loading"
      :data="tableData">
      <jy-column type="checkbox" width="60"></jy-column>
      <jy-column field="nickname" title="nickname"></jy-column>
      <jy-column field="sex" title="Sex"></jy-column>
      <jy-column field="age" title="Age"></jy-column>
      <jy-column field="amount" title="Amount"></jy-column>
      <jy-column field="address" title="Address"></jy-column>
    </jy-table>
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
