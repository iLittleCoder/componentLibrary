<template>
  <div>
    <p class="tip">
      斑马线条纹，通过设置 <table-api-link prop="stripe"/> 参数<br>
      <span class="red">（注：不支持树形结构，在可编辑表格场景下，临时插入的数据不会有斑马纹样式）</span>
    </p>

    <jy-table
      stripe
      :data="tableData">
      <jy-column type="seq" width="60"></jy-column>
      <jy-column field="name" title="Name"></jy-column>
      <jy-column field="sex" title="Sex"></jy-column>
      <jy-column field="age" title="Age"></jy-column>
      <jy-column field="address" title="Address" show-overflow></jy-column>
    </jy-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">使用 <table-api-link prop="highlight-hover-row"/> 属性启用 hover 行高亮</p>

    <jy-table
      stripe
      highlight-current-row
      highlight-hover-row
      :data="tableData">
      <jy-column type="seq" width="60"></jy-column>
      <jy-column field="name" title="Name"></jy-column>
      <jy-column field="sex" title="Sex"></jy-column>
      <jy-column field="age" title="Age"></jy-column>
      <jy-column field="address" title="Address" show-overflow></jy-column>
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
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      demoCodes: [
        `
        <jy-table
          stripe
          :data="tableData">
          <jy-column type="seq" width="60"></jy-column>
          <jy-column field="name" title="Name"></jy-column>
          <jy-column field="sex" title="Sex"></jy-column>
          <jy-column field="age" title="Age"></jy-column>
          <jy-column field="address" title="Address" show-overflow></jy-column>
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
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        <jy-table
          stripe
          highlight-current-row
          highlight-hover-row
          :data="tableData">
          <jy-column type="seq" width="60"></jy-column>
          <jy-column field="name" title="Name"></jy-column>
          <jy-column field="sex" title="Sex"></jy-column>
          <jy-column field="age" title="Age"></jy-column>
          <jy-column field="address" title="Address" show-overflow></jy-column>
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
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
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
