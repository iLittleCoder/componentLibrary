<template>
  <div class="gj-pie">
    <div class="gj-pie--chart" ref="pieChart" :style="{ width: width, height: height}"></div>
  </div>
</template>

<script>
  import { renderColor, colors } from 'GildataDesign/src/chart-color/colorData';
  let colorData = {};
  export default {
    name: 'GjPie',
    data() {
      return {
        lineChart: ''
      };
    },
    watch: {
      themeType: {
        handler(val) {
          colorData = renderColor(val);
          this.resize();
        },
        immediate: true
      },
      data: {
        handler(val) {
          if (val) this.resize();
        },
        immediate: true,
        deep: true
      },
      chartOptions: {
        handler(val) {
          if (val) this.resize();
        },
        deep: true
      },
      checkLegend: {
        handler(val) {
          if (val) this.resize();
        },
        deep: true
      }
    },
    props: {
      width: {
        default: '100%'
      },
      height: {
        default: '300px'
      },
      themeType: {
        default: 'White'
      },
      chartOptions: {
        type: Object,
        default: () => {
          return {};
        }
      },
      data: {
        type: Array,
        default: () => {
          return [];
        }
      },
      checkLegend: {
        type: Array,
        default: () => {
          return [];
        }
      },
      checkListGroupName: {
        default: ''
      },
      isClickItem: {
        type: Boolean,
        default: false
      },
      legendChoose: {
        type: Boolean,
        default: false
      },
      fontSize: {
        default: 12
      }
    },
    methods: {
      renderOptions() {
        let {
          series,
          colorList,
          tooltip = {},
          title,
          legend,
          toolTitle,
          graphic
        } = JSON.parse(JSON.stringify(this.chartOptions));
        let seriesC = series && JSON.parse(JSON.stringify(series));

        if (seriesC && seriesC[0] && this.legendChoose) {
          seriesC[0].data = seriesC[0].data.filter((item) => {
            if (item.cffGrp && this.checkListGroupName) {
              return (
                item.cffGrp === this.checkListGroupName &&
                this.checkLegend.includes(item.name)
              );
            } else {
              return this.checkLegend.includes(item.name);
            }
          });
        }
        const divWidth =
          this.$refs.pieChart && this.$refs.pieChart.offsetWidth
            ? this.$refs.pieChart.offsetWidth
            : 0;

        const margin =
          divWidth > document.documentElement.offsetWidth / 2
            ? '30%'
            : divWidth > document.documentElement.offsetWidth / 3 ? '20%' : '5%';

        if (seriesC && seriesC[0] && seriesC[0].label.show) {
          seriesC[0].label = {
            normal: {
              ...seriesC[0].label,
              position: 'outside',
              margin: margin,
              color: colorData.font_01,
              textStyle: {
                fontSize: this.fontSize
              }
            }
          };
        }
        if (seriesC[0].labelLayout) {
          seriesC[0].labelLayout = (params) => {
            const isLeft = params.labelRect.x < (this.$refs.pieChart && this.$refs.pieChart.clientWidth - 30) / 2;
            const points = params.labelLinePoints;
            // Update the end point.
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width;
            return {
              labelLinePoints: points
            };
          };
        }

        if (legend) {
          legend.textStyle = {
            color: colorData.font_01
          };
        }

        const obj = {
          title: {
            left: 'center',
            top: '2%',
            text: title || '',
            textStyle: {
              color: colorData.font_01,
              fontSize: '13'
            }
          },
          color: colorList || colors,
          textStyle: {
            color: colorData.font_01,
            fontSize: 12
          },
          tooltip: {
            trigger: 'item',
            borderWidth: 0,
            backgroundColor: colorData.bg_color,
            textStyle: {
              fontSize: 12,
              color: colorData.font_01
            },
            axisPointer: {
              lineStyle: {
                color: colorData.font_01
              }
            },
            confine: true,
            borderRadius: 2, // 圆角
            extraCssText: 'box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);',
            formatter: function(params) {
              return (
                `<span style="margin-right: 8px; color: ${colorData.font_01}">${params.data.name}</span>` +
                `<span style="font-weight:500; color: ${colorData.font_02}">${params.data.value}</span>`);
            },
            ...tooltip
          },
          grid: {
            top: 50,
            left: 50,
            right: 50,
            bottom: 50,
            containLabel: true
          },
          legend: {
            ...legend,
            type: 'scroll',
            pageIconColor: colorData.font_02,
            pageIconSize: 12,
            itemWidth: 10,
            itemHeight: 10,
            pageTextStyle: {
              color: colorData.font_01,
              height: 10
            },
            textStyle: {
              color: colorData.font_01,
              fontSize: this.fontSize,
              lineHeight: 16,
              height: 12,
              rich: {
                a: {
                  verticalAlign: 'middle'
                }
              }
            }
          },
          series: seriesC,
          graphic
        };
        if (toolTitle) {
          obj.tooltip.formatter = function(params) {
            return (
              params.marker +
              `<span style="margin-right: 8px; color: ${colorData.font_01}">${params.data.name}</span>` +
              `<span style="font-weight:500; color: ${colorData.font_02}">${params.data.value}</span>` +
              toolTitle
            );
          };
        }

        if (tooltip.showFormatter) {
          obj.tooltip.formatter = function(params) {
            return (
              params.marker +
              params.data.name +
              `<br/>${tooltip.formatter.c}：${params.data.value}<br/>${tooltip.formatter.d}：${params.percent}`
            );
          };
        }
        return obj;
      },
      resize() {
        if (this.myChart) {
          this.myChart.dispose();
          this.myChart = this.$echarts.init(this.$refs.pieChart);
          this.myChart.setOption(this.renderOptions(), true);
          this.myChart.resize();
        }
      }
    },
    mounted() {
      const chart = this.$refs.pieChart;
      if (chart) {
        this.myChart = this.$echarts.init(chart);
        this.myChart.setOption(this.renderOptions());
        window.addEventListener('resize', () => {
          this.myChart.resize();
        });
        let _this = this;
        if (this.isClickItem) {
          this.myChart.on('click', function(param) {
            // 添加点击事件
            _this.$emit('clickItem', param);
          });
        }
      }
    },
    created() {
      colorData = renderColor(this.themeType);
    },
    destroy() {
      window.removeEventListener('resize', () => {
        this.myChart.resize();
      });
    }
  };
</script>
