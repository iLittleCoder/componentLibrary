<template>
  <div>
    <p>子路由 3</p>

    <gj-table
      border
      show-overflow
      ref="xTable"
      height="400"
      :loading="loading">
      <gj-column type="checkbox" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="Sex"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="num" title="Num"></gj-column>
      <gj-column field="num2" title="Num2"></gj-column>
      <gj-column field="rate" title="Rate"></gj-column>
    </gj-table>
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
