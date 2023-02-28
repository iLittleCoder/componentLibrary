<template>
  <div>
    <p class="tip">
      固定列，通过设置 <table-column-api-link prop="fixed"/>=left|right 来启用固定列<br>
      当横向内容过多时，将列固定在左右两侧
    </p>

    <jy-table
      border="inner"
      show-overflow
      :data="tableData">
      <jy-column type="seq" width="60" fixed="left"></jy-column>
      <jy-column field="name" title="Name" width="300"></jy-column>
      <jy-column field="role" title="Role" width="300"></jy-column>
      <jy-column field="sex" title="Sex" width="300"></jy-column>
      <jy-column field="date" title="Date" width="300"></jy-column>
      <jy-column field="address" title="Address" fixed="right" width="300"></jy-column>
    </jy-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">如果列宽足够的情况下，固定列不会浮动</p>

    <jy-table
      border
      show-overflow
      :data="tableData">
      <jy-column type="seq" width="60" fixed="left"></jy-column>
      <jy-column field="name" title="Name"></jy-column>
      <jy-column field="role" title="Role"></jy-column>
      <jy-column field="sex" title="Sex"></jy-column>
      <jy-column field="age" title="Age"></jy-column>
      <jy-column field="address" title="Address" fixed="right" width="300"></jy-column>
    </jy-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>
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
      ],
      demoCodes: [
        `
        <jy-table
          border="inner"
          show-overflow
          :data="tableData">
          <jy-column type="seq" width="60" fixed="left"></jy-column>
          <jy-column field="name" title="Name" width="300"></jy-column>
          <jy-column field="role" title="Role" width="300"></jy-column>
          <jy-column field="sex" title="Sex" width="300"></jy-column>
          <jy-column field="date" title="Date" width="300"></jy-column>
          <jy-column field="address" title="Address" fixed="right" width="300"></jy-column>
        </jy-table>
        `,
        `
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
          }
        }
        `,
        `
        <jy-table
          border
          show-overflow
          :data="tableData">
          <jy-column type="seq" width="60" fixed="left"></jy-column>
          <jy-column field="name" title="Name"></jy-column>
          <jy-column field="role" title="Role"></jy-column>
          <jy-column field="sex" title="Sex"></jy-column>
          <jy-column field="age" title="Age"></jy-column>
          <jy-column field="address" title="Address" fixed="right" width="300"></jy-column>
        </jy-table>
        `,
        `
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
          }
        }
        `
      ]
    }
  }
}
</script>
