<template>
  <div>
    <p class="tip">分组表头<br><span class="red">（注：分组表头不支持横向虚拟滚动，通过设置 scroll-x={enabled: false} 关闭即可）</span></p>

    <jy-table
      border
      resizable
      show-overflow
      ref="xTable"
      height="500"
      :scroll-x="{enabled: false}"
      :loading="loading">
      <jy-column type="seq" title="序号" width="100"></jy-column>
      <vxe-colgroup title="基本信息">
        <jy-column field="name" title="Name" width="200" sortable></jy-column>
        <jy-column field="age" title="Age" width="200"></jy-column>
        <jy-column field="sex" title="Sex" width="200"></jy-column>
      </vxe-colgroup>
      <vxe-colgroup title="详细信息">
        <vxe-colgroup title="分组">
          <jy-column field="rate" title="Rate" width="200"></jy-column>
          <jy-column field="region" title="Region" width="200"></jy-column>
        </vxe-colgroup>
        <vxe-colgroup title="其他">
          <jy-column field="time" title="Time" width="200" sortable></jy-column>
          <jy-column field="address" title="Address" width="300" show-overflow></jy-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <jy-column field="updateTime" title="UpdateTime" width="200"></jy-column>
      <jy-column field="createTime" title="CreateTime" width="200"></jy-column>
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
      demoCodes: [
        `
        <jy-table
          border
          resizable
          show-overflow
          ref="xTable"
          height="500"
          :scroll-x="{enabled: false}"
          :loading="loading">
          <jy-column type="seq" title="序号" width="100"></jy-column>
          <vxe-colgroup title="基本信息">
            <jy-column field="name" title="Name" width="200" sortable></jy-column>
            <jy-column field="age" title="Age" width="200"></jy-column>
            <jy-column field="sex" title="Sex" width="200"></jy-column>
          </vxe-colgroup>
          <vxe-colgroup title="详细信息">
            <vxe-colgroup title="分组">
              <jy-column field="rate" title="Rate" width="200"></jy-column>
              <jy-column field="region" title="Region" width="200"></jy-column>
            </vxe-colgroup>
            <vxe-colgroup title="其他">
              <jy-column field="time" title="Time" width="200" sortable></jy-column>
              <jy-column field="address" title="Address" width="300" show-overflow></jy-column>
            </vxe-colgroup>
          </vxe-colgroup>
          <jy-column field="updateTime" title="UpdateTime" width="200"></jy-column>
          <jy-column field="createTime" title="CreateTime" width="200"></jy-column>
        </jy-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          mounted () {
            this.loading = true
            this.$nextTick(() => {
              const $table = this.$refs.xTable
              this.mockList(1000).then(data => {
                this.loading = false
                if ($table) {
                  $table.loadData(data)
                }
              })
            })
          },
          methods: {
            mockList (size) {
              return new Promise(resolve => {
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
                resolve(list)
              })
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    this.loading = true
    this.$nextTick(() => {
      const $table = this.$refs.xTable
      this.mockList(1000).then(data => {
        this.loading = false
        if ($table) {
          $table.loadData(data)
        }
      })
    })
  },
  methods: {
    mockList (size) {
      return new Promise(resolve => {
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
        resolve(list)
      })
    }
  }
}
</script>
