## Scatter 散点图

:::tip
该组件基于终端的图形组件开发，推荐使用Chart图表组件替代该组件
:::

### 基础用法

:::demo

```html
<template>
  <gj-scatter :themeType="theme" :chartOptions="chartOptions"></gj-scatter>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: {
          yTitle: '指标单位',
          legend: {
            data: ['项目名称1', '项目名称2', '项目名称3'],
            bottom: 10,
            itemGap: 30
          },
          data: [
            {
              name: '项目名称1',
              type: 'scatter',
              data: [
                [20, 18],
                [21, 10],
                [13, 7],
                [9, 8],
                [36, 11],
                [14, 7],
                [33, 16],
                [28, 12],
                [24, 11]
              ]
            },
            {
              name: '项目名称2',
              type: 'scatter',
              data: [
                [5, 28],
                [12, 10],
                [31, 7],
                [19, 8],
                [16, 36],
                [18, 19],
                [29, 19],
                [18, 28],
                [22, 34]
              ]
            },
            {
              name: '项目名称3',
              type: 'scatter',
              data: [
                [28, 38],
                [11, 37],
                [31, 36],
                [8, 28],
                [11, 36],
                [12, 29],
                [19, 25],
                [16, 28],
                [19, 34]
              ]
            }
          ]
        }
      }
    },
    mounted() {
      // 监听主题的变化
      Bus.$on('changeTheme', val => {
       this.theme = val;
      })
    }
  }
</script>
```
:::

### Line Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| chartOptions | 图形配置的参数 | object | — | — |
| themeType | 主题（监听变化重新渲染） | string | White/Black | White |
| width   | 图形宽度（监听变化重新渲染）   | string    |  —  |  100%  |
| height  | 图形高度（监听变化重新渲染）    | string   | — | 360px   |
| data  | 图形数据（监听变化重新渲染）  | array | — | — |
| fontSize | 字体大小（监听变化重新渲染） | string / number  |   —     |  12  |

### chartOptions 参数说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| xTitle | x轴的标题 | string | — | — |
| yTitle | y轴的标题 | string | — | — |
| data | 数据源 | array | — | — |
| legend | legend配置项 | object |  —  | — |
| hideLegends | 是否隐藏legend | boolean  | true, false | — |
| sizeAttr | 是否设置散点图圆点的大小 | boolean  | true, false | — |
| tooltipName   | 是否设置tooltip的name | boolean  | true, false | — |
| splitLine   | 是否显示splitLine | boolean  | true, false | true |
| splitDot   | 是否设置tooltip的formatter | boolean  | true, false | false |

### Scatter Methods
| 方法名	 | 说明 | 参数 |
|---------- |-------- |---------- |
| resize  | 图形重新加载方法 |  —  |
