<template>
  <div>
    <p class="tip">通过设置 <table-api-link prop="resizable"/> 属性启用列宽拖动功能</p>

    <gj-table
      resizable
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name"></gj-column>
      <gj-column field="sex" title="最小列宽" min-width="20%"></gj-column>
      <gj-column field="age" title="Age"></gj-column>
      <gj-column field="time" title="Time"></gj-column>
      <gj-column field="address" title="Address" show-overflow></gj-column>
    </gj-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">横向滚动条</p>

    <gj-table
      border
      resizable
      highlight-hover-row
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" width="300"></gj-column>
      <gj-column field="sex" title="最小列宽" min-width="300"></gj-column>
      <gj-column field="age" title="Age" width="300"></gj-column>
      <gj-column field="time" title="Time" width="300"></gj-column>
      <gj-column field="address" title="Address" width="300" show-overflow></gj-column>
    </gj-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">固定左列宽拖动（固定左不允许超过表格右边距）</p>

    <gj-table
      border
      resizable
      :data="tableData">
      <gj-column type="seq" width="60" fixed="left"></gj-column>
      <gj-column field="name" title="Name" width="100" fixed="left"></gj-column>
      <gj-column field="sex" title="Sex" width="100" fixed="left"></gj-column>
      <gj-column field="age" title="Age" width="100" fixed="left"></gj-column>
      <gj-column field="atrr1" title="atrr1" width="200"></gj-column>
      <gj-column field="atrr2" title="atrr2" width="200"></gj-column>
      <gj-column field="atrr3" title="atrr3" width="200"></gj-column>
      <gj-column field="atrr4" title="atrr4" width="200"></gj-column>
      <gj-column field="time" title="Time" width="200"></gj-column>
      <gj-column field="address" title="Address" width="200" show-overflow></gj-column>
    </gj-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">固定右列宽拖动（固定右不允许超过表格左边距）</p>

    <gj-table
      border
      resizable
      :data="tableData">
      <gj-column type="seq" width="60"></gj-column>
      <gj-column field="name" title="Name" width="200"></gj-column>
      <gj-column field="attr7" title="Attr7" width="200"></gj-column>
      <gj-column field="age" title="Age" width="200"></gj-column>
      <gj-column field="atrr1" title="atrr1" width="200"></gj-column>
      <gj-column field="atrr2" title="atrr2" width="200"></gj-column>
      <gj-column field="atrr3" title="atrr3" width="200"></gj-column>
      <gj-column field="atrr4" title="atrr4" width="200"></gj-column>
      <gj-column field="role" title="Role" width="100" fixed="right"></gj-column>
      <gj-column field="atrr6" title="Atrr6" width="100" fixed="right"></gj-column>
      <gj-column field="sex" title="Sex" width="100" fixed="right"></gj-column>
    </gj-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[7] }}</pre-code>
    </pre>

    <p class="tip">左右固定列宽拖动（固定左不允许超过固定右，固定右不允许超过固定左）</p>

    <gj-table
      border
      resizable
      show-overflow
      :data="tableData">
      <gj-column type="seq" width="60" fixed="left"></gj-column>
      <gj-column field="name" title="Name" width="100" fixed="left"></gj-column>
      <gj-column field="sex" title="Sex" width="100" fixed="left"></gj-column>
      <gj-column field="age" title="Age" width="100" fixed="left"></gj-column>
      <gj-column field="atrr1" title="atrr1" width="200"></gj-column>
      <gj-column field="atrr2" title="atrr2 其他2" width="200"></gj-column>
      <gj-column field="atrr3" title="atrr3" width="200"></gj-column>
      <gj-column field="atrr4" title="atrr4 其他4" width="200"></gj-column>
      <gj-column field="date" title="Date" width="100" fixed="right"></gj-column>
      <gj-column field="time" title="Time" width="100" fixed="right"></gj-column>
      <gj-column field="address" title="Address" width="100" fixed="right"></gj-column>
    </gj-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[8] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[9] }}</pre-code>
    </pre>

    <p class="tip">分组表头拖动（只允许列拖动，不允许分组标题拖动）</p>

    <gj-table
      border
      resizable
      :data="tableData">
      <vxe-colgroup title="基本信息">
        <gj-column type="seq" width="60"></gj-column>
        <gj-column field="name" title="Name"></gj-column>
      </vxe-colgroup>
      <vxe-colgroup title="更多信息">
        <gj-column field="role" title="Role"></gj-column>
        <gj-column field="age" title="Age"></gj-column>
        <vxe-colgroup title="详细信息">
          <gj-column field="sex" title="Sex"></gj-column>
          <gj-column field="date" title="Date" width="140" show-overflow></gj-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <gj-column field="address" title="Address" width="200" show-overflow></gj-column>
    </gj-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[10] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[11] }}</pre-code>
    </pre>

    <p class="tip">左右固定列的分组表头拖动（只允许列拖动，不允许分组标题拖动）</p>

    <gj-table
      border
      resizable
      :data="tableData">
      <vxe-colgroup title="基本信息" fixed="left">
        <gj-column type="seq" width="60" fixed="left"></gj-column>
        <gj-column field="name" title="Name" fixed="left" width="100"></gj-column>
      </vxe-colgroup>
      <vxe-colgroup title="更多信息">
        <gj-column field="role" title="Role" width="300"></gj-column>
        <gj-column field="attr1" title="Attr1" width="300"></gj-column>
        <vxe-colgroup title="详细信息">
          <gj-column field="sex" title="Sex" width="300"></gj-column>
          <gj-column field="date" title="Date" width="300"></gj-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-colgroup title="其他信息" fixed="right">
        <gj-column field="age" title="Age" width="100" fixed="right" show-overflow></gj-column>
        <gj-column field="address" title="Address" width="100" fixed="right" show-overflow></gj-column>
      </vxe-colgroup>
    </gj-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[12] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[13] }}</pre-code>
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
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' }
      ],
      demoCodes: [
        `
        <gj-table
          resizable
          :data="tableData">
          <gj-column type="seq" width="60"></gj-column>
          <gj-column field="name" title="Name"></gj-column>
          <gj-column field="sex" title="最小列宽" min-width="20%"></gj-column>
          <gj-column field="age" title="Age"></gj-column>
          <gj-column field="time" title="Time"></gj-column>
          <gj-column field="address" title="Address" show-overflow></gj-column>
        </gj-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        <gj-table
          border
          resizable
          highlight-hover-row
          :data="tableData">
          <gj-column type="seq" width="60"></gj-column>
          <gj-column field="name" title="Name" width="300"></gj-column>
          <gj-column field="sex" title="最小列宽" min-width="300"></gj-column>
          <gj-column field="age" title="Age" width="300"></gj-column>
          <gj-column field="time" title="Time" width="300"></gj-column>
          <gj-column field="address" title="Address" width="300" show-overflow></gj-column>
        </gj-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        <gj-table
          border
          resizable
          :data="tableData">
          <gj-column type="seq" width="60" fixed="left"></gj-column>
          <gj-column field="name" title="Name" width="100" fixed="left"></gj-column>
          <gj-column field="sex" title="Sex" width="100" fixed="left"></gj-column>
          <gj-column field="age" title="Age" width="100" fixed="left"></gj-column>
          <gj-column field="atrr1" title="atrr1" width="200"></gj-column>
          <gj-column field="atrr2" title="atrr2" width="200"></gj-column>
          <gj-column field="atrr3" title="atrr3" width="200"></gj-column>
          <gj-column field="atrr4" title="atrr4" width="200"></gj-column>
          <gj-column field="time" title="Time" width="200"></gj-column>
          <gj-column field="address" title="Address" width="200" show-overflow></gj-column>
        </gj-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        <gj-table
          border
          resizable
          :data="tableData">
          <gj-column type="seq" width="60"></gj-column>
          <gj-column field="name" title="Name" width="200"></gj-column>
          <gj-column field="sex" title="Sex" width="200"></gj-column>
          <gj-column field="age" title="Age" width="200"></gj-column>
          <gj-column field="atrr1" title="atrr1" width="200"></gj-column>
          <gj-column field="atrr2" title="atrr2" width="200"></gj-column>
          <gj-column field="atrr3" title="atrr3" width="200"></gj-column>
          <gj-column field="atrr4" title="atrr4" width="200"></gj-column>
          <gj-column field="date" title="Date" width="100" fixed="right"></gj-column>
          <gj-column field="time" title="Time" width="100" fixed="right"></gj-column>
          <gj-column field="address" title="Address" width="100" fixed="right"></gj-column>
        </gj-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        <gj-table
          border
          resizable
          show-overflow
          :data="tableData">
          <gj-column type="seq" width="60" fixed="left"></gj-column>
          <gj-column field="name" title="Name" width="100" fixed="left"></gj-column>
          <gj-column field="sex" title="Sex" width="100" fixed="left"></gj-column>
          <gj-column field="age" title="Age" width="100" fixed="left"></gj-column>
          <gj-column field="atrr1" title="atrr1" width="200"></gj-column>
          <gj-column field="atrr2" title="atrr2 其他2" width="200"></gj-column>
          <gj-column field="atrr3" title="atrr3" width="200"></gj-column>
          <gj-column field="atrr4" title="atrr4 其他4" width="200"></gj-column>
          <gj-column field="date" title="Date" width="100" fixed="right"></gj-column>
          <gj-column field="time" title="Time" width="100" fixed="right"></gj-column>
          <gj-column field="address" title="Address" width="100" fixed="right"></gj-column>
        </gj-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        <gj-table
          border
          resizable
          :data="tableData">
          <vxe-colgroup title="基本信息">
            <gj-column type="seq" width="60"></gj-column>
            <gj-column field="name" title="Name"></gj-column>
          </vxe-colgroup>
          <vxe-colgroup title="更多信息">
            <gj-column field="role" title="Role"></gj-column>
            <gj-column field="age" title="Age"></gj-column>
            <vxe-colgroup title="详细信息">
              <gj-column field="sex" title="Sex"></gj-column>
              <gj-column field="date" title="Date" width="140" show-overflow></gj-column>
            </vxe-colgroup>
          </vxe-colgroup>
          <gj-column field="address" title="Address" width="200" show-overflow></gj-column>
        </gj-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        <gj-table
          border
          resizable
          :data="tableData">
          <vxe-colgroup title="基本信息" fixed="left">
            <gj-column type="seq" width="60" fixed="left"></gj-column>
            <gj-column field="name" title="Name" fixed="left" width="100"></gj-column>
          </vxe-colgroup>
          <vxe-colgroup title="更多信息">
            <gj-column field="role" title="Role" width="300"></gj-column>
            <gj-column field="attr1" title="Attr1" width="300"></gj-column>
            <vxe-colgroup title="详细信息">
              <gj-column field="sex" title="Sex" width="300"></gj-column>
              <gj-column field="date" title="Date" width="300"></gj-column>
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-colgroup title="其他信息" fixed="right">
            <gj-column field="age" title="Age" width="100" fixed="right" show-overflow></gj-column>
            <gj-column field="address" title="Address" width="100" fixed="right" show-overflow></gj-column>
          </vxe-colgroup>
        </gj-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' }
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
