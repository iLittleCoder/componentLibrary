<template>
  <div>
    <p>子路由 3</p>

    <jy-table
      border
      show-overflow
      ref="xTable"
      height="400"
      :loading="loading">
      <jy-column type="checkbox" width="60"></jy-column>
      <jy-column field="name" title="Name"></jy-column>
      <jy-column field="sex" title="Sex"></jy-column>
      <jy-column field="age" title="Age"></jy-column>
      <jy-column field="num" title="Num"></jy-column>
      <jy-column field="num2" title="Num2"></jy-column>
      <jy-column field="rate" title="Rate"></jy-column>
    </jy-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      const $table = this.$refs.xTable
      if ($table) {
        $table.loadData(this.mockList(600))
      }
      this.loading = false
    }, 300)
  },
  methods: {
    mockList (size) {
      const list = []
      for (let index = 0; index < size; index++) {
        list.push({
          name: `名称${index}`,
          sex: '0',
          num: 123,
          age: 18,
          num2: 234,
          rate: 3,
          address: 'shenzhen'
        })
      }
      return list
    }
  }
}
</script>
