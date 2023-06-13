## Line 柱状图、折线图

:::tip
该组件基于终端的图形组件开发，推荐使用Chart图表组件替代该组件
注：使用Object.freeze()是为了优化渲染，正常使用时可忽略该方法
:::

### 基础用法

:::demo

```html
<template>
  <gj-line :themeType="theme" :chartOptions="chartOptions"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: {
          xAxisArray: ['30岁以下', '30～40岁', '40～50岁', '50～60岁', '60岁以上', '65岁以上', '70岁以上'],
          seriesData: [{
            type: 'bar',
            data: [14, 35, 25, 20, 40, 18, 29],
            name: '管理层年龄',
            itemStyle: {
              borderRadius: [2, 2, 0, 0]
            }
          }],
          yAxisaxisaxisLine: false,
          hideLegends: true,
          yAxisSetmin: 0, // y坐标轴刻度最小值
          leftTitle: '指标单位',
          pointerType: 'shadow',
          gridobj: {
            left: 32,
            right: 20,
            top: 50
          },
          yNameTextStyle: {
            padding: [0, 20, 0, 0],
            lineHeight: 30
          }
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

### 分组柱状图

:::demo 

```html
<template>
  <gj-line :themeType="theme" :chartOptions="chartOptions1"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions1: Object.freeze({
          xAxisArray: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年'],
          seriesData: [
            {
              type: 'bar',
              data: [180, 320, 280, 120, 400, 200, 320],
              name: '招标次数',
              itemStyle: {
                borderRadius: [2, 2, 0, 0]
              }
            },
            {
              type: 'bar',
              data: [140, 270, 250, 90, 230, 100, 190],
              name: '投标次数',
              itemStyle: {
                borderRadius: [2, 2, 0, 0]
              }
            }
          ],
          yAxisaxisaxisLine: false,
          yAxisSetmin: 0, // y坐标轴刻度最小值
          pointerType: 'shadow',
          leftTitle: '指标单位',
          legends: ['招标次数', '投标次数'],
          gridobj: {
            left: 25,
            right: 20,
            top: 50,
            bottom: 48
          },
          yNameTextStyle: {
            padding: [0, 20, 0, 0],
            lineHeight: 30
          },
          objlegend: {
            bottom: 10,
            itemGap: 24
          }
        })
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

### 正负柱状图

:::demo

```html
<template>
  <gj-line :themeType="theme" :chartOptions="chartOptions2"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions2: Object.freeze({
          xAxisArray: ['2018年', '2019年', '2020年', '2021年', '2022年'],
          seriesData: [
            {
              type: 'bar',
              data: [40, 25, 35, 20, 28],
              name: '项目名称1',
              itemStyle: {
                borderRadius: [2, 2, 0, 0]
              }
            },
            {
              type: 'bar',
              data: [9, 3, 15, 20, 7],
              name: '项目名称2',
              itemStyle: {
                borderRadius: [2, 2, 0, 0]
              }
            },
            {
              type: 'bar',
              data: [-15, -20, -10, -8, -6],
              name: '项目名称3',
              itemStyle: {
                borderRadius: [0, 0, 2, 2]
              }
            }
          ],
          pointerType: 'shadow',
          yAxisaxisaxisLine: false,
          yAxisSetmin: 0, // y坐标轴刻度最小值
          leftTitle: '指标单位',
          legends: ['项目名称1', '项目名称2', '项目名称3'],
          gridobj: {
            left: 20,
            right: 20,
            top: 50,
            bottom: 48
          },
          yNameTextStyle: {
            padding: [0, 10, 0, 0],
            lineHeight: 30
          },
          objlegend: {
            itemGap: 24,
            bottom: 10
          }
        })
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

### 堆叠柱状图

:::demo

```html
<template>
  <gj-line :themeType="theme" :chartOptions="chartOptions3"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions3: Object.freeze({
          xAxisArray: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年'],
          seriesData: [
            {
              type: 'bar',
              data: [220, 500, 400, 550, 480, 200, 320],
              name: '项目名称1',
              stack: 'one',
              itemStyle: {
                borderRadius: [2, 2, 0, 0],
                borderColor: '#fff',
                borderWidth: 0.5
              }
            },
            {
              type: 'bar',
              data: [100, 270, 250, 380, 230, 100, 190],
              name: '项目名称2',
              stack: 'one',
              itemStyle: {
                borderRadius: [2, 2, 0, 0],
                borderColor: '#fff',
                borderWidth: 0.5
              }
            }
          ],
          yAxisaxisaxisLine: false,
          yAxisSetmin: 0, // y坐标轴刻度最小值
          leftTitle: '指标单位',
          legends: ['项目名称1', '项目名称2'],
          pointerType: 'shadow',
          gridobj: {
            left: 25,
            right: 20,
            top: 50,
            bottom: 48
          },
          objlegend: {
            bottom: 10,
            itemGap: 24
          },
          yNameTextStyle: {
            padding: [0, 25, 0, 0],
            lineHeight: 30
          }
        })
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

### 基础条形图

:::demo

```html
<template>
  <gj-line :themeType="theme" :data="chartOptions4.data" :chartOptions="chartOptions4"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions4: Object.freeze({
          data: [
            {name: '投资范围'},
            {name: '违规处罚'},
            {name: '公司财务'},
            {name: '市值行情'},
            {name: '审计意见'},
            {name: '特别处理'}
          ],
          yAxisData: 'name',
          xAxisShow: true,
          seriesData: [
            {
              type: 'bar',
              data: [10, 20, 40, 60, 80, 100],
              itemStyle: {
                borderRadius: [0, 2, 2, 0]
              },
              label: {
                show: true,
                position: 'right'
              }
            }
          ],
          leftTitle: '指标单位',
          hideLegends: true,
          pointerType: 'shadow',
          hideYaxisLine: true,
          gridobj: {
            left: 20,
            right: 40,
            bottom: 1
          },
          yNameTextStyle: {
            padding: [0, 63, 0, 0]
          },
          groupbar: true
        })
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

### 堆叠条形图

:::demo

```html
<template>
  <gj-line :themeType="theme" :data="chartOptions5.data" :chartOptions="chartOptions5"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions5: Object.freeze({
          data: [
            {name: 2018},
            {name: 2019},
            {name: 2020},
            {name: 2021},
            {name: 2022}
          ],
          yAxisData: 'name',
          seriesData: [
            {
              name: '项目名称1',
              type: 'bar',
              data: [10200, 10800, 11600, 12500, 13100],
              itemStyle: {
                borderRadius: [0, 2, 2, 0],
                borderColor: '#fff',
                borderWidth: 0.5
              },
            stack: 'one',
            label: {
              show: true,
              position: 'insideLeft',
              color: '#ffffff'
            }
          },
          {
            name: '项目名称2',
            type: 'bar',
            data: [9800, 12800, 12900, 13900, 14900],
            itemStyle: {
              borderRadius: [0, 2, 2, 0],
              borderColor: '#fff',
              borderWidth: 0.5
            },
            stack: 'one',
            label: {
              show: true,
              position: 'insideLeft',
              color: '#ffffff'
            }
          }
        ],
        legends: ['项目名称1', '项目名称2'],
        leftTitle: '指标单位',
        pointerType: 'shadow',
        gridobj: {
          left: 20,
          right: 40,
          bottom: 48
        },
        yNameTextStyle: {
          padding: [0, 25, 0, 0]
        },
        objlegend: {
            bottom: 10,
            itemGap: 24
          }
        })
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

### 基础折线图

:::demo

```html
<template>
  <gj-line :themeType="theme" :chartOptions="chartOptions6"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions6: Object.freeze({
          xAxisArray: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年'],
          seriesData: [{
            type: 'line',
            data: [14, 35, 25, 20, 40, 18, 29],
            name: '项目名称'
          }],
          yAxisaxisaxisLine: false,
          hideLegends: true,
          yAxisSetmin: 0, // y坐标轴刻度最小值
          leftTitle: '指标单位',
          gridobj: {
            left: 32,
            right: 20,
            top: 50
          },
          yNameTextStyle: {
            padding: [0, 20, 0, 0],
            lineHeight: 30
          }
        })
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

### 多条折线图

:::demo

```html
<template>
  <gj-line :themeType="theme" width="800" :chartOptions="chartOptions7"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions7: Object.freeze({
          xAxisArray: ['2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年'],
          seriesData: [
            {
              type: 'line',
              data: [90000, 100000, 80000, 60000, 50000, 60000, 70000, 65000, 80000, 60000, 51000, 90000],
              name: '项目名称1'
            },
            {
              type: 'line',
              data: [40000, 80000, 70000, 100000, 90000, 80000, 60000, 70000, 50000, 60000, 70000, 80000],
              name: '项目名称2'
            },
            {
              type: 'line',
              data: [30000, 21000, 30000, 40000, 32000, 50000, 40000, 40000, 30000, 31000, 32000, 35000],
              name: '项目名称3'
            },
            {
              type: 'line',
              data: [20000, 21000, 23000, 25000, 30000, 29000, 28000, 30000, 31000, 28000, 29000, 30000],
              name: '项目名称4'
            },
            {
              type: 'line',
              data: [10000, 11000, 12000, 12000, 15000, 16000, 17000, 20000, 21000, 25000, 27000, 28000],
              name: '项目名称5'
            }
          ],
          yAxisaxisaxisLine: false,
          yAxisSetmin: 0, // y坐标轴刻度最小值
          leftTitle: '指标单位',
          legends: ['项目名称1', '项目名称2','项目名称3','项目名称4','项目名称5'],
          gridobj: {
            left: 25,
            right: 20,
            top: 50,
            bottom: 48
          },
          yNameTextStyle: {
            padding: [0, 60, 0, 0],
            lineHeight: 30
          },
          objlegend: {
            bottom: 10,
            itemGap: 24
          }
        })
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

### 基础面积图

:::demo

```html
<template>
  <gj-line :themeType="theme" :chartOptions="chartOptions8"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions8: Object.freeze({
        xAxisArray: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年'],
        seriesData: [{
          type: 'line',
          data: [14, 35, 25, 20, 40, 18, 29],
          name: '项目名称',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#81ADFF' // 0% 处的颜色
              }, {
                offset: 1, color: '#FFFFFF' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }],
        yAxisaxisaxisLine: false,
        hideLegends: true,
        yAxisSetmin: 0, // y坐标轴刻度最小值
        leftTitle: '指标单位',
        gridobj: {
          left: 32,
          right: 20,
          top: 50
        },
        yNameTextStyle: {
          padding: [0, 20, 0, 0],
          lineHeight: 30
        }
        }) 
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

### 百分比面积图

:::demo

```html
<template>
  <gj-line :themeType="theme" width="800" :chartOptions="chartOptions9"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions9: Object.freeze({
        xAxisSet: {
          type: 'category',
          boundaryGap: false,
          data: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        seriesData: [
          {
            type: 'line',
            data: [5, 5.6, 5.7, 5.8, 6.0, 6.6, 7],
            name: '项目名称1',
            stack: 'one',
            smooth: true,
            showSymbol: false,
            areaStyle: {
              color: 'rgba(255, 185, 128, 0.25)'
            },
            lineStyle: {
              normal: {
                width: 1,
                color: '#FFB980'
              }
            }
          },
          {
            type: 'line',
            data: [4, 5, 6, 7, 7, 7, 7],
            name: '项目名称2',
            stack: 'one',
            smooth: true,
            showSymbol: false,
            areaStyle: {
              color: 'rgba(120, 203, 239, 0.25)'
            },
            lineStyle: {
              normal: {
                width: 1,
                color: '#78CBEF'
              }
            }
          },
          {
            type: 'line',
            data: [4, 5, 6, 7, 8, 9, 10],
            name: '项目名称3',
            stack: 'one',
            smooth: true,
            showSymbol: false,
            areaStyle: {
              color: 'rgba(255, 158, 158, 0.5)'
            },
            lineStyle: {
              normal: {
                width: 1,
                color: '#FF9E9E'
              }
            }
          },
          {
            type: 'line',
            data: [11, 10, 9.5, 8, 7, 6, 5],
            name: '项目名称4',
            stack: 'one',
            smooth: true,
            showSymbol: false,
            areaStyle: {
              color: 'rgba(242, 168, 189, 0.25)'
            },
            lineStyle: {
              normal: {
                width: 1,
                color: '#FCCA6A'
              }
            }
          },
          {
            type: 'line',
            data: [18, 16, 15, 14, 14, 14, 14],
            name: '项目名称5',
            stack: 'one',
            smooth: true,
            showSymbol: false,
            areaStyle: {
              color: 'rgba(129, 173, 255, 0.25)'
            },
            lineStyle: {
              normal: {
                width: 1,
                color: '#81ADFF'
              }
            }
          }
        ],
        yAxisaxisaxisLine: false,
        yAxisSetmin: 0, // y坐标轴刻度最小值
        leftTitle: '指标单位',
        gridobj: {
          left: 32,
          right: 20,
          top: 50,
          bottom: 48
        },
        objlegend: {
          bottom: 10,
          itemGap: 24
        },
        legends: ['项目名称1', '项目名称2','项目名称3','项目名称4','项目名称5'],
        yNameTextStyle: {
          padding: [0, 20, 0, 0],
          lineHeight: 30
          }
        }) 
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

### 堆叠面积图

:::demo

```html
<template>
  <gj-line :themeType="theme" width="800" :chartOptions="chartOptions10"></gj-line>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions10: Object.freeze({
          xAxisSet: {
            type: 'category',
            boundaryGap: false,
            data: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          seriesData: [
            {
              type: 'line',
              data: [5, 5.6, 5.7, 5.8, 6.0, 6.6, 7],
              name: '项目名称1',
              stack: 'one',
              showSymbol: false,
              areaStyle: {
                color: 'rgba(255, 185, 128, 0.25)'
              },
              lineStyle: {
                normal: {
                  width: 1,
                  color: '#FFB980'
                }
              }
            },
            {
              type: 'line',
              data: [1, 2, 3, 4, 7, 9, 10],
              name: '项目名称2',
              stack: 'one',
              showSymbol: false,
              areaStyle: {
                color: 'rgba(120, 203, 239, 0.25)'
              },
              lineStyle: {
                normal: {
                  width: 1,
                  color: '#78CBEF'
                }
              }
            },
            {
              type: 'line',
              data: [4, 5, 6, 6, 6, 6, 6],
              name: '项目名称3',
              stack: 'one',
              showSymbol: false,
              areaStyle: {
                color: 'rgba(255, 158, 158, 0.5)'
              },
              lineStyle: {
                normal: {
                  width: 1,
                  color: '#FF9E9E'
                }
              }
            },
            {
              type: 'line',
              data: [20, 20, 20, 20, 18, 15, 20],
              name: '项目名称4',
              stack: 'one',
              showSymbol: false,
              areaStyle: {
                color: 'rgba(242, 168, 189, 0.25)'
              },
              lineStyle: {
                normal: {
                  width: 1,
                  color: '#FCCA6A'
                }
              }
            },
            {
              type: 'line',
              data: [5, 10, 10, 20, 20, 20, 30],
              name: '项目名称5',
              stack: 'one',
              showSymbol: false,
              areaStyle: {
                color: 'rgba(129, 173, 255, 0.25)'
              },
              lineStyle: {
                normal: {
                  width: 1,
                  color: '#81ADFF'
                }
              }
            }
          ],
          yAxisaxisaxisLine: false,
          yAxisSetmin: 0, // y坐标轴刻度最小值
          leftTitle: '指标单位',
          gridobj: {
            left: 32,
            right: 20,
            top: 50,
            bottom: 48
          },
          legends: ['项目名称1', '项目名称2','项目名称3','项目名称4','项目名称5'],
          objlegend: {
            bottom: 10,
            itemGap: 24
          },
          yNameTextStyle: {
            padding: [0, 20, 0, 0],
            lineHeight: 30
          }
        })
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
| height  | 图形高度（监听变化重新渲染）    | string   | — | 250px   |
| fontSize | 字体大小（监听变化重新渲染） | string / number  |   —     |  12  |
| data  | 图形数据（监听变化重新渲染）  | array | — | — |
| isClickItem  | 是否添加点击事件  | boolean  | true, false | false |
| pop | 默认使用svg渲染 | boolean  |   true, false   |  false  |

### chartOptions 参数说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| xAxisSet | 自定义X轴设置 | object | — | — |
| xAxisData | x轴线数据源 | array | — | — |
| keys   | 数据对应的key值 | array |  —  | — |
| legends  | 设置legend  | array   | — | —  |
| rightAxis  | 右轴keys | array | — | — |
| DataType  |  类型keys  | array | — | — |
| title | 标题组件，包含主标题和副标题 | string |   — |   — |
| titleTop | title距离顶部高度 | string / number  |   — |   — |
| leftTitle | 左标题 | string  |   — |   — |
| rightTitle | 右标题 | string  |   — |   — |
| subleftTitle | 左副标题 | string |  — |   — |
| backgroundColor | 图形背景颜色 | string  |   — |   — |
| hideXaxisLine | 是否隐藏x轴线 | boolean  | true, false | true |
| hideYaxisLine | 是否隐藏y轴线 | boolean  | true, false | false |
| hideRightYaxisLine | 是否隐藏y轴splitLine分割线 | boolean  | true, false | true |
| hideRightYaxisAxis | 是否隐藏y轴axisLine分割线 | boolean  | true, false | false |
| dataRange | 显示区间 | object  | — |   — |
| colorList | 自定义色值 | array  | — |   — |
| dataset | 数据集 | object  | — |   — |
| groupbar | 是否自定义tooltip提示框组件 |  boolean  | true, false | - |
| objlegend | legend配置 | object  | — |  — |
| multBar | 堆叠柱状图keys |  array  | — |  — |
| showmultBarLabel |  是否是百分比柱状图 | boolean  | true, false | - |
| showmultBarLabels |  堆叠柱状图是否显示柱状图文字 | boolean  | true, false | - |
| keyspercent |  堆叠柱状图 需要参加百分比计算的字段名 | array  | — |   — |
| markPoint |  点标记 | array  | — |   — |
| areaStyle |  面积图keys | array  | — |   — |
| seriesData |  数据源 | array  | — |   — |
| xAxisArray |  x轴线数据 | array  | — |   — |
| tooltipObj |  提示框配置 | object  | — |   — |
| labelRotate |  是否旋转x轴字体 | boolean  | true, false | - |
| decidigList |  需要保留小数位 例如：{ a0: 2, a1: 3 } a0保留两位小数，a1保留3位小数 | object  | — |   — |
| showZero |  显示0线 | object  | — |   — |
| hideLegends |  是否隐藏图例（如果没有legends 这里为falese） | boolean  | true, false | - |
| hideLine |  是否隐藏辅助线  | true, false | - |
| gridobj |  自定义grid间距 | object  | — |   — |
| symbolShow |  隐藏折线 默认隐藏 | boolean  | true, false | true |
| symbol |  设置标记的图形 如circle | string  |   — |   — |
| xAxisextend |  x轴扩展属性 | object  |   — |   — |
| yAxisData |  y轴数据的key | string  |   — |   — |
| yAxisIndex |  手动设置y轴索引 | array  |   — |   — |
| yAxisSet |  自定义y轴设置 | array  |   — |   — |
| yAxisextend | y轴扩展属性 | object |   — |   — |
| xAxisShow |  是否显示x轴 | boolean  | true, false | — |
| yAxisShow |  是否显示y轴 | boolean  | true, false | — |
| yAxisaxisaxisLine |  是否显示y轴刻度 | boolean  | true, false | true |
| xAxisShowSub |  是否显示x轴附属轴（双轴的情况） | boolean  | true, false  | — |
| doublexAxischart | 是否两个X轴xAxisIndex，并且有rightAxis(双图) | boolean  | true, false  | — |
| axisLabelformatter |  X轴是否overflow | boolean  | true, false  | — |
| axisProvideNumber |  x轴每行显示的个数 | number  |   — |   — |
| axisPointerColor |  Y轴坐标轴指示器color | number  |   — |   — |
| barMaxW | 柱状图默认宽度 | number  |   — |   16 |
| bRadius | 边框的圆角 | number  |   — |   2 |
| lineStyleWidth | 折线图 线的宽度 | number  |   — |   2 |
| xAxisLabelShow | 是否显示X轴文本 | boolean  | true, false  | — |
| yAxisLabelShow | 是否显示y轴文本 | boolean  | true, false  | — |
| inverseyAxis | 是否翻转Y轴 | boolean  | true, false  | — |
| inversexAxis | 是否翻转x轴 | boolean  | true, false  | — |
| xAxisIndex | 两个X轴配置项 | array  | —  | — |
| xAxisIndexType | 两个X轴配置项(类型) | string  | —  | — |
| formatterFlag | 是否自定义tooltip的formatter | boolean  | true, false  | — |
| yAxisSetmin | Y轴是否需要动态取最小值作为开始坐标 | boolean  | true, false  | true |
| yAxisSetminRight | Y轴右轴是否需要动态取最小值作为开始坐标 | boolean  | true, false  | true |
| yAxisMinInterval | y轴最小间隔大小 | string  | —  | — |
| yAxisCustomMax | y轴最大值增量 | number  | —  | — |
| reversXAxis | 反转 x和y的数据,条行图 | boolean  | true, false  | — |
| cancalStack | 取消面积图和折线图堆叠 | boolean  | true, false  | true |
| animation | 动画 | boolean  | true, false  | true |
| YsplitLineColor | 自定义Y轴axisLine颜色 | string  | —  | — |
| pointerType | 光标指示器类型| string  | —  | line |
| smooth | 折线图是否丝滑 | boolean  | true, false  | false |
| nullToZero | 是否把null转为0 | true, false  | false |
| yNameLocation |  Y坐标轴名称显示位置 | string  | —  | end |
| yNameTextStyle |  Y坐标轴名称的文字样式 | object  | — |   — |
| yAxisLabelformatter |  自定义Y轴axisLabel的formatter | object  | — |   — |
| visualMap |  visualMap配置 | object  | — |   — |
| axisLabelInterval | 配置X坐标轴刻度标签的显示间隔，自定义x坐标的刻度index | string  | — |   — |
| needtoolbox | 是否需要缩放工具 | true, false  |  — |  — |
| customColor | 自定义每个柱状图的背景颜色，需要和data取 keys显示的数据字段名称保持一致 | array  |  — |  — |
| showtimeline | 是否显示timeline | boolean  | — |  — |
| timelinedata | timeline对应的data | array  | — |  — |
| timelineoptions | 用于 timeline 的 option 数组 | array  | — |  — |
| showLabelObj | label 设置 | object  | — |  — |
| tooltipShow | 是否展示tooltip | boolean  | true, false  | true |
| selected | 图例选中配置 | object  | — |  — |
| singleShowSymbol | 折线图单个点显示symbol | boolean  | true, false  | false |
| legendpadding | 设置legend的内边距 | number  | —  | — |
| noFixed | 不要处理保留2位小数 | boolean  | true, false  | false |


### Line Methods
| 方法名	 | 说明 | 参数 |
|---------- |-------- |---------- |
| getChartUrl  | 获取图形对应的base64，复制或下载时使用 |  widthParam, heightParam, isclear  |
| resize  | 图形重新加载方法 |  —  |
