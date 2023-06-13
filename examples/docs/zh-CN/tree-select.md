## TreeSelect 树选择器

基本简单用法

### 单选

:::demo 通过`filterable`设置是否可以过滤，通过设置 `size`设置尺寸大小。

```html
<div class="tree">
  <div class="tree-title">是否过滤：filterable</div>
  <gj-tree-select
    v-model="value0"
    placeholder="请选择"
    border
    :treeData="treeData"
  >
  </gj-tree-select>
  <gj-tree-select
    v-model="value1"
    placeholder="请选择"
    border
    :treeData="treeData"
    filterable
  >
  </gj-tree-select>

  <div class="tree-title">尺寸</div>

  <gj-tree-select
    v-model="value2"
    placeholder="请选择"
    border
    :treeData="treeData"
    size="large"
  >
  </gj-tree-select>
  <gj-tree-select
    v-model="value3"
    placeholder="请选择"
    border
    :treeData="treeData"
    size="medium"
  >
  </gj-tree-select>
  <gj-tree-select
    v-model="value4"
    placeholder="请选择"
    border
    :treeData="treeData"
  >
  </gj-tree-select>

  <gj-tree-select
    v-model="value5"
    placeholder="请选择"
    border
    :treeData="treeData"
    size="mini"
  >
  </gj-tree-select>
</div>
<script>
  export default {
    data() {
      return {
        value0: 2,
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',

        treeData: [
          {
            label: '一级 1',
            id: 1,
            children: [
              {
                label: '二级 1-1',
                id: 2,
                children: [
                  {
                    label: '三级 1-1-1',
                    disabled: true,
                    id: 3
                  }
                ]
              }
            ]
          },
          {
            label: '一级 2',
            id: 4,
            children: [
              {
                label: '二级 2-1',
                id: 5,
                children: [
                  {
                    label: '三级 2-1-1',
                    id: 6
                  }
                ]
              },
              {
                label: '二级 2-2',
                id: 7,
                children: [
                  {
                    label: '三级 2-2-1',
                    id: 8
                  }
                ]
              }
            ]
          },
          {
            label: '一级 3',
            id: 9,
            children: [
              {
                label: '二级 3-1',
                id: 10,
                children: [
                  {
                    label: '三级 3-1-1',
                    id: 11
                  }
                ]
              },
              {
                label: '二级 3-2',
                id: 12,
                children: [
                  {
                    label: '三级 3-2-1',
                    id: 13
                  }
                ]
              }
            ]
          },
          {
            label: '一级 4',
            id: 14
          }
        ]
      };
    },
    methods: {}
  };
</script>
```

:::

### 多选

:::demo 通过`checkStrictly`设置父子节点是否关联。

```html
<div class="tree-title">是否父子关联：checkStrictly</div>
<div class="tree">
  <gj-tree-select
    v-model="value0"
    placeholder="请选择"
    border
    multiple
    :treeData="treeData"
  >
  </gj-tree-select>
  <gj-tree-select
    v-model="value1"
    placeholder="请选择"
    border
    multiple
    :check-strictly="true"
    :treeData="treeData"
  >
  </gj-tree-select>
</div>
<script>
  export default {
    data() {
      return {
        size: 'small',
        value0: [4, 5, 6, 7, 8],
        value1: '',
        treeData: [
          {
            label: '一级 1',
            id: 1,
            children: [
              {
                label: '二级 1-1',
                id: 2,
                children: [
                  {
                    label: '三级 1-1-1',
                    disabled: true,
                    id: 3
                  }
                  // {
                  //   label: '三级 1-1-1',
                  //   id: '1-1-1'
                  // }
                ]
              }
            ]
          },
          {
            label: '一级 2',
            id: 4,
            children: [
              {
                label: '二级 2-1',
                id: 5,
                children: [
                  {
                    label: '三级 2-1-1',
                    id: 6
                  }
                ]
              },
              {
                label: '二级 2-2',
                id: 7,
                children: [
                  {
                    label: '三级 2-2-1',
                    id: 8
                  }
                ]
              }
            ]
          },
          {
            label: '一级 3',
            id: 9,
            children: [
              {
                label: '二级 3-1',
                id: 10,
                children: [
                  {
                    label: '三级 3-1-1',
                    id: 11
                  }
                ]
              },
              {
                label: '二级 3-2',
                id: 12,
                children: [
                  {
                    label: '三级 3-2-1',
                    id: 13
                  }
                ]
              }
            ]
          },
          {
            label: '一级 4',
            id: 14
          }
        ]
      };
    },
    methods: {}
  };
</script>
```

:::

### TreeSelect Attributes

| 参数                  | 说明                                                                           | 类型                      | 可选值            | 默认值                               |
| --------------------- | ------------------------------------------------------------------------------ | ------------------------- | ----------------- | ------------------------------------ |
| value / v-model       | 绑定值                                                                         | boolean / string / number | —                 | —                                    |
| multiple              | 是否多选                                                                       | boolean                   | —                 | false                                |
| disabled              | 是否禁用                                                                       | boolean                   | —                 | false                                |
| value-key             | 作为 value 唯一标识的键名，绑定值为对象类型时必填                              | string                    | —                 | value                                |
| size                  | 输入框尺寸                                                                     | string                    | medium/small/mini | —                                    |
| clearable             | 是否可以清空选项                                                               | boolean                   | —                 | false                                |
| placeholder           | 占位符                                                                         | string                    | —                 | 请选择                               |
| filterable            | 是否可搜索                                                                     | boolean                   | —                 | false                                |
| no-match-text         | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置                       | string                    | —                 | 无匹配数据                           |
| no-data-text          | 选项为空时显示的文字，也可以使用`slot="empty"`设置                             | string                    | —                 | 无数据                               |
| popper-class          | Select 下拉框的类名                                                            | string                    | —                 | —                                    |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean                   | -                 | true                                 |
| isSelfAdaption        | 选择器宽度是否自适应                                                           | boolean                   | -                 | false                                |
| checkStrictly         | 树结构在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false   | boolean                   | -                 | false                                |
| separator             | 选项分隔符(多选)                                                               | string                    | —                 | 斜杠' / '                            |
| treeData              | 树结构数据                                                                     | array                     | -                 | []                                   |
| nodeKey               | 此项必须设置（其值在整个树范围内唯一）                                         | string                    | -                 | id                                   |
| defaultProps          | 树结构自定义节点 label、children 的字段                                        | object                    | -                 | { label: label, children: children } |

### TreeSelect Events

| 事件名称 | 说明                                     | 回调参数       |
| -------- | ---------------------------------------- | -------------- |
| change   | 选中值发生变化时触发                     | 目前的选中值   |
| clear    | 可清空的单选模式下用户点击清空按钮时触发 | —              |
| blur     | 当 input 失去焦点时触发                  | (event: Event) |
| focus    | 当 input 获得焦点时触发                  | (event: Event) |

### TreeSelect Slots

|   name  | 说明           |
| ------- | -------------- |
| empty   | 无选项时的列表 |

### Methods

| 方法名 | 说明                            | 参数 |
| ------ | ------------------------------- | ---- |
| focus  | 使 input 获取焦点               | -    |
| blur   | 使 input 失去焦点，并隐藏下拉框 | -    |
