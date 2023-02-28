<template>
  <div>
    <p class="tip">设置 <table-api-link prop="edit-config"/>={trigger: 'dblclick', mode: 'cell'} 启用单元格双击编辑的功能<br></p>

    <jy-table
      border
      resizable
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <jy-column type="seq" width="60"></jy-column>
      <jy-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></jy-column>
      <jy-column field="role" title="Role" :edit-render="{name: 'input', attrs: {type: 'text', placeholder: '请输入昵称'}}"></jy-column>
      <jy-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList, optionProps: {value: 'value', label: 'label'}}"></jy-column>
      <jy-column field="sex2" title="多选下拉" :edit-render="{name: '$select', options: sexList, props: {multiple: true}}"></jy-column>
      <jy-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></jy-column>
      <jy-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></jy-column>
      <jy-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week', placeholder: '请选择日期'}}"></jy-column>
    </jy-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">设置 <table-api-link prop="edit-config"/>={trigger: 'dblclick', mode: 'row'} 启用行双击编辑的功能</p>

    <jy-table
      border
      resizable
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'dblclick', mode: 'row'}">
      <jy-column type="seq" width="60"></jy-column>
      <jy-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></jy-column>
      <jy-column field="role" title="Role" :edit-render="{name: 'input', attrs: {type: 'text'}}"></jy-column>
      <jy-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></jy-column>
      <jy-column field="num1" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></jy-column>
      <jy-column field="date13" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></jy-column>
      <jy-column field="address" title="Address" :edit-render="{name: 'input', attrs: {type: 'text'}}"></jy-column>
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
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
      ],
      sexList: [
        { label: '', value: '' },
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ],
      demoCodes: [
        `
        <jy-table
          border
          resizable
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <jy-column type="seq" width="60"></jy-column>
          <jy-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></jy-column>
          <jy-column field="role" title="Role" :edit-render="{name: 'input', attrs: {type: 'text', placeholder: '请输入昵称'}}"></jy-column>
          <jy-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList, optionProps: {value: 'value', label: 'label'}}"></jy-column>
          <jy-column field="sex2" title="多选下拉" :edit-render="{name: '$select', options: sexList, props: {multiple: true}}"></jy-column>
          <jy-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></jy-column>
          <jy-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></jy-column>
          <jy-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week', placeholder: '请选择日期'}}"></jy-column>
        </jy-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
              ],
              sexList: [
                { label: '', value: '' },
                { label: '男', value: '1' },
                { label: '女', value: '0' }
              ]
            }
          }
        }
        `,
        `
        <jy-table
          border
          resizable
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'dblclick', mode: 'row'}">
          <jy-column type="seq" width="60"></jy-column>
          <jy-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></jy-column>
          <jy-column field="role" title="Role" :edit-render="{name: 'input', attrs: {type: 'text'}}"></jy-column>
          <jy-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></jy-column>
          <jy-column field="num1" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></jy-column>
          <jy-column field="date13" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></jy-column>
          <jy-column field="address" title="Address" :edit-render="{name: 'input', attrs: {type: 'text'}}"></jy-column>
        </jy-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
              ],
              sexList: [
                { label: '', value: '' },
                { label: '男', value: '1' },
                { label: '女', value: '0' }
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
