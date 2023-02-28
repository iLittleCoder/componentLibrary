<template>
  <div class="jy-chart__container">
    <div class="jy-chart" ref="chart" :style="{ width, height }"></div>
    <!-- 为了导出图片，使用完之后会进行销毁不会占用dom -->
    <div ref="chartCopy" id="chartCopy" v-show="false" :style="{ width, height }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import DeepMerge from 'deep-merge';
import '../option/china.js';
// import { configure } from '../option/theme.js';

import { configure } from '../option/theme.js';
import { deepClone } from 'GildataDesign/src/utils/util';
import {
  colors,
  barOption,
  barSeries,
  lineOption,
  lineSeries,
  lineAreaStyle,
  preOption,
  preSeries,
  scatterOption,
  scatterSeries,
  bubbleSeries,
  gaugeOption,
  gaugeSeries,
  radarOption,
  radarSeries,
  chinaOption
} from '../option/baseOption.js';

let colorMap = {};

// 注册主题
echarts.registerTheme('White', configure(colors.White, 'White'));
echarts.registerTheme('Black', configure(colors.Black, 'Black'));

export default {
  name: 'JyChart',

  data() {
    this.jyChart = null;
    this.myChartCopy = null;
    return {
      options: {}
    };
  },
  watch: {
    theme: {
      handler(val) {
        if (val) {
          colorMap = colors[val];
          // 先销毁示例 使用对应的主题样式
          this.jyChart && this.jyChart.dispose();
          this.jyChart = this.$echarts.init(this.$refs.chart, this.theme);
          this.handleOption();
        }
      }
    },
    type: {
      handler(val) {
        if (val) this.handleOption();
      }
    },
    chartOptions: {
      handler(val) {
        if (val) this.handleOption();
      },
      deep: true
    },
    width() {
      this.$nextTick(() => this.chartResize());
    },
    height() {
      this.$nextTick(() => this.chartResize());
    }
  },
  props: {
    // 图形类型
    type: String,
    theme: {
      default: 'White'
    },
    width: {
      default: '100%'
    },
    height: {
      default: '300px'
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    copyConfig: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() {
    this.$echarts = echarts;
    // 获取白色对应的色板
    colorMap = colors[this.theme];
    // 注册主题已放到main.js
    // this.$echarts.registerTheme('White', configure(colors.White));
    // this.$echarts.registerTheme('Black', configure(colors.Black));
  },
  mounted() {
    // 使用对应的主题样式
    this.jyChart = this.$echarts.init(this.$refs.chart, this.theme);
    this.handleOption();
    // 添加resize监听事件
    window.addEventListener('resize', this.chartResize);
  },
  methods: {
    handleOption() {
      /**
       * 1、给各种图形添加series基础的样式
       * 2、合并对应图形的公共配置
       * */
      if (this.type === 'bar') {
        let obj = deepClone(this.chartOptions);
        if (Array.isArray(obj.series) && obj.series.length) {
          obj.series = obj.series.map((item) => {
            return {
              ...barSeries,
              ...item
            };
          });
        }
        this.options = this.merge(barOption(colorMap), obj);
      }
      if (this.type === 'line') {
        let obj = deepClone(this.chartOptions);
        if (Array.isArray(obj.series) && obj.series.length) {
          obj.series = obj.series.map((item, key) => {
            return {
              ...lineSeries(key, colorMap),
              ...lineAreaStyle(item, key, colorMap)
            };
          });
        }
        this.options = this.merge(lineOption(colorMap), obj);
      }
      if (this.type === 'pie') {
        let obj = deepClone(this.chartOptions);
        if (Array.isArray(obj.series) && obj.series.length) {
          obj.series = obj.series.map((item, key) => {
            return {
              ...preSeries(this.$refs.chart.clientWidth, colorMap),
              ...item
            };
          });
        }
        this.options = this.merge(preOption(colorMap), obj);
      }
      if (this.type === 'scatter') {
        let obj = deepClone(this.chartOptions);
        if (Array.isArray(obj.series) && obj.series.length) {
          obj.series = obj.series.map((item, key) => {
            return {
              ...scatterSeries(colorMap),
              ...item
            };
          });
        }
        this.options = this.merge(scatterOption(colorMap, this.type), obj);
      }
      // 气泡图
      if (this.type === 'bubble') {
        let obj = deepClone(this.chartOptions);
        if (Array.isArray(obj.series) && obj.series.length) {
          obj.series = obj.series.map((item, key) => {
            return {
              ...bubbleSeries(key, colorMap),
              ...item
            };
          });
        }
        this.options = this.merge(scatterOption(colorMap), obj);
      }
      // 仪表盘
      if (this.type === 'gauge') {
        let obj = deepClone(this.chartOptions);
        if (Array.isArray(obj.series) && obj.series.length) {
          // 合并series[0]
          obj.series[0] = this.merge(gaugeSeries(colorMap), obj.series[0]);
        }
        this.options = this.merge(gaugeOption(colorMap), obj);
      }
      // 雷达图
      if (this.type === 'radar') {
        let obj = deepClone(this.chartOptions);
        // 处理series[0]的data
        if (Array.isArray(obj.series) && obj.series.length) {
          if (Array.isArray(obj.series[0].data) && obj.series[0].data.length) {
            obj.series[0].data = obj.series[0].data.map((item, key) => {
              return {
                ...radarSeries(key, colorMap),
                ...item
              };
            });
          }
        }
        // 合并series
        obj.series[0] = {
          ...radarOption(colorMap).series[0],
          ...obj.series[0]
        };
        // 传递indicator，因为formatter中无法获取每一项的name
        let indicator = (obj.radar && obj.radar.indicator && Array.isArray(obj.radar.indicator) && obj.radar.indicator) || '';
        this.options = this.merge(radarOption(colorMap, indicator), obj);
      }
      // 中国地图
      if (this.type === 'chinaMap') {
        let obj = deepClone(this.chartOptions);
        this.options = this.merge(chinaOption(colorMap), obj);
      }

      // copyConfig配置了getUrlMethod方法则提供图形的复制功能
      if (this.copyConfig.getUrlMethod && typeof this.copyConfig.getUrlMethod === 'function') {
        // 已有配置项的情况下
        if (Object.keys(this.options).length) {
          this.getChartUrl(this.copyConfig);
        }
      }

      // 第二个参数为true，表示旧的组件会被完全移除，新的组件会根据option创建
      this.jyChart.setOption(this.options, true);
      this.jyChart.resize();
    },
    // 尺寸变化 重新渲染
    chartResize() {
      this.jyChart && this.jyChart.resize();
    },
    resize() {
      if (this.$refs.chart && this.jyChart) {
        this.jyChart.setOption(this.options, true);
        this.jyChart.resize();
      }
    },
    merge(a, b) {
      return DeepMerge((a, b) => b)(a, b);
    },
    getChart() {
      return this.jyChart;
    },
    // 图形组件对外提供复制，下载图片echart初始化
    getChartUrl({ getUrlMethod, copyWidth = this.$refs.chart.offsetWidth, copyHeight = this.$refs.chart.offsetHeight, isClear = true }) {
      this.myChartCopy && this.myChartCopy.dispose(); // 销毁实例
      this.myChartCopy = this.$echarts.init(this.$refs.chartCopy, this.theme, {
        width: copyWidth,
        height: copyHeight
      });
      let options = deepClone(this.options);
      if (options.legend && options.legend.type) {
        options.legend.type = 'plain'; // 设置为普通图例
      }
      this.myChartCopy.setOption(options);
      this.myChartCopy && this.myChartCopy.resize();

      // 渲染完成事件
      this.myChartCopy.on('finished', () => {
        let myChartURL =
          this.myChartCopy &&
          this.myChartCopy.getDataURL({
            type: 'png',
            pixelRatio: 1,
            backgroundColor: colorMap.chartBg
          });
        // 将myChartURL传递出去
        getUrlMethod(myChartURL);
        // 销毁示例
        if (isClear) {
          this.myChartCopy.dispose();
          this.myChartCopy = null;
        }
      });
    }
  },
  beforeDestroy() {
    // 移除resize监听事件
    window.removeEventListener('resize', this.chartResize);
    this.jyChart.clear();
    this.jyChart = null;
    this.myChartCopy = null;
  }
};
</script>
