<template>
  <div class="jy-scatter">
    <div class="jy-scatter--chart"
         :style="{ width: width, height: height}"
         ref="dotsChart"
         id="dots" />
  </div>
</template>

<script>
  import { renderColor, scatterColors } from 'GildataDesign/src/chart-color/colorData';

  let colors = scatterColors;
  const sizeFunction = function(x) {
    let y = Math.sqrt(x / 5e8) * 80;
    return y * 80;
  };
  let colorData = {};
  export default {
    name: 'JyScatter',
    data() {
      return {
        myChart: null,
        options: {
          colors: colors,
          title: {
            text: ''
          },
          legend: {
            left: 'center',
            bottom: 10
          },
          credits: {
            enabled: false
          }
        }
      };
    },
    props: {
      width: {
        default: '100%'
      },
      height: {
        default: '360px'
      },
      chartOptions: {
        type: Object,
        default: () => {
          return {
            xTitle: '',
            yTitle: '',
            data: []
          };
        }
      },
      data: {
        type: Array,
        default: () => {
          return [];
        }
      },
      schema: {},
      fontSize: {
        default: 12
      },
      themeType: {
        default: 'White'
      }
    },
    watch: {
      themeType(val) {
        colorData = renderColor(val);
        this.resize();
      },
      fontSize(val) {
        this.resize();
      },
      width(val) {
        this.$nextTick(() => this.resize());
      },
      height(val) {
        this.$nextTick(() => this.resize());
      },
      chartOptions: {
        handler(val) {
          if (val) this.resize();
        },
        deep: true
      }
    },
    methods: {
      renderOptions() {
        // debugger
        const {
          xTitle,
          yTitle,
          data,
          legend,
          hideLegends,
          sizeAttr,
          tooltipName,
          splitLine = true,
          splitDot = false
        } = this.chartOptions;
        let that = this;
        this.options = {
          ...this.options,
          color: colors,
          chart: {
            backgroundColor: 'transparent',
            height: this.height || null
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                // 添加自定义指示线
                color: colorData.comp_02,
                type: 'dotted'
              }
            },
            borderWidth: 0,
            backgroundColor: colorData.bg_color,
            textStyle: {
              fontSize: this.fontSize,
              color: colorData.font_01
            },
            borderRadius: 2, // 圆角
            extraCssText: 'box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);'
          },
          xAxis: {
            name: xTitle,
            nameTextStyle: {
              color: colorData.font_light
            },
            lineColor: colorData.comp_02,
            // tickColor: 'transparent',
            gridLineColor: colorData.comp_02,
            axisLabel: {
              color: colorData.font_01
            },
            splitLine: {
              show: splitLine,
              lineStyle: {
                color: colorData.comp_02,
                type: 'dotted'
              }
            },
            axisLine: {
              lineStyle: {
                color: colorData.comp_02
              }
            },
            // show: xAxisShow ? !xAxisShow : true,
            axisTick: {
              show: false
            }
          },
          yAxis: {
            lineColor: colorData.comp_02,
            lineWidth: 1,
            gridLineColor: colorData.comp_02,
            name: yTitle,
            nameTextStyle: {
              color: colorData.font_light
            },
            axisLabel: {
              color: colorData.font_01
            },

            // inverse: inverseyAxis ? inverseyAxis : false,
            type: 'value',
            // show: yAxisShow ? !yAxisShow : true,
            // name: leftTitle || '',
            axisLine: {
              lineStyle: {
                color: colorData.comp_02
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: splitLine,
              lineStyle: {
                color: colorData.comp_02,
                type: 'dotted'
              }
            }
          },
          grid: {
            top: 30,
            left: 25,
            right: 25,
            bottom: 40,
            containLabel: true
          }
        };

        const legendobject = {
          show: !hideLegends,
          type: 'scroll',
          pageIconColor: colorData.font_01,
          pageIconSize: 12,
          pageTextStyle: {
            color: colorData.font_01
          },
          bottom: 6,
          itemWidth: 12,
          itemHeight: 10,
          textStyle: {
            color: colorData.font_01,
            fontSize: this.fontSize,
            padding: [2, 0, 0, 0]
          },
          ...this.options.legend,
          ...legend
        };
        this.options.legend = legendobject;
        this.options.xAxis = {
          ...this.options.xAxis,
          ...this.chartOptions.xAxis
        };

        if (sizeAttr) {
          this.options.visualMap = [
            {
              show: false,
              dimension: 8,
              // categories: data.counties,
              inRange: {
                color: (function() {
                  return colors.concat(colors);
                })()
              }
            }
          ];
        }

        this.options.series = this.chartOptions.data;

        this.options.series.map((item, index) => {
          let obj = item;

          if (sizeAttr) {
            obj.symbolSize = function(val) {
              return sizeFunction(val[2]);
            };
          }

          if (obj.markPoint && obj.markPoint.label) {
            obj.markPoint.label.color = colorData.font_01;
          }
        });
        if (splitDot) {
          this.options.tooltip.formatter = function(params) {
            const tooptip = [];
            params.map(item => {
              const { marker, seriesName, data } = item;
              tooptip.push(`${marker}${seriesName}${data[2]}<br/>${data[3]}:${data[0]}<br/>${data[4]}:${data[1]}`);
            });
            return tooptip.join('<br/>');
          };
        }
        if (this.schema) {
          this.options.tooltip.formatter = function(params) {
            let result = params[0].data;
            let str = '';
            that.schema.forEach((item, index) => {
              if (item.fieldFunc === 'cffDate') {
                str +=
                  item.caption + '：' + result[that.schema.length - 1] + '<br/>';
              } else {
                str += item.caption + '：' + result[index - 1] + '<br/>';
              }
            });
            return str;
          };

          this.options.series = this.formatSeries(data);
        }

        if (tooltipName) {
          this.options.tooltip.formatter = function(params) {
            let result = params[0].data;
            let str = result[3] + ',' + result[0] + ',' + result[1] + ',' + result[2];
            return str;
          };
        }
        return this.options;
      },
      formatSeries(data) {
        return data.map((item) => {
          if (item.type === 'line') {
            return {
              type: 'line',
              data: item.data,

              smooth: true,
              showSymbol: false,
              symbol: 'none', // 取消折点圆圈
              symbolSize: 0,
              markPoint: item.markPoint
            };
          } else {
            return {
              type: 'scatter',
              data: item.data,
              allowPointSelect: false,
              itemStyle: {
                opacity: 0.8
              },
              states: {
                hover: {
                  enabled: false
                }
              },
              marker: {
                symbol: 'circle',
                radius: 3
              }
            };
          }
        });
      },

      resize() {
        if (this.myChart) {
          this.myChart.dispose();
          this.myChart = this.$echarts.init(this.$refs.dotsChart);
          this.myChart.setOption(this.renderOptions(), true);
          this.myChart.resize();
        }
      }
    },
    mounted() {
      const chart = this.$refs.dotsChart;
      if (chart) {
        this.myChart = this.$echarts.init(chart);
        this.myChart.setOption(this.renderOptions());
        window.addEventListener('resize', () => {
          this.myChart && this.myChart.resize();
        });
      }
    },
    created() {
      colorData = renderColor(this.themeType);
    },
    beforeDestroy() {
      if (this.myChart) {
        window.removeEventListener('resize', () => {
          this.myChart.resize();
        });
        this.myChart.clear();
        this.myChart = null;
      }
    }
  };
</script>
