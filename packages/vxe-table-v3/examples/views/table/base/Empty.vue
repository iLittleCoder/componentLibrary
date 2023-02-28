<template>
  <div>
    <p class="tip">当数据为空时，通过 <table-api-link prop="empty-text"/> 设置空数据提示文本，可以使用 <router-link class="link" :to="{name: 'RendererEmpty'}">渲染器</router-link> 实现全局复用</p>

    <jy-table
      empty-text="没有更多数据了！"
      :data="tableData">
      <jy-column type="seq" width="60"></jy-column>
      <jy-column field="name" title="Name"></jy-column>
      <jy-column field="sex" title="Sex"></jy-column>
      <jy-column field="age" title="Age"></jy-column>
    </jy-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">可以通过 slot=<table-api-link prop="empty"/> 自定义提示语</p>

    <jy-table
      border
      :loading="loading"
      :data="tableData">
      <jy-column type="seq" width="60"></jy-column>
      <jy-column field="name" title="Name"></jy-column>
      <jy-column field="sex" title="Sex"></jy-column>
      <jy-column field="age" title="Age"></jy-column>
      <jy-column field="address" title="Address" show-overflow></jy-column>
      <template #empty>
        <span style="color: red;">
          <img src="/jy-table/static/other/img2.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </jy-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">出现滚动条</p>

    <jy-table
      border
      height="300"
      :loading="loading"
      :data="tableData">
      <jy-column type="seq" width="60"></jy-column>
      <jy-column field="name" title="Name" width="300"></jy-column>
      <jy-column field="sex" title="Sex" width="300"></jy-column>
      <jy-column field="age" title="Age" width="300"></jy-column>
      <jy-column field="date12" title="Date" width="300"></jy-column>
      <jy-column field="address" title="Address" width="300" show-overflow></jy-column>
      <template #empty>
        <span style="color: red;">
          <img src="/jy-table/static/other/img1.gif">
          <p>不用再看了，没有更多数据了！</p>
        </span>
      </template>
    </jy-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: [],
      tableData2: [],
      demoCodes: [
        `
        <jy-table
          empty-text="没有更多数据了！"
          :data="tableData">
          <jy-column type="seq" width="60"></jy-column>
          <jy-column field="name" title="Name"></jy-column>
          <jy-column field="sex" title="Sex"></jy-column>
          <jy-column field="age" title="Age"></jy-column>
        </jy-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            setTimeout(() => {
              this.tableData = []
            }, 1000)
          }
        }
        `,
        `
        <jy-table
          border
          :loading="loading"
          :data="tableData">
          <jy-column type="seq" width="60"></jy-column>
          <jy-column field="name" title="Name"></jy-column>
          <jy-column field="sex" title="Sex"></jy-column>
          <jy-column field="age" title="Age"></jy-column>
          <jy-column field="address" title="Address" show-overflow></jy-column>
          <template #empty>
            <span style="color: red;">
              <img src="/jy-table/static/other/img2.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
        </jy-table>
        `,
        `
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
              this.tableData = []
              this.loading = false
            }, 1000)
          }
        }
        `,
        `
        <jy-table
          border
          height="300"
          :loading="loading"
          :data="tableData">
          <jy-column type="seq" width="60"></jy-column>
          <jy-column field="name" title="Name" width="300"></jy-column>
          <jy-column field="sex" title="Sex" width="300"></jy-column>
          <jy-column field="age" title="Age" width="300"></jy-column>
          <jy-column field="date12" title="Date" width="300"></jy-column>
          <jy-column field="address" title="Address" width="300" show-overflow></jy-column>
          <template #empty>
            <span style="color: red;">
              <img src="/jy-table/static/other/img1.gif">
              <p>不用再看了，没有更多数据了！</p>
            </span>
          </template>
        </jy-table>
        `,
        `
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
              this.tableData = []
              this.loading = false
            }, 1000)
          }
        }
        `
      ]
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
