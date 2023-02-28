## Chart 图表组件

:::tip
该组件定义了一套图表的标准样式，具体的参数配置和事件方法和 echarts 官网一致，"echarts"版本为"5.0.2"

注：示例中使用 Object.freeze()仅是为了优化渲染，正常使用时可忽略该方法
:::

### 基础柱状图

:::demo type 设 bar，直接通过$refs.chart.jyChart获取对应echarts Instance，并绑定click和finished事件；通过$refs.chart.options 获取图形的配置信息

```html
<template>
  <jy-chart :theme="theme" ref="chart" type="bar" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: {
          legend: {
            show: false
          },
          xAxis: {
            data: ['30岁以下', '30～40岁', '40～50岁', '50～60岁', '60岁以上', '65岁以上', '70岁以上']
          },
          yAxis: {
            name: '指标单位'
          },
          series: [
            {
              name: '管理层年龄',
              data: [14, 35, 25, 20, 40, 18, 29]
            }
          ]
        }
      };
    },
    mounted() {
      // 监听主题的变化
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
      // 添加点击事件
      this.$refs.chart.jyChart.on('click', () => {
        console.log('点击');
      });
      // 添加finished事件
      this.$refs.chart.jyChart.on('finished', () => {
        console.log('渲染完成');
      });
    }
  };
</script>
```

:::

### 正负柱状图

:::demo 直接通过\$refs.chart.jyChart 获取对应 echartsInstance，并绑定 legendselectchanged 事件

```html
<template>
  <jy-chart :theme="theme" ref="chart" type="bar" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: Object.freeze({
          xAxis: {
            data: ['2018年', '2019年', '2020年', '2021年', '2022年']
          },
          yAxis: {
            name: '指标单位'
          },
          grid: { bottom: 30 },
          series: [
            {
              name: '项目名称1',
              data: [40, 25, 35, 20, 28],
              barGap: 0
            },
            {
              name: '项目名称2',
              data: [9, 3, 15, 20, 7]
            },
            {
              name: '项目名称3',
              data: [-15, -20, -10, -8, -6],
              itemStyle: {
                borderRadius: [0, 0, 2, 2] // 单独设置圆角，默认圆角为[2, 2, 0, 0]
              }
            }
          ]
        })
      };
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
      // 添加legendselectchanged事件
      this.$refs.chart.jyChart.on('legendselectchanged', (selected) => {
        console.log(selected, 'legend change');
      });
    }
  };
</script>
```

:::

### 堆叠条形图

:::demo

```html
<template>
  <jy-chart :theme="theme" type="bar" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White'
      };
    },
    computed: {
      chartOptions() {
        let itemBar = {
          stack: 'one',
          itemStyle: {
            borderRadius: [0, 2, 2, 0],
            borderColor: this.theme === 'White' ? '#fff' : '#15181a',
            borderWidth: 0.5
          },
          label: {
            show: true,
            position: 'insideLeft',
            color: '#ffffff'
          }
        };
        return Object.freeze({
          legend: {
            legends: ['项目名称1', '项目名称2']
          },
          xAxis: {
            splitLine: { show: true }
          },
          grid: { bottom: 30, right: 20 },
          yAxis: {
            name: '指标单位',
            data: [2018, 2019, 2020, 2021, 2022]
          },
          series: [
            {
              name: '项目名称1',
              data: [10200, 10800, 11600, 12500, 13100],
              ...itemBar
            },
            {
              name: '项目名称2',
              data: [9800, 12800, 12900, 13900, 14900],
              ...itemBar
            }
          ]
        });
      }
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

### 多条折线图

:::demo

```html
<template>
  <jy-chart :theme="theme" type="line" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: Object.freeze({
          legend: {
            show: false
          },
          dataZoom: [
            {
              type: 'slider',
              start: 30,
              end: 80,
              bottom: 0,
              right: 10
            }
          ],
          xAxis: {
            data: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年']
          },
          yAxis: {
            name: '指标单位'
          },
          grid: { bottom: 30 },
          series: [
            {
              data: [70000, 80000, 75000, 60000, 50000, 60000, 70000, 65000, 80000, 60000, 51000, 90000],
              name: '项目名称1'
            },
            {
              data: [40000, 50000, 70000, 80000, 75000, 70000, 60000, 70000, 50000, 60000, 70000, 80000],
              name: '项目名称2'
            },
            {
              data: [30000, 21000, 30000, 40000, 32000, 50000, 40000, 40000, 30000, 31000, 32000, 35000],
              name: '项目名称3'
            },
            {
              data: [20000, 32000, 23000, 25000, 30000, 29000, 28000, 30000, 31000, 28000, 29000, 30000],
              name: '项目名称4'
            },
            {
              data: [10000, 11000, 12000, 12000, 15000, 16000, 17000, 20000, 21000, 25000, 27000, 28000],
              name: '项目名称5'
            }
          ]
        })
      };
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

### 基础面积图

:::demo

```html
<template>
  <jy-chart :theme="theme" type="line" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White'
      };
    },
    computed: {
      chartOptions() {
        return Object.freeze({
          legend: { show: false },
          xAxis: {
            data: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年']
          },
          yAxis: {
            name: '指标单位'
          },
          series: [
            {
              data: [14, 35, 25, 20, 40, 18, 29],
              name: '项目名称',
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    // { offset: 0, color: '#81ADFF' },
                    { offset: 0, color: 'rgba(129,173,255, 0.25)' },
                    {
                      offset: 1,
                      color: this.theme === 'White' ? 'rgba(129,173,255,0)' : '#15181a'
                    }
                  ]
                }
              }
            }
          ]
        });
      }
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

### 堆叠面积图

:::demo 注：面积图一定要设置 areaStyle 属性

```html
<template>
  <jy-chart :theme="theme" type="line" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      let list = [[10, 5, 6, 6, 7, 8, 9], [5, 3, 4, 4, 7, 9, 10], [4, 5, 6, 6, 6, 6, 6], [8, 5, 6, 5, 4, 6, 7]].map((item, key) => {
        return {
          data: item,
          name: `项目名称${key + 1}`,
          stack: 'one',
          areaStyle: {} // 面积图一定要设置areaStyle属性
        };
      });
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: Object.freeze({
          legend: {
            legends: ['项目名称1', '项目名称2', '项目名称3', '项目名称4', '项目名称5']
          },
          xAxis: {
            boundaryGap: false,
            data: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年']
          },
          yAxis: {
            name: '指标单位'
          },
          grid: { bottom: 40, right: 20 },
          series: list
        })
      };
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

### 环形饼图

:::demo

```html
<template>
  <jy-chart :theme="theme" width="760px" type="pie" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White'
      };
    },
    computed: {
      chartOptions() {
        return {
          legend: {
            data: ['项目名称1', '项目名称2', '项目名称3', '项目名称4', '项目名称5'],
            orient: 'vertical',
            right: 40,
            top: 90,
            itemGap: 12 // 图例每项之间的间隔
          },
          series: [
            {
              data: [{ value: 800, name: '项目名称1' }, { value: 735, name: '项目名称2' }, { value: 580, name: '项目名称3' }, { value: 484, name: '项目名称4' }, { value: 300, name: '项目名称5' }]
            }
          ],
          // 人员构成
          title: {
            text: '人员构成',
            left: 'center',
            top: 'center',
            textStyle: {
              color: this.theme === 'White' ? '#202020' : '#E6E6E6'
            }
          }
          // graphic: [
          //   {
          //     type: 'text',
          //     z: 100,
          //     left: 355,
          //     top: 145,
          //     style: {
          //       fill: this.theme === 'White' ? '#202020' : '#E6E6E6',
          //       width: 220,
          //       overflow: 'break',
          //       text: '人员构成',
          //       font: '400 12px'
          //     }
          //   }
          // ]
        };
      }
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

### 基础散点图

:::demo

```html
<template>
  <jy-chart :theme="theme" type="scatter" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: Object.freeze({
          legend: {
            data: ['项目名称1', '项目名称2', '项目名称3']
          },
          yAxis: {
            name: '指标单位'
          },
          grid: { bottom: 30, right: 10 },
          series: [
            {
              name: '项目名称1',
              type: 'scatter',
              data: [[20, 18], [21, 10], [13, 7], [9, 8], [36, 11], [14, 7], [33, 16], [28, 12], [24, 11]]
            },
            {
              name: '项目名称2',
              type: 'scatter',
              data: [[5, 28], [12, 10], [31, 7], [19, 8], [16, 36], [18, 19], [29, 19], [18, 28], [22, 34]]
            },
            {
              name: '项目名称3',
              type: 'scatter',
              data: [[28, 38], [11, 37], [31, 36], [8, 28], [11, 36], [12, 29], [19, 25], [16, 28], [19, 34]]
            }
          ]
        })
      };
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

### 基础气泡图

气泡图作为一种特殊的散点图样式，type 为"bubble"，配置项和 scatter 气泡图完全一致

:::demo

```html
<template>
  <jy-chart :theme="theme" type="bubble" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White'
      };
    },
    computed: {
      chartOptions() {
        return {
          yAxis: {
            name: '指标单位'
          },
          grid: { bottom: 30, right: 10 },
          series: [
            {
              name: '项目名称1',
              symbolSize: (value) => Math.round(value[2]), // 设置圆圈的大小
              label: {
                // 文本标签
                show: true,
                position: 'inside',
                color: this.theme === 'White' ? '#202020' : '#E6E6E6',
                fontSize: 12
              },
              data: [[39, 47, 72], [44, 45, 32], [11, 32, 32], [47, 11, 52], [6, 23, 79], [15, 36, 70], [6, 9, 43], [36, 19, 60], [48, 46, 28], [54, 29, 49]]
            },
            {
              name: '项目名称2',
              symbolSize: (value) => Math.round(value[2]),
              data: [[50, 23, 10], [7, 52, 6], [21, 55, 17], [11, 15, 31], [21, 30, 10], [30, 52, 23], [27, 40, 30], [53, 50, 28], [33, 10, 6], [23, 45, 28]]
            },
            {
              name: '项目名称3',
              symbolSize: (value) => Math.round(value[2]),
              data: [[8, 41, 27], [42, 37, 21], [30, 6, 10], [33, 44, 29], [47, 23, 15], [26, 27, 33], [30, 36, 7], [32, 39, 6], [45, 37, 27], [14, 39, 31]]
            }
          ]
        };
      }
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

### 基础仪表盘

:::demo

```html
<template>
  <jy-chart :theme="theme" type="gauge" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: Object.freeze({
          series: [
            {
              startAngle: 180, // 起始角度
              endAngle: 0, // 结束角度
              splitNumber: 1, // 分割段数
              axisLine: {
                lineStyle: {
                  color: [[1, '#F0F5FF']] // 仪表盘轴线的颜色
                }
              },
              pointer: {
                // 是否显示指针
                show: false
              },
              anchor: {
                // 是否显示表盘中指针的固定点
                show: false
              },
              axisLabel: {
                // 刻度标签
                distance: -20,
                padding: [0, 10, 0, -10], // 通过padding可设置0和100%的位置
                // 通过换行让数字处于底部
                formatter: (value) =>
                  value > 0
                    ? `

              ${value}%`
                    : `

              0` // 加上单位
              },
              detail: {
                // 仪表盘详情，用于显示数据
                offsetCenter: [0, -10], // 数据偏移量
                fontSize: 24,
                padding: [0, 0, 8, 0],
                formatter: function(value) {
                  return `${value}%`;
                }
              },
              title: {
                offsetCenter: [0, 10] // 设置完成进度的位置
              },
              data: [
                {
                  value: 87,
                  name: '完成进度',
                  itemStyle: {
                    // 设置仪表盘完成进度的颜色
                    color: '#81ADFF'
                  }
                }
              ]
            }
          ]
        })
      };
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

### 多色仪表盘

:::demo

```html
<template>
  <jy-chart :theme="theme" type="gauge" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: {}
      };
    },
    created() {
      this.makeOption(this.theme);
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
        this.makeOption(this.theme);
      });
    },
    methods: {
      makeOption(val) {
        this.chartOptions = {
          series: [
            {
              detail: {
                // 仪表盘详情，用于显示数据
                offsetCenter: [0, '58%'], // 偏移量
                formatter: function(value) {
                  let risk = value > 30 ? '高' : '低';
                  // return '{value|' + risk + '}{unit|}'; // 添加单位
                  return `${risk}`; // 添加单位
                },
                color: '#35B55F'
              },
              title: {
                offsetCenter: [0, '80%']
              },
              anchor: {
                itemStyle: {
                  color: val === 'White' ? '#ffffff' : '#15181a'
                }
              },
              data: [
                {
                  value: 8,
                  name: '风险等级',
                  itemStyle: {
                    // 设置基础仪表盘的颜色
                    color: '#35B55F'
                  }
                }
              ]
            }
          ]
        };
      }
    }
  };
</script>
```

:::

### 雷达图

:::demo

```html
<template>
  <jy-chart :theme="theme" type="radar" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: Object.freeze({
          legend: {
            legends: ['项目名称1', '项目名称2']
          },
          radar: {
            indicator: [
              { name: '指标1', max: 6500 },
              { name: '指标2', max: 16000 },
              { name: '指标3', max: 30000 },
              { name: '指标4', max: 38000 },
              { name: '指标5', max: 52000 },
              { name: '指标6', max: 25000 },
              { name: '指标7', max: 20000 },
              { name: '指标8', max: 36000 },
              { name: '指标9', max: 43000 },
              { name: '指标10', max: 20000 }
            ]
          },
          series: [
            {
              data: [
                {
                  value: [4200, 12000, 20000, 35000, 40000, 18000, 16000, 25000, 30000, 15000],
                  name: '项目名称1'
                },
                {
                  value: [5000, 14000, 20000, 26000, 22000, 14000, 12000, 20000, 16000, 13000],
                  name: '项目名称2'
                }
              ]
            }
          ]
        })
      };
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    }
  };
</script>
```

:::

### 中国地图

:::demo

```html
<template>
  <jy-chart :theme="theme" type="chinaMap" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  let areaList = [
    '南海诸岛',
    '北京',
    '天津',
    '上海',
    '重庆',
    '河北',
    '河南',
    '云南',
    '辽宁',
    '黑龙江',
    '湖南',
    '安徽',
    '山东',
    '新疆',
    '江苏',
    '浙江',
    '江西',
    '湖北',
    '广西',
    '甘肃',
    '山西',
    '内蒙古',
    '陕西',
    '吉林',
    '福建',
    '贵州',
    '广东',
    '青海',
    '西藏',
    '四川',
    '宁夏',
    '海南',
    '台湾',
    '香港',
    '澳门'
  ];
  let mapDataList = areaList.map((item) => {
    return {
      name: item,
      value: Math.ceil(Math.random() * 100000),
      personGDP: Math.ceil(Math.random() * 100000),
      invisible: Math.ceil(Math.random() * 1000),
      rate: (Math.random() * 100).toFixed(2),
      balance: Math.ceil(Math.random() * 10000)
    };
  });
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White'
      };
    },
    computed: {
      chartOptions() {
        return {
          tooltip: {
            formatter: ({ name, data }) => {
              let returnData = '';
              if (name) {
                returnData += '<span style="display:inline-block; margin-right:5px; border-radius:50% ;width:10px;height:10px;background: #FCCA6A;"></span>';
                returnData += `<span style="color: ${this.theme === 'White' ? '#202020' : '#E6E6E6'};">` + name + '</span>' + '<br/>';
              }
              let items = [
                { name: 'GDP (亿)', type: 'value' },
                { name: '人均GDP (元)', type: 'value' },
                { name: '隐性债务率', type: 'value' },
                { name: '负债率', type: 'value' },
                { name: '城投债余额 (亿)', type: 'value' }
              ];
              items.forEach((item) => {
                returnData +=
                  `<span style="color: ${this.theme === 'White' ? 'rgba(20,20,20, 0.65)' : 'rgba(230,230,230,0.65)'}">` +
                  item.name +
                  '</span>' +
                  ':' +
                  `<span style="margin-left:5px;font-weight:500;color: ${this.theme === 'White' ? '#202020' : '#E6E6E6'}">` +
                  (this.formatNumber(data[item.type]) || '--') +
                  '</span></br>';
              });
              return returnData;
            }
          },
          series: [
            {
              name: '数据',
              type: 'map',
              geoIndex: 0,
              data: mapDataList
            }
          ]
        };
      }
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    },
    methods: {
      formatNumber(num) {
        let source = String(num).split('.');
        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,');
        return source.join('.');
      }
    }
  };
</script>
```

:::

### 导出图表图片

:::tip
通过配置 copy-config 选项开启导出图表图片功能，最终返回一个 base64 的 URL

注：getUrlMethod 为 copy-config 的必须配置项，从 getUrlMethod 绑定方法的参数中获取 base64
:::

:::demo

```html
<template>
  <jy-chart :theme="theme" type="bar" :copy-config="{ getUrlMethod: getUrl, copyWidth: 800, copyHeight: 360, isClear: true }" :chartOptions="chartOptions"></jy-chart>
</template>

<script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        chartOptions: Object.freeze({
          legend: {
            legends: ['项目名称1', '项目名称2']
          },
          xAxis: {
            data: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年']
          },
          yAxis: {
            name: '指标单位'
          },
          grid: { bottom: 30 },
          series: [
            {
              name: '项目名称1',
              data: [220, 500, 400, 550, 480, 200, 320],
              stack: 'one',
              itemStyle: {
                // 设置柱状条中的白色间距
                // borderColor: '#fff',
                borderWidth: 2,
                borderRadius: [2, 2, 0, 0]
              }
            },
            {
              name: '项目名称2',
              data: [100, 270, 250, 380, 230, 100, 190],
              stack: 'one',
              itemStyle: {
                // borderColor: '#fff',
                borderWidth: 2,
                borderRadius: [2, 2, 0, 0]
              }
            }
          ]
        })
      };
    },
    mounted() {
      Bus.$on('changeTheme', (val) => {
        this.theme = val;
      });
    },
    methods: {
      getUrl(url) {
        // url为返回的base64内容
        // console.log(url);
      }
    }
  };
</script>
```

:::

### Chart Attributes

| 参数         | 说明                                                                                                                                                                                                               | 类型   | 可选值                                           | 默认值 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------ | ------ |
| chartOptions | 图形配置的参数                                                                                                                                                                                                     | object | —                                                | —      |
| type         | 图形类型                                                                                                                                                                                                           | string | bar/line/pie/scatter/bubble/gauge/radar/chinaMap | —      |
| theme        | 主题颜色                                                                                                                                                                                                           | string | White/Black                                      | White  |
| width        | 图形宽度                                                                                                                                                                                                           | string | —                                                | 100%   |
| height       | 图形高度                                                                                                                                                                                                           | string | —                                                | 300px  |
| copyConfig   | 导出图表图片配置项，包括 4 个选项：getUrlMethod(必须配置项：通过该方法的参数获取 base64 的方法)、copyWidth（自定义图片的宽度）、copyHeight（自定义图片的高度）、isClear（是否清除 echarts Instance， 默认值 true） | object | —                                                | {}     |

### Chart Methods

通过获取 echarts 实例绑定对应的方法，如 this.\$refs.chart.jyChart.on('click', () => {})绑定点击事件

<font class='a-in-componet-primary-color' >[echarts 官方文档](https://echarts.apache.org/zh/option.html#title)</font>
