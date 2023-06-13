## Scrollbar 滚动条

### 基础用法

:::demo 可以添加wrap-class属性, 设置overflow-x: hidden 实现隐藏原生的横向滚动条：

```html

<div class="demo-scroll-bar">
    <gj-scrollbar class="scroll-bar" wrap-class="self-wrap">
        <gj-card>
            <div slot="header" class="card-title">
                <gj-icon name="Gildata-color-title"></gj-icon>
                <span class="text">标题名称</span>
            </div>
            
            <div v-for="item in 100">{{item}}</div>
        </gj-card>
    </gj-scrollbar>
</div>


```

:::

### noresize 优化性能

:::demo 如果container尺寸不会发生变化，noresize设为true 组件内部就不再监听容器的尺寸变化, 可以优化性能

```html

<template>
    <div class="demo-scroll-table">
        <gj-scrollbar noresize class="table-scrollbar" wrap-class="self-wrap">
            <gj-table
                    :align="allAlign"
                    :data="tableData"
                    :resizable="false"
                    border="none"
            >
                <gj-column type="seq" width="60"></gj-column>
                <gj-column field="name" width="100" title="Name"></gj-column>
                <gj-column field="sex" width="100" title="Sex"></gj-column>
                <gj-column field="age" width="100" title="Age"></gj-column>
                <gj-column field="phone" width="120" title="Phone"></gj-column>
                <gj-column field="role" width="100" title="Role"></gj-column>
                <gj-column field="address" width="130" title="Address"></gj-column>
            </gj-table>
        </gj-scrollbar>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                allAlign: null,
                tableData: [
                    {
                        id: 10001,
                        name: 'Test1',
                        role: 'Develop',
                        sex: 'Man',
                        age: 28,
                        address: 'test abc',
                        phone: '12345678910'
                    },
                    {
                        id: 10002,
                        name: 'Test2',
                        role: 'Test',
                        sex: 'Women',
                        age: 22,
                        address: 'Guangzhou',
                        phone: '12345678910'
                    },
                    {
                        id: 10003,
                        name: 'Test3',
                        role: 'PM',
                        sex: 'Man',
                        age: 32,
                        address: 'Shanghai',
                        phone: '12345678910'
                    },
                    {
                        id: 10004,
                        name: 'Test4',
                        role: 'Designer',
                        sex: 'Women',
                        age: 24,
                        address: 'Shanghai',
                        phone: '12345678910'
                    },
                    {
                        id: 10005,
                        name: 'Test5',
                        role: 'Designer1',
                        sex: 'Women',
                        age: 25,
                        address: 'Shanghai',
                        phone: '12345678910'
                    },
                    {
                        id: 10006,
                        name: 'Test6',
                        role: 'Designer2',
                        sex: 'Women',
                        age: 25,
                        address: 'Shanghai',
                        phone: '12345678910'
                    },
                    {
                        id: 10007,
                        name: 'Test7',
                        role: 'Designer3',
                        sex: 'Women',
                        age: 26,
                        address: 'Shanghai',
                        phone: '12345678910'
                    },
                    {
                        id: 10008,
                        name: 'Test8',
                        role: 'Designer4',
                        sex: 'Women',
                        age: 27,
                        address: 'Shanghai',
                        phone: '12345678910'
                    }
                ]
            }
        }
    }
</script>
```

:::

### Scrollbar Attributes

| 参数            | 说明                                 | 类型                      | 可选值                | 默认值 |
| --------------- | ------------------------------------ | ------------------------- | --------------------- | ------ |
| native          | 是否使用原生滚动条，即不附加自定义滚动条     | boolean |                  —                     | —      |
| wrapStyle       | wrap的内联样式,支持数组和字符串两种格式, 如[{"background": "red"}, {"color": "red"}] 转化为 {background: "red", color: "red"}     | array / string          | —                     | —      |
| wrapClass        | wrap的自定义类名                    | string                   | —                     | —  |
| viewClass        | view的自定义类名                    | string                   | —                     | —  |
| viewStyle        | view的自定义内联样式                 | object                    | —                   | —    |
| noresize         | 如果 container 尺寸不会发生变化，最好设置它可以优化性能    | boolean    | —                | —      |
| tag             | 组件最外层的包裹标签，默认为 div         | string                     | —                | div      |

