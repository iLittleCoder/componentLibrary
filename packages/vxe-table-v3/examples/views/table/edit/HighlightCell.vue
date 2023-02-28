<template>
  <div>
    <p class="tip">高亮单元格编辑，通过 <table-api-link prop="highlight-cell"/> 属性设置<span class="red">（注：仅支持部分组件）</span></p>

    <jy-table
      border
      show-overflow
      highlight-cell
      keep-source
      max-height="400"
      :data="tableData"
      :mouse-config="{selected: true}"
      :keyboard-config="{isArrow: true, isDel: true, isTab: true, isEdit: true}"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
      <jy-column field="name" title="Name" :edit-render="{name: 'input'}"></jy-column>
      <jy-column field="nickname" title="Nickname" :edit-render="{name: 'input'}"></jy-column>
      <jy-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></jy-column>
      <jy-column field="age" title="Age" :edit-render="{name: '$input', props: {type: 'integer'}}"></jy-column>
      <jy-column field="address" title="Address" :edit-render="{name: 'textarea'}"></jy-column>
      <jy-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></jy-column>
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
      sexList: [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ],
      demoCodes: [
        `
        <jy-table
          border
          show-overflow
          highlight-cell
          keep-source
          max-height="400"
          :data="tableData"
          :mouse-config="{selected: true}"
          :keyboard-config="{isArrow: true, isDel: true, isTab: true, isEdit: true}"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
          <jy-column field="name" title="Name" :edit-render="{name: 'input'}"></jy-column>
          <jy-column field="nickname" title="Nickname" :edit-render="{name: 'input'}"></jy-column>
          <jy-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></jy-column>
          <jy-column field="age" title="Age" :edit-render="{name: '$input', props: {type: 'integer'}}"></jy-column>
          <jy-column field="address" title="Address" :edit-render="{name: 'textarea'}"></jy-column>
          <jy-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></jy-column>
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
              ],
              sexList: [
                { label: '女', value: '0' },
                { label: '男', value: '1' }
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
