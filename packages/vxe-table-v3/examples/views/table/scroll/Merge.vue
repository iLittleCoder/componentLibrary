<template>
  <div>
    <p class="tip">
      虚拟渲染与单元格合并，可以通过设置参数 <table-api-link prop="merge-cells"/> 或调用函数 <table-api-link prop="setMergeCells"/>、<table-api-link prop="setMergeCells"/> 来控制单元格的临时合并状态<br>
      <span class="red">（注：合并是以牺牲渲染性能为代价，如果需要用合并建议关闭虚拟滚动）</span>
    </p>

    <jy-table
      border
      resizable
      show-overflow
      show-header-overflow
      show-footer
      ref="xTable"
      height="500"
      :export-config="{}"
      :merge-cells="mergeCells"
      :sort-config="{trigger: 'cell'}"
      :merge-footer-items="mergeFooterItems"
      :footer-method="footerMethod"
      :loading="loading">
      <jy-column type="seq" width="100"></jy-column>
      <jy-column field="name" title="Name" sortable width="200"></jy-column>
      <jy-column field="id" title="ID" width="200"></jy-column>
      <jy-column field="sex" title="Sex" width="200"></jy-column>
      <jy-column field="rate" title="Rate" width="200"></jy-column>
      <jy-column field="region" title="Region" width="200"></jy-column>
      <jy-column field="time" title="Time" width="200"></jy-column>
      <jy-column field="address" title="Address" width="300" show-overflow></jy-column>
      <jy-column field="updateTime" title="UpdateTime" width="200"></jy-column>
      <jy-column field="createTime" title="CreateTime" width="200"></jy-column>
      <jy-column field="attr1" title="Attr1" width="200"></jy-column>
      <jy-column field="attr2" title="Attr2" width="200"></jy-column>
      <jy-column field="attr3" title="Attr3" width="200"></jy-column>
      <jy-column field="attr4" title="Attr4" width="200"></jy-column>
      <jy-column field="attr5" title="Attr5" width="200"></jy-column>
      <jy-column field="attr6" title="Attr6" width="200"></jy-column>
      <jy-column field="attr7" title="Attr7" width="200"></jy-column>
      <jy-column field="attr8" title="Attr8" width="200"></jy-column>
      <jy-column field="attr11" title="attr11" width="200"></jy-column>
      <jy-column field="attr9" title="Attr9" width="200"></jy-column>
      <jy-column field="attr10" title="attr10" width="200"></jy-column>
    </jy-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      mergeCells: [
        { row: 4, col: 2, rowspan: 2, colspan: 5 },
        { row: 30, col: 3, rowspan: 10, colspan: 1 },
        { row: 80, col: 4, rowspan: 30, colspan: 3 }
      ],
      mergeFooterItems: [
        { row: 0, col: 1, rowspan: 1, colspan: 2 },
        { row: 0, col: 6, rowspan: 1, colspan: 2 },
        { row: 0, col: 14, rowspan: 2, colspan: 5 },
        { row: 1, col: 4, rowspan: 1, colspan: 8 }
      ],
      demoCodes: [
        `
        <jy-table
          border
          resizable
          show-overflow
          show-header-overflow
          show-footer
          ref="xTable"
          height="500"
          :export-config="{}"
          :merge-cells="mergeCells"
          :sort-config="{trigger: 'cell'}"
          :merge-footer-items="mergeFooterItems"
          :footer-method="footerMethod"
          :loading="loading">
          <jy-column type="seq" width="100"></jy-column>
          <jy-column field="name" title="Name" sortable width="200"></jy-column>
          <jy-column field="id" title="ID" width="200"></jy-column>
          <jy-column field="sex" title="Sex" width="200"></jy-column>
          <jy-column field="rate" title="Rate" width="200"></jy-column>
          <jy-column field="region" title="Region" width="200"></jy-column>
          <jy-column field="time" title="Time" width="200"></jy-column>
          <jy-column field="address" title="Address" width="300" show-overflow></jy-column>
          <jy-column field="updateTime" title="UpdateTime" width="200"></jy-column>
          <jy-column field="createTime" title="CreateTime" width="200"></jy-column>
          <jy-column field="attr1" title="Attr1" width="200"></jy-column>
          <jy-column field="attr2" title="Attr2" width="200"></jy-column>
          <jy-column field="attr3" title="Attr3" width="200"></jy-column>
          <jy-column field="attr4" title="Attr4" width="200"></jy-column>
          <jy-column field="attr5" title="Attr5" width="200"></jy-column>
          <jy-column field="attr6" title="Attr6" width="200"></jy-column>
          <jy-column field="attr7" title="Attr7" width="200"></jy-column>
          <jy-column field="attr8" title="Attr8" width="200"></jy-column>
          <jy-column field="attr11" title="attr11" width="200"></jy-column>
          <jy-column field="attr9" title="Attr9" width="200"></jy-column>
          <jy-column field="attr10" title="attr10" width="200"></jy-column>
        </jy-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              mergeCells: [
                { row: 4, col: 2, rowspan: 2, colspan: 5 },
                { row: 30, col: 3, rowspan: 10, colspan: 1 },
                { row: 80, col: 4, rowspan: 30, colspan: 3 }
              ],
              mergeFooterItems: [
                { row: 0, col: 1, rowspan: 1, colspan: 2 },
                { row: 0, col: 6, rowspan: 1, colspan: 2 },
                { row: 0, col: 14, rowspan: 2, colspan: 5 },
                { row: 1, col: 4, rowspan: 1, colspan: 8 }
              ]
            }
          },
          created () {
            this.loadList(600)
          },
          methods: {
            loadList (size) {
              this.loading = true
              setTimeout(() => {
                const data = this.mockList(size)
                // 使用函数式加载，阻断 vue 对大数据的监听
                const xTable = this.$refs.xTable
                const startTime = Date.now()
                if (xTable) {
                  this.$refs.xTable.reloadData(data).then(() => {
                    this.$XModal.message({ content: \`渲染 \${size} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
                    this.loading = false
                  })
                } else {
                  this.loading = false
                }
              }, 300)
            },
            mockList (size) {
              const list = []
              for (let index = 0; index < size; index++) {
                list.push({
                  name: \`名称\${index}\`,
                  sex: '0',
                  num: 123,
                  age: 18,
                  num2: 234,
                  rate: 3,
                  address: 'shenzhen'
                })
              }
              return list
            },
            footerMethod ({ columns }) {
              return [
                columns.map((column, index) => index),
                columns.map((column, index) => 1000 + index)
              ]
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loadList(600)
  },
  methods: {
    loadList (size) {
      this.loading = true
      setTimeout(() => {
        const data = this.mockList(size)
        // 使用函数式加载，阻断 vue 对大数据的监听
        const xTable = this.$refs.xTable
        const startTime = Date.now()
        if (xTable) {
          this.$refs.xTable.reloadData(data).then(() => {
            this.$XModal.message({ content: `渲染 ${size} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
            this.loading = false
          })
        } else {
          this.loading = false
        }
      }, 300)
    },
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
    },
    footerMethod ({ columns }) {
      return [
        columns.map((column, index) => index),
        columns.map((column, index) => 1000 + index)
      ]
    }
  }
}
</script>
