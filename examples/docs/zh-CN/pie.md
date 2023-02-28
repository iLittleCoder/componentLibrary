## Pie 饼图

:::tip
该组件基于终端的图形组件开发，推荐使用Chart图表组件替代该组件
:::

### 基础用法

:::demo

```html
<template>
  <jy-pie :themeType="theme" width="560px" :chartOptions="chartOptions"></jy-pie>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White'
      }
    },
    computed: {
      chartOptions() {
        return {
         legend: {
           data: ['项目名称1', '项目名称2','项目名称3','项目名称4','项目名称5'],
           orient: "vertical",
           right: 40,
           top: 85,
           show: true
         },
         title: "行业权重",
         series: [
           {
             avoidLabelOverlap: true,
             hoverAnimation: false,
             label: {
               minMargin: 5,
               lineHeight: 12,
               formatter: "{b}({d}%)",
               show: true,
               padding: [0, 0, 15, 0],
               rich: {
                 time: {
                   fontSize: 12,
                   color: this.theme === 'White' ? 'rgba(32, 32, 32, 0.65)' : 'rgba(230, 230, 230, 0.65)'
                 }
               }
             },
             labelLine: { length: 15, length2: 0, maxSurfaceAngle: 80 },
             radius: ["35%", "45%"],
             type: "pie",
             data: [
               { value: 800, name: '项目名称1' },
               { value: 735, name: '项目名称2' },
               { value: 580, name: '项目名称3' },
               { value: 484, name: '项目名称4' },
               { value: 300, name: '项目名称5' }
             ],
             center: ["40%", "50%"],
             itemStyle: {
               borderColor: '#fff',
               borderWidth: 1
             },
             labelLayout: true
           }
         ],
         graphic:  [
           {
            type: 'text',
            z: 100,
            left: 198,
            top: 145,
            style: {
            fill: this.theme === 'White' ? '#202020' : '#E6E6E6',
            width: 220,
            overflow: 'break',
            text: '人员构成',
            font: '400 12px'
            }
         }]
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
| width   | 图形宽度（监听变化重新渲染）   | string   |  —  |  100%  |
| height  | 图形高度（监听变化重新渲染）    | string | — | 300px  |
| fontSize | 字体大小（监听变化重新渲染） | string / number  |   —     |  12  |
| data  | 图形数据（监听变化重新渲染）  | array | — | — |
| isClickItem  | 是否添加点击事件  | boolean  | true, false | false |


### chartOptions 参数说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| series | series配置项 | array | — | — |
| colorList | 自定义颜色列表 | array | — | — |
| tooltip   | tooltip配置项 | object |  —  | — |
| title   | 标题 | string |  —  | — |
| legend   | legend配置项 | object |  —  | — |
| toolTitle   | tooltip的title | string |  —  | — |
| graphic   | graphic的配置 | object |  —  | — |

### Pie Methods
| 方法名	 | 说明 | 参数 |
|---------- |-------- |---------- |
| resize  | 图形重新加载方法 |  —  |
