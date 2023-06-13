<template>
    <div>
        <button @click="ADD">切换表头</button>
        <button @click="ADD2">111</button>
        <div style="width:500px">
            <vxe-table
                    border
                    height="400"
                    :data="tableData"
                    show-header-overflow
                    ref="table"
                    row-key
                    row-id="id"
            >
                <gj-column type="seq" title="Name" width="160" fixed="left"></gj-column>
                <template v-for="item in headDataT[T]">
                    <gj-column width="160" :field="item.key" :title="item.title" :fixed="item.fixed">
                        <template v-slot="{row}">
                            {{item.key}} 123
                        </template>
                    </gj-column>
                </template>
                <template v-for="item in headDataT[T]">
                    <gj-column width="160" :field="item.key" :title="item.title"></gj-column>
                </template>
                <template v-for="item in headDataT[T]">
                    <gj-column width="160" :field="item.key" :title="item.title"></gj-column>
                </template>
            </vxe-table>
        </div>

    </div>


</template>

<script>

  export default {
    data() {
      return {
        show: false,
        tableData: [
          {
            name: 'Test1',
            role: '前端',
            date: '2020-02-28',
            rate: 5,
            address: 'address1'

          },
          {
            name: 'Test2',
            role: '后端',
            date: '2020-02-22',
            rate: 2,
            address: 'address2\ntooltip文本换行\n换行xx'
          },
          {
            name: 'Test3',
            role: '前端',
            date: '2020-01-01',
            rate: 0,
            address: 'address3\ntooltip文本换行\n换行xx'

          },
          {name: 'Test4', role: '设计师', date: '2020-02-23', rate: 1, address: 'address4'},
          {
            name: 'Test5',
            role: '前端',
            date: '2020-01-20',
            rate: 3,
            address: 'address5\ntooltip文本换行\n换行xx'

          }
        ],
        headDataT: {
          a: [{key: 'name', title: 'name', fixed: 'left'},
            {key: 'role', title: 'role'}],
          b: [{
            key: 'date', title: 'date',
            fixed: 'left'
          },
            {
              key: 'address', title: 'address'
            }]
        },
        T: 'a'
      };
    },
    methods: {
      showTooltipMethod({type, column, row, items, _columnIndex}) {
        const {property} = column;
        // 重写默认的提示内容
        if (property === 'role' || property === 'date') {
          if (type === 'header') {
            return column.title ? '自定义标题提示内容：' + column.title : '';
          } else if (type === 'footer') {
            return items[_columnIndex] ? '自定义表尾提示内容，\n并且自定义换行：\n' + items[_columnIndex] : '';
          }
          return row[property] ? '自定义提示内容：' + row[property] : '';
        } else if (property === 'rate') {
          // 返回空字符串，控制单元格不显示提示内容
          return '';
        }
        // 其余的单元格使用默认行为
        return null;
      },
      footerMethod({columns}) {
        const footerData = [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '合计';
            }
            if (['date'].includes(column.property)) {
              return '2020-09-05';
            }
            if (['rate'].includes(column.property)) {
              return 999.8;
            }
            return null;
          })
        ];
        return footerData;
      },
      ADD() {
        this.T == 'a' ? this.T = 'b' : this.T = 'a';
      },
      ADD2() {
       /* this.$refs.table.updateStatus()
        this.$refs.table.refreshColumn()*/
        this.$refs.table.loadData(this.tableData)
        this.$refs.table.reloadData(this.tableData)

        this.$refs.table.recalculate(true)
        this.$refs.table.refreshColumn()
      }
    }
  };
</script>

<style scoped>
    .first-col {
        position: relative;
        height: 20px;
    }

    .first-col:before {
        content: "";
        position: absolute;
        left: -15px;
        top: 10px;
        width: 170px;
        height: 1px;
        transform: rotate(18deg);
        background-color: #e8eaec;
    }

    .first-col .first-col-top {
        position: absolute;
        right: 4px;
        top: -10px;
    }

    .first-col .first-col-bottom {
        position: absolute;
        left: 4px;
        bottom: -10px;
    }

    .my-filter {
        margin: 10px;
    }

    .page-left {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
    }
</style>
