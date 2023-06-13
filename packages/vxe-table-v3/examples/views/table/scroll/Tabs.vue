<template>
  <div>
    <p class="tip">
      Tab 页签切换<span class="red">（如果需要将表格放到隐藏的元素中，那么就必然会导致宽度无法计算）</span>，有以下方法解决<br>
      1.每次切换 Tab 页显示之后手动调用 <table-api-link prop="recalculate"/> 重新计算表格<br>
      2.使用 <table-api-link prop="sync-resize"/> 绑定指定的变量来触发重新计算表格<br>
      3.使用 <table-api-link prop="auto-resize"/> 自动监听父容器来触发重新计算表格
    </p>

    <p>
      <vxe-radio-group v-model="selectTab">
        <vxe-radio-button label="tab1" content="页签1"></vxe-radio-button>
        <vxe-radio-button label="tab2" content="页签2"></vxe-radio-button>
        <vxe-radio-button label="tab3" content="页签3"></vxe-radio-button>
      </vxe-radio-group>
    </p>

    <div v-show="selectTab === 'tab1'">
      <gj-table
        border
        show-overflow
        height="400"
        :sync-resize="selectTab"
        :data="tableData">
        <gj-column type="seq" width="60"></gj-column>
        <gj-column field="name" title="Name"></gj-column>
        <gj-column field="sex" title="Sex"></gj-column>
        <gj-column field="address" title="Address" show-overflow></gj-column>
      </gj-table>
    </div>

    <div v-show="selectTab === 'tab2'">
      <gj-table
        border
        show-overflow
        height="400"
        :sync-resize="selectTab"
        :data="tableData">
        <gj-column type="radio" width="60"></gj-column>
        <gj-column field="role" title="Rolw"></gj-column>
        <gj-column field="age" title="Age"></gj-column>
        <gj-column field="num" title="Num"></gj-column>
        <gj-column field="date12" title="Date"></gj-column>
      </gj-table>
    </div>

    <div v-show="selectTab === 'tab3'">
      <gj-table
        border
        show-overflow
        height="400"
        :sync-resize="selectTab"
        :data="tableData">
        <gj-column type="checkbox" width="60"></gj-column>
        <gj-column field="nickname" title="nickname"></gj-column>
        <gj-column field="sex" title="Sex"></gj-column>
        <gj-column field="age" title="Age"></gj-column>
        <gj-column field="date12" title="Date"></gj-column>
        <gj-column field="region" title="Region"></gj-column>
        <gj-column field="rate" title="Rate"></gj-column>
      </gj-table>
    </div>

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
      selectTab: 'tab1',
      tableData: [],
      demoCodes: [
        `
        <p>
          <vxe-radio-group v-model="selectTab">
            <vxe-radio-button label="tab1" content="页签1"></vxe-radio-button>
            <vxe-radio-button label="tab2" content="页签2"></vxe-radio-button>
            <vxe-radio-button label="tab3" content="页签3"></vxe-radio-button>
          </vxe-radio-group>
        </p>

        <div v-show="selectTab === 'tab1'">
          <gj-table
            border
            show-overflow
            height="400"
            :sync-resize="selectTab"
            :data="tableData">
            <gj-column type="seq" width="60"></gj-column>
            <gj-column field="name" title="Name"></gj-column>
            <gj-column field="sex" title="Sex"></gj-column>
            <gj-column field="address" title="Address" show-overflow></gj-column>
          </gj-table>
        </div>

        <div v-show="selectTab === 'tab2'">
          <gj-table
            border
            show-overflow
            height="400"
            :sync-resize="selectTab"
            :data="tableData">
            <gj-column type="radio" width="60"></gj-column>
            <gj-column field="role" title="Rolw"></gj-column>
            <gj-column field="age" title="Age"></gj-column>
            <gj-column field="num" title="Num"></gj-column>
            <gj-column field="date12" title="Date"></gj-column>
          </gj-table>
        </div>

        <div v-show="selectTab === 'tab3'">
          <gj-table
            border
            show-overflow
            height="400"
            :sync-resize="selectTab"
            :data="tableData">
            <gj-column type="checkbox" width="60"></gj-column>
            <gj-column field="nickname" title="nickname"></gj-column>
            <gj-column field="sex" title="Sex"></gj-column>
            <gj-column field="age" title="Age"></gj-column>
            <gj-column field="date12" title="Date"></gj-column>
            <gj-column field="region" title="Region"></gj-column>
            <gj-column field="rate" title="Rate"></gj-column>
          </gj-table>
        </div>
        `,
        `
        export default {
          data () {
            return {
              selectTab: 'tab1',
              tableData: []
            }
          },
          created () {
            this.tableData = this.mockList(600)
          },
          methods: {
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
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = this.mockList(600)
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
