<template>
  <div>
    <jy-chart theme="White" ref="chart" height="400px" type="bar" :chartOptions="chartOptions"></jy-chart>

    <jy-line :chartOptions="chartOptions2"></jy-line>

    <p></p>
  </div>
</template>
<script>
import DeepMerge from 'deep-merge';
import { configure } from './WhiteTheme';
// import './china'

let merge = DeepMerge(function(a, b) {
  return b;
});

export default {
  data() {
    let areaList = ['南海诸岛', '北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南', '台湾', '香港', '澳门'];
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

    let list = [[120, 132, 101, 134, 90, 230, 210], [220, 182, 191, 234, 290, 330, 310], [150, 232, 201, 154, 190, 330, 410], [320, 332, 301, 334, 390, 330, 320], [820, 932, 901, 934, 1290, 1330, 1320]].map((item, key) => {
      return {
        data: item,
        name: `项目名称${key + 1}`,
        stack: 'one',
        areaStyle: {} // 面积图一定要设置areaStyle属性
      };
    });
    return {
      myChart: null,
      options: {
        yAxis: {
          name: '指标单位'
        },
        series: [
          {
            name: '项目名称1',
            symbolSize: (value) => Math.round(value[2]), // 设置圆圈的大小
            label: {
              // 文本标签
              show: true,
              position: 'inside',
              color: '#202020',
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
      },
      options1: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          disabled: true,
          children: []
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            },
            {
              value: 'axure1',
              label: 'Axure Components1'
            },
            {
              value: 'sketch1',
              label: 'Sketch Templates1'
            },
            {
              value: 'jiaohu1',
              label: '组件交互文档1'
            }
          ]
        }
      ],
      value3: [],
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
      },
      chartOptions2: {
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
      }
    };
  },
  mounted() {
    // const chart = this.$refs.chart;
    // 注册白色主题
    // this.$echarts.registerTheme("White", configure.theme);
    // init时 第二个参数设置为该主题
    // this.myChart = this.$echarts.init(chart, "White");
    // let obj = ;
    // this.myChart.setOption(obj, true); // true表示旧的组件会被完全移除，新的组件会根据option创建
  },
  methods: {
    handleChange(val) {
      console.log(val, 'handleChange');
    },
    getUrl(data) {
      // console.log(data, 'getChartUrl');
    },
    colorRgba(sHex, alpha = 1) {
      // 十六进制颜色值的正则表达式
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      /* 16进制颜色转为RGB格式 */
      let sColor = sHex ? sHex.toLowerCase() : sHex;
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = '#';
          for (let i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        //  处理六位的颜色值
        var sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(window.parseInt('0x' + sColor.slice(i, i + 2)));
        }
        // return sColorChange.join(',')
        // 或
        return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
      } else {
        return sColor;
      }
    },
    merge(a, b) {
      return DeepMerge((a, b) => b)(a, b);
    },
    /**
     *判断是否是数字
     *
     **/
    isRealNum(val) {
      // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
      if (val === '' || val === null) {
        return false;
      }
      if (!isNaN(val)) {
        // 对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
        // 所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
        return true;
      } else {
        return false;
      }
    },
    formatNumber(num) {
      let source = String(num).split('.'); // 按小数点分成2部分
      source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,'); // 只将整数部分进行都好分割
      return source.join('.'); // 再将小数部分合并进来
    }
  }
};
</script>
