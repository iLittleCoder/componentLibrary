<template>
  <div>
    <p class="tip">
      可编辑渲染 <table-column-api-link prop="edit-render"/>，查看 <a class="link" href="https://gitee.com/xuliangzhan_admin/jy-table/tree/v3/examples/plugins/table/renderer" target="_blank">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      autofocus 自动聚焦的类名<br>
      renderHeader (h, renderOpts, params: { column, columnIndex, columnIndex, $rowIndex, $table }) 表头单元格显示内容<br>
      renderEdit (h, renderOpts, params: { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $table }) 单元格-编辑内容<br>
      renderCell (h, renderOpts, params: { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $table }) 单元格-显示内容<br>
      renderFooter (h, renderOpts, params: { column, columnIndex, $columnIndex, $rowIndex, _columnIndex, items, $table }) 表尾单元格显示内容<br>
      exportMethod (params: { row, column }) 单元格导出函数<br>
      footerExportMethod (params: { items, _columnIndex }) 表尾单元格导出函数<br>
    </p>

    <jy-table
      border
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <jy-column type="seq" width="60"></jy-column>
      <jy-column field="name" title="简单输入框" :edit-render="{name: 'MyInput'}"></jy-column>
      <jy-column field="role" title="下拉表格" :edit-render="{name: 'EditDownTable'}"></jy-column>
      <jy-column field="sex" title="弹窗表格" :edit-render="{name: 'EditPopupModal'}"></jy-column>
      <jy-column field="address" title="复杂渲染" :edit-render="{name: 'EditDownModal'}"></jy-column>
    </jy-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="javascript">{{ demoCodes[0] }}</pre-code>
      <pre-code class="xml">{{ demoCodes[1] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data  () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
      ],
      demoCodes: [
        `
        // 创建一个简单输入框渲染
        VXETable.renderer.add('MyInput', {
          // 可编辑激活模板
          renderEdit (h, renderOpts, { row, column }) {
            return [
              <input class="my-cell" text="text" v-model={ row[column.property] } />
            ]
          },
          // 可编辑显示模板
          renderCell (h, renderOpts, { row, column }) {
            return [
              <span>{ row[column.property] }</span>
            ]
          },
          // 导出模板，例如导出插槽中自定义的内容
          exportMethod (params) {
            const { row, column } = params
            return '自定义内容'
          }
        })
        `,
        `
        <jy-table
          border
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <jy-column type="seq" width="60"></jy-column>
          <jy-column field="name" title="简单输入框" :edit-render="{name: 'MyInput'}"></jy-column>
          <jy-column field="role" title="下拉表格" :edit-render="{name: 'EditDownTable'}"></jy-column>
          <jy-column field="sex" title="弹窗表格" :edit-render="{name: 'EditPopupModal'}"></jy-column>
          <jy-column field="address" title="复杂渲染" :edit-render="{name: 'EditDownModal'}"></jy-column>
        </jy-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
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
