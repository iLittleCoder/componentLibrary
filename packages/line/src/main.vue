<!--
1、修改柱状图宽度barMaxW为16
2、分割线改成dotted
3、xAxis.axisLine.show 显示true, 颜色改成colorData.comp_xAxis
4、如果不显示legend，hideLegends设为true
6、取消bRadius的默认值2
7、取消内部之前的下载和复制图片的功能，都通过调用getChartUrl事件获取图形对应的base64
-->

<template>
  <div class="jy-line">
    <div class="jy-line--chart"
         ref="lineChart"
         :style="{
            width: width,
            height: height
          }"></div>

    <!-- 为了导出图片，需要方正的宽高比例 使用完之后会进行销毁不会占用dom -->
    <div ref="lineChartcopy"
         id="lineChartcopy"
         v-show="false"
         :style="{height:lineChartSize+'px',width:lineChartSize+'px'}">
    </div>
  </div>

</template>

<script>
  import {renderColor, colorRgba, colors} from 'GildataDesign/src/chart-color/colorData';

  let colorData = {};
  export default {
    name: 'JyLine',

    data() {
      this.myChart = null;
      this.myChartCopy = null;
      return {
        isallcancaelLegends: false,
        lineChartSize: 0,
        myChartURL: []
      };
    },
    watch: {
      themeType(val) {
        colorData = renderColor(val);
        this.resize();
      },
      width() {
        this.$nextTick(() => this.resize());
      },
      height() {
        this.$nextTick(() => this.resize());
      },
      fontSize(val) {
        this.resize();
      },
      data: {
        immediate: true,
        handler(val) {
          if (val) this.resize();
        },
        deep: true
      },
      chartOptions: {
        handler(val) {
          if (val && val.objlegend && val.objlegend.selected) {
            let selected = Object.values(val.objlegend.selected);
            if (selected.indexOf(true) !== -1) {
              this.isallcancaelLegends = false;
            } else {
              this.isallcancaelLegends = true;
            }
          }
          if (val) this.resize();
        },
        deep: true
      }
    },
    props: {
      themeType: {
        default: 'White'
      },
      width: {
        default: '100%'
      },
      height: {
        default: '250px'
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
      isClickItem: { // 是否添加点击事件
        type: Boolean,
        default: false
      },
      fontSize: {
        default: 12
      },
      pop: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 图形组件对外提供复制，下载图片echart初始化
      getChartUrl(widthParam = 920, heightParam = 434, isclear = false) {
        let height =
          (this.$refs.lineChart && this.$refs.lineChart.offsetHeight) || 250;
        let width =
          (this.$refs.lineChart && this.$refs.lineChart.offsetWidth) || 250;
        this.lineChartSize = (height + width) / 2;
        this.myChartCopy = this.$echarts.init(this.$refs.lineChartcopy, null, {
          width: widthParam,
          height: heightParam
        });
        let renderOptions = JSON.parse(JSON.stringify(this.renderOptions()));
        let legendNum =
          renderOptions &&
          renderOptions.legend &&
          renderOptions.legend.data &&
          renderOptions.legend.data.length;
        renderOptions.legend.type = 'plain';
        renderOptions.xAxis.axisLabel.rotate = 0;
        if (legendNum) {
          let legendNumC = legendNum / 4 < 1 ? 1 : legendNum / 4;
          renderOptions.grid.bottom = legendNumC * 26;
        }
        // delete renderOptions.grid.bottom
        this.myChartCopy.setOption(renderOptions);

        this.myChartCopy && this.myChartCopy.resize();
        let themeTypeColor =
          this.themeType && this.themeType === 'Black' ? '#15181A' : '#fafafa';
        let myChartURL = this.myChartCopy && this.myChartCopy.getDataURL({
          type: 'png',
          pixelRatio: 1,
          backgroundColor: themeTypeColor
        });
        this.myChartURL = myChartURL.split('data:image/png;base64,')[1];
        // 销毁实例
        if (isclear) {
          this.myChartCopy.clear();
        }
        return this.myChartURL;
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
      getdotnum(value) {
        if (Math.floor(value) === value) return 0;
        return value.toString().split('.')[1].length || 0;
      },
      formatValue(val = 0, nullToZero) {
        if (typeof val !== 'number') {
          if (!!nullToZero && val === null) return 0;
          return val;
        }
        return val;
      },

      formatNumber(num) {
        if (!this.isRealNum(num)) {
          return num;
        }
        var source = String(num).split('.'); // 按小数点分成2部分
        source[0] = source[0].replace(
          new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'),
          '$1,'
        ); // 只将整数部分进行都好分割
        return source.join('.'); // 再将小数部分合并进来
      },

      renderOptions() {
        const {
          xAxisSet, // 自定义X轴设置
          xAxisData, // x轴线数据源key
          keys, // 数据对应的key值
          legends, // 设置legend
          rightAxis, // 右轴keys[]
          DataType, // 类型keys[]
          title, // 标题组件，包含主标题和副标题
          titleTop, // title距离顶部高度
          leftTitle, // 左标题
          rightTitle, // 右标题
          subleftTitle, // 左副标题
          backgroundColor, // 背景颜色
          hideXaxisLine = true, // 隐藏x轴线 false =>显示 true=>隐藏
          hideYaxisLine = false, // 隐藏y轴线 false =>显示 true=>隐藏
          hideRightYaxisLine = true,
          hideRightYaxisAxis = false, // 隐藏右侧Y轴轴线，上面这个变量无效
          dataRange, // 显示区间
          colorList, // 自定义色值[]
          dataset, // 数据集
          groupbar, // 自定义tooltip提示框组件
          objlegend,
          multBar, // 堆叠柱状图keys[]
          showmultBarLabel, // 堆叠柱状图是否显示柱状图文字
          showmultBarLabels, // 堆叠柱状图是否显示柱状图文字01
          keyspercent, // 堆叠柱状图 需要参加百分比计算的字段名
          markPoint, // 点标记
          areaStyle, // 面积图keys[]
          seriesData, // 数据源
          xAxisArray, // x轴线数据
          tooltipObj, // 提示框
          labelRotate, // 旋转x轴字体
          decidigList, // 需要保留小数位 例如：{ a0: 2, a1: 3 } a0保留两位小数，a1保留3位小数
          showZero, // 显示0线
          hideLegends, // 是否隐藏图例（如果没有legends 这里为flase）
          hideLine, // 隐藏辅助线
          gridobj,
          symbolShow = true, // 隐藏折线 默认隐藏
          symbol, // 设置标记的图形 如circle
          xAxisextend,
          yAxisData,
          yAxisIndex, // 手动设置y轴索引
          yAxisSet, // y轴
          yAxisextend, // y轴扩展属性
          xAxisShow, // 是否显示x轴
          yAxisShow, // 是否显示y轴
          yAxisaxisaxisLine = true, // 是否显示y轴刻度
          xAxisShowSub, // 是否显示x轴附属轴（双轴的情况 ）
          doublexAxischart, // 两个X轴xAxisIndex，并且有rightAxis(双图)
          axisLabelformatter, // X轴是否overflow
          axisProvideNumber, // x轴每行显示的个数
          axisPointerColor, // Y轴坐标轴指示器color
          barMaxW = 16, // 默认宽度
          bRadius = 2, // 边框的圆角  []<0,0,0,0> || number
          lineStyleWidth, // 折线图 线的宽度，不传递就是 2px
          xAxisLabelShow, // 是否显示X轴文本
          yAxisLabelShow, // 是否显示y轴文本
          inverseyAxis, // 是否翻转Y轴
          inversexAxis, // 是否翻转x轴
          xAxisIndex, // 两个X轴配置项
          xAxisIndexType, // 两个X轴配置项(类型)
          formatterFlag,
          yAxisSetmin = true, // Y轴是否需要动态取最小值作为开始坐标，默认是
          yAxisSetminRight = true, // Y轴右轴是否需要动态取最小值作为开始坐标，默认是
          yAxisMinInterval, // y轴最小间隔大小
          yAxisCustomMax, // y轴最大值增量
          reversXAxis = false, // 反转 x和y的数据,条行图
          cancalStack = true, // 取消面积图和折线图堆叠
          animation = true, // 动画
          YsplitLineColor,
          pointerType = 'line', // 光标指示器类型 'line' 直线指示器，'shadow' 阴影指示器，'none' 无指示器'cross' 十字准星指示
          smooth = false, // 折线图是否丝滑
          nullToZero = false, // 把null转为0
          yNameLocation = 'end', // Y坐标轴名称显示位置，默认在上面，'start'，'middle' 或者 'center'，'end'
          yNameTextStyle = {}, // Y坐标轴名称的文字样式,详细配置参看https://echarts.apache.org/zh/option.html#yAxis.nameTextStyle
          yAxisLabelformatter, // Y轴是否overflow
          visualMap,
          axisLabelInterval, // 配置X坐标轴刻度标签的显示间隔，自定义x坐标的刻度index
          needtoolbox, // 是否需要缩放工具
          customColor, // 自定义每个柱状图的背景颜色，需要和data取 keys显示的数据字段名称保持一致
          showtimeline, // timeline 组件，提供了在多个 ECharts option 间进行切换、播放等操作的功能。
          timelinedata,
          timelineoptions, // 用于 timeline 的 option 数组。数组的每一项是一个 echarts option (ECUnitOption)。
          showLabelObj, // label 设置
          tooltipShow = true, // 是否展示tooltip
          selected = {}, // 图例选中配置
          singleShowSymbol = false, // 折线图单个点显示symbol
          legendpadding,
          noFixed = false // 不要处理保留2位小数
        } = this.chartOptions;
        // 保留小数位
        // debugger

        let that = this;
        if (!noFixed) {
          if (decidigList && Object.keys(decidigList).length > 0 && this.data) {
            this.data.map((item) => {
              /**
               * 首先统一处理保留两位小数
               */
              keys &&
              keys.map((sub) => {
                if (this.isRealNum(item[sub])) {
                  item[sub] = item[sub]
                    ? parseFloat(item[sub]).toFixed(decidigList[sub] || 2)
                    : item[sub];
                }
              });

              /**
               * 配置文件中有声明 具体保留几位小数
               */
              Object.keys(decidigList).map((sub) => {
                if (item[sub]) item[sub] = (+item[sub]).toFixed(decidigList[sub]);
                return sub;
              });
            });
          } else {
            this.data &&
            this.data.map((item) => {
              keys &&
              keys.map((sub) => {
                if (this.isRealNum(item[sub])) {
                  item[sub] = item[sub]
                    ? parseFloat(item[sub]).toFixed(decidigList || 2)
                    : item[sub];
                }
              });
              return item;
            });
          }
        }
        // Y轴配置参数
        let yAxis = {};
        let leftData = [];
        let filterKeys = keys;
        if (objlegend && objlegend.selected) {
          const filterLegend = legends.map((item) => objlegend.selected[item]);
          filterKeys = keys.filter((item, index) => filterLegend[index]);
        }
        if (filterKeys && this.data) {
          this.data.map((item) => {
            Object.keys(item).map((sub) => {
              if (filterKeys.includes(sub)) leftData.push(item[sub]);
              return sub;
            });
            return item;
          });
        }
        // 设置y轴线
        if (rightAxis && rightAxis.length > 0) {
          const leftKeys = filterKeys.filter((item) => !rightAxis.includes(item));
          leftData = [];
          const rightData = [];
          this.data.map((item) => {
            if (multBar) {
              // 堆叠柱状图取合计值

              // 左轴
              const leftMultKeys = leftKeys.filter((sub) => multBar.includes(sub));
              if (leftMultKeys.length > 0) {
                const value = leftMultKeys.reduce((total, val) => {
                  return this.$math.add(total, item[val] || 0);
                }, 0);
                leftData.push(value);
              }
              const leftSinKeys = leftKeys.filter(
                (sub) => !leftMultKeys.includes(sub)
              );
              leftSinKeys.map((sub) => leftData.push(item[sub]));
              // 右轴
              const rightMultKeys = rightAxis.filter((sub) =>
                multBar.includes(sub)
              );
              if (rightMultKeys.length > 0) {
                const value = rightMultKeys.reduce((total, val) => {
                  return this.$math.add(total, item[val] || 0);
                }, 0);
                rightData.push(value);
              }
              const rightSinKeys = rightAxis.filter(
                (sub) => !rightMultKeys.includes(sub)
              );
              rightSinKeys.map((sub) => rightData.push(item[sub]));
            } else {
              leftKeys.map((sub) => leftData.push(item[sub]));
              rightAxis.map((sub) => rightData.push(item[sub]));
            }
            // Object.keys(item).map((sub) => {
            //   if (leftKeys.includes(sub)) leftData.push(item[sub] || 0)
            //   if (rightAxis.includes(sub)) rightData.push(item[sub] || 0)
            // })
          });
          const leftShowZero = [];
          const rightShowZero = [];
          if (showZero) {
            Object.keys(showZero).map((item) => {
              if (leftKeys.includes(item)) leftShowZero.push(showZero[item]);
              if (rightAxis.includes(item)) rightShowZero.push(showZero[item]);
              return item;
            });
          }

          let yAxisSetData = null;
          if (yAxisSet && yAxisSet.length) {
            yAxisSetData = JSON.parse(JSON.stringify(yAxisSet));
            yAxisSetData.map((item) => {
              item.axisLine = {
                lineStyle: {
                  color: colorData.comp_02
                }
              };
              item.splitLine = {
                show: !hideYaxisLine,
                lineStyle: {
                  color: colorData.comp_02,
                  type: 'dotted'
                }
              };
              if (item.axisLabel) {
                item.axisLabel = {
                  formatter: (value, index) => {
                    return value / 1000000 + '百万';
                  }
                };
              }
            });
          }

          yAxis = yAxisSetData
            ? yAxisSetData
            : [
              {
                min: yAxisSetmin ? 'dataMin' : null,
                inverse: inverseyAxis ? inverseyAxis : false,
                type: 'value',
                name: leftTitle || '',
                nameLocation: yNameLocation,
                nameTextStyle: {
                  color: colorData.font_light,
                  ...yNameTextStyle
                },
                splitNumber: 5,
                axisLine: {
                  show: !hideYaxisLine,
                  lineStyle: {
                    color: hideLine ? 'transparent' : colorData.comp_02
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: !hideYaxisLine,
                  lineStyle: {
                    color: hideLine ? 'transparent' : colorData.comp_02,
                    type: 'dotted'
                  }
                },
                axisLabel: {
                  show: yAxisLabelShow ? !yAxisLabelShow : true,
                  formatter: yAxisLabelformatter
                  // interval: 0,
                }
              },
              {
                min: yAxisSetminRight ? 'dataMin' : null,
                // max: 'dataMax',a
                // min: 'dataMin',
                type: 'value',
                name: rightTitle || '',
                // splitNumber: 5,
                // interval: (rightMax - rightMin) / 5,
                splitLine: {
                  show: !hideRightYaxisLine,
                  lineStyle: {
                    color: hideLine ? 'transparent' : colorData.comp_02,
                    type: 'dotted'
                  }
                },
                axisLine: {
                  show: !hideRightYaxisAxis,
                  lineStyle: {
                    color: hideLine ? 'transparent' : colorData.comp_02
                  }
                },
                axisTick: {
                  show: true,
                  lineStyle: {
                    color: hideLine ? 'transparent' : colorData.comp_02
                  }
                },
                axisLabel: {
                  show: yAxisLabelShow ? !yAxisLabelShow : true,
                  formatter: yAxisLabelformatter
                }

                // splitLine: {
                //   show: !hideXaxisLine,
                //   lineStyle: {
                //     color: hideLine ? 'transparent' : colorData.comp_02,
                //   },
                // },
              }
            ];
          /**
           * 百分比堆叠柱状图
           */
          if (showmultBarLabel) {
            yAxis[0].max = 100;
            yAxis[0].min = 0;
            yAxis[0].interval = 50;
          } else {
            // yAxis
          }
        } else {
          yAxis = {
            // min: 'dataMin',
            min: yAxisSetmin ? 'dataMin' : null,
            inverse: inverseyAxis ? inverseyAxis : false,
            type: 'value',
            show: yAxisShow ? !yAxisShow : true,
            name: leftTitle || '',
            axisLine: {
              lineStyle: {
                //   color: hideLine ? 'transparent' : colorData.comp_02,
                color: YsplitLineColor
                  ? YsplitLineColor
                  : hideLine
                    ? 'transparent'
                    : colorData.comp_02
              },
              show: yAxisaxisaxisLine ? yAxisaxisaxisLine : false
            },
            axisTick: {
              show: false
            },
            nameLocation: yNameLocation,
            nameTextStyle: {
              color: colorData.font_light,
              ...yNameTextStyle
            },
            splitLine: {
              show: !hideYaxisLine,
              lineStyle: {
                color: YsplitLineColor
                  ? YsplitLineColor
                  : hideLine
                    ? 'transparent'
                    : colorData.comp_02,
                type: 'dotted'
                // color: '#001125',
              }
            },
            axisLabel: {
              show: yAxisLabelShow ? !yAxisLabelShow : true,
              formatter: yAxisLabelformatter
              // interval: 0,
            }
          };

          /**
           * Y轴扩展属性
           */
          if (yAxisextend) {
            yAxis = {
              ...yAxis,
              ...yAxisextend
            };
          }

          if (
            showZero &&
            leftData.length > 0 &&
            Object.values(showZero).includes(false) &&
            Math.min.apply(null, leftData) > 0
          ) {
            yAxis.min = Math.floor(Math.min.apply(null, leftData));
          }

          if (yAxisMinInterval) {
            yAxis.minInterval = yAxisMinInterval;
          }

          if (yAxisCustomMax) {
            yAxis.max = function(value) {
              return value.max + yAxisCustomMax;
            };
          }

          /**
           * 百分比堆叠柱状图
           */
          if (showmultBarLabel) {
            yAxis.max = 100;
            yAxis.min = 0;
            yAxis.interval = 50;
          } else {
            // yAxis
          }
        }

        let xAxisextendC = xAxisextend || {};
        let xAxis = xAxisSet
          ? xAxisSet
          : {
            inverse: inversexAxis ? inversexAxis : false,

            axisLine: {
              show: !hideXaxisLine,
              lineStyle: {
                // color: hideLine ? 'transparent' : colorData.comp_02,
                color: YsplitLineColor ? YsplitLineColor
                  : hideLine
                    ? 'transparent'
                    : colorData.comp_02
              }
            },
            show: xAxisShow ? !xAxisShow : true,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: xAxisLabelShow ? !xAxisLabelShow : true,
              rotate: labelRotate ? 30 : 0,
              fontWeight: 100,
              interval: axisLabelInterval
                ? function(index, value) {
                  if (axisLabelInterval.includes(index)) {
                    return true;
                  } else return false;
                }
                : 'auto'
            },
            splitLine: {
              show: !hideXaxisLine,
              lineStyle: {
                color: hideLine ? 'transparent' : colorData.comp_02
              }
            },
            data: xAxisArray
              ? xAxisArray
              : this.data.map((item) => this.formatValue(item[xAxisData])),
            ...xAxisextendC
          };

        /**
         * 两个X轴xAxisIndex，xAxis需要两个元素
         */
        if (xAxisIndex && Array.isArray(xAxisIndex) && xAxisIndex.length > 0) {
          yAxis[1].gridIndex = 1;
          yAxis[1].name = subleftTitle;
          yAxis[1].nameLocation = yNameLocation;
          yAxis[1].nameTextStyle = {
            color: colorData.font_light,
            ...yNameTextStyle
          };
          /**
           * 如果是行情
           */
          if (xAxisIndexType === 'quotation') {
            yAxis[1].axisLabel = {show: false};
            yAxis[1].axisLine = {show: false};
            yAxis[1].axisTick = {show: false};
            yAxis[1].splitLine = {show: false};

            xAxis = [
              xAxis,
              {
                gridIndex: 1,
                axisLine: {
                  show: !hideXaxisLine,
                  lineStyle: {
                    color: hideLine ? 'transparent' : colorData.comp_02
                  }
                },
                show: false,
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: xAxisLabelShow ? !xAxisLabelShow : true,
                  rotate: labelRotate ? 30 : 0,
                  fontWeight: 100
                },
                splitLine: {
                  show: !hideXaxisLine,
                  lineStyle: {
                    color: hideLine ? 'transparent' : colorData.comp_02
                  }
                },
                data: xAxisArray
                  ? xAxisArray
                  : this.data.map((item) => this.formatValue(item[xAxisData])),
                ...xAxisextendC
              }
            ];
          } else {
            xAxis = [
              xAxis,
              {
                gridIndex: 1,
                axisLine: {
                  show: !hideXaxisLine,
                  lineStyle: {
                    color: hideLine ? 'transparent' : colorData.comp_02
                  }
                },
                splitLine: {
                  show: !hideXaxisLine,
                  lineStyle: {
                    color: hideLine ? 'transparent' : colorData.comp_02
                  }
                },
                show: xAxisShowSub ? !xAxisShowSub : true,
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: xAxisLabelShow ? !xAxisLabelShow : true,
                  rotate: labelRotate ? 30 : 0,
                  fontWeight: 100,
                  interval: axisLabelInterval
                    ? function(index, value) {
                      if (axisLabelInterval.includes(index)) {
                        return true;
                      } else return false;
                    }
                    : 'auto'
                },
                data: xAxisArray
                  ? xAxisArray
                  : this.data.map((item) => this.formatValue(item[xAxisData])),
                ...xAxisextendC
              }
            ];
            xAxis[0].show = true;
            xAxis[0].axisLabel = {
              show: false,
              fontWeight: 100,
              interval: axisLabelInterval
                ? function(index, value) {
                  if (axisLabelInterval.includes(index)) {
                    return true;
                  } else return false;
                }
                : 'auto'
            };
            yAxis[1].splitLine = {
              show: !hideYaxisLine,
              lineStyle: {
                color: hideLine ? 'transparent' : colorData.comp_02,
                type: 'dotted'
              },
              axisLabel: {formatter: yAxisLabelformatter}
            };
          }
        } else {
          // yAxis[1].splitLine = {
          //   show: !hideYaxisLine,
          //   lineStyle: {
          //     color: hideLine ? 'transparent' : colorData.comp_02,
          //   },
          // }
        }

        if (axisLabelformatter) {
          xAxis.axisLabel.formatter = function(params) {
            var newParamsName = ''; // 最终拼接成的字符串
            var paramsNameNumber = params.length; // 实际标签的个数
            var provideNumber = axisProvideNumber || 4; // 每行能显示的字的个数(默认4)
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
            /**
             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
             */
            // 条件等同于rowNumber>1
            if (paramsNameNumber > provideNumber) {
              /** 循环每一行,p表示行 */
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = ''; // 表示每一次截取的字符串
                var start = p * provideNumber; // 开始截取的位置
                var end = start + provideNumber; // 结束截取的位置
                // 此处特殊处理最后一行的索引值
                if (p === rowNumber - 1) {
                  // 最后一次不换行
                  tempStr = params.substring(start, paramsNameNumber);
                } else {
                  // 每一次拼接字符串并换行
                  tempStr = params.substring(start, end) + '\n';
                }
                newParamsName += tempStr; // 最终拼成的字符串
              }
            } else {
              // 将旧标签的值赋给新标签
              newParamsName = params;
            }
            // 将最终的字符串返回
            return newParamsName;
          };
        }

        if (yAxisData) {
          if (!Array.isArray(yAxis)) {
            (yAxis.show = yAxisShow ? !yAxisShow : true);
            (yAxis.type = 'category');
            yAxis.data = this.data.map((item) => item[yAxisData]);
          } else {
            (yAxis[0].show = yAxisShow ? !yAxisShow : true);
            (yAxis[0].type = 'category');
            yAxis[0].data = this.data.map((item) => item[yAxisData]);
          }

          if (Array.isArray(xAxis)) {
            xAxis[0].data = null;
          } else {
            xAxis.data = null;
          }

          xAxis.splitLine = {
            show: false
          };
        }

        const legend = {
          show: !hideLegends,
          data: legends,
          type: 'scroll',
          pageIconColor: colorData.font_02,
          pageIconSize: 12,
          pageTextStyle: {
            color: colorData.font_01,
            height: 10
          },
          bottom: dataRange ? 40 : 6,
          // itemGap: 15,
          itemWidth: 10,
          itemHeight: 10,
          // height: 66,
          // lineHeight: 66,
          // padding: [4, 0, 0, 0],
          ...objlegend,
          textStyle: {
            color: colorData.font_01,
            fontSize: this.fontSize,
            lineHeight: 12,
            height: 16,
            rich: {
              a: {
                verticalAlign: 'middle'
              }
            },
            padding:
              legendpadding || legendpadding === 0 ? legendpadding : [4, 0, 0, 0]
          }
        };
        if (Object.keys(selected).length) {
          // 图例选中配置 {name:false|true}
          legend.selected = selected;
        }
        let series = [];
        let customtooltip = {};
        if (!seriesData && legends) {
          // 设置具体区域的背景颜色，选择不同区间 设置图表对应的背景颜色
          let markAreajson = {};

          series = legends.map((item, index) => {
            let key = keys[index];

            /**
             * 百分比堆叠柱状图
             */
            if (showmultBarLabel && keyspercent.indexOf(keys[index]) !== -1) {
              key = keys[index] + 'Per';
            } else {
              key = keys[index];
            }

            const color = (colorList && colorList[index]) || colors[index];
            // DataType配置 end 梯形图 curve 曲线图
            let DataTypeS; // 配置type字段
            switch (DataType[key]) {
              case 'end':
              case 'wae':
              case 'area':
                DataTypeS = 'line';
                break;
              case 'multBar':
                DataTypeS = 'bar';
                break;
              default:
                DataTypeS = DataType[key];
            }
            const obj = {
              name: item,
              type: DataTypeS,
              connectNulls: true,
              data: this.data.map((sub) => {
                if (
                  xAxisData &&
                  sub[xAxisData] !== '合计' &&
                  sub[xAxisData] !== '其他'
                ) {
                  return this.formatValue(sub[key], nullToZero);
                }
              })
            };
            if (showLabelObj && Object.keys(showLabelObj).length) {
              // 首页特殊需求
              obj.label = {
                rich: customColor && customColor,
                formatter: (params) => {
                  if (customColor) {
                    return (
                      `{color${params.dataIndex}|` +
                      (params.value * 1).toFixed(0) + '}'
                    );
                  } else {
                    return params.value;
                  }
                },
                ...showLabelObj
              };
            }
            // 是展示梯形图 默认展示折线图
            if (DataType[key] === 'end') obj.step = 'end';
            // 配置曲线图
            if (DataType[key] === 'wae' || DataType[key] === 'area') {
              obj.smooth = true;

              if (cancalStack) {
                obj.stack = 'multi';
              }

              obj.connectNulls = false;
            }

            // 取消折点圆圈
            if (symbolShow && DataType[key] !== 'scatter') obj.symbol = 'none';
            // 配置曲线面积图
            if (DataType[key] === 'area') {
              obj.areaStyle = keys;
              obj.itemStyle = {
                normal: {
                  color: color
                }
              };
            }
            // 堆叠柱状图
            if (DataType[key] === 'multBar') {
              obj.stack = 'multi';
              // obj.smooth = false
            }

            if (rightAxis && rightAxis.includes(keys[index]) && !xAxisIndex) {
              obj.yAxisIndex = 1;
            }
            if (areaStyle && areaStyle.includes(key)) {
              obj.areaStyle = {};
            }
            if (yAxisIndex && yAxisIndex.length) {
              obj.yAxisIndex = yAxisIndex[index];
            }
            if (multBar && multBar.includes(key)) {
              // 堆叠柱状图
              obj.stack = 'multi';
            }
            /**
             * 百分比堆叠柱状图
             */
            if (showmultBarLabel) {
              let dataCopy = JSON.parse(JSON.stringify(this.data));
              let dataresult = dataCopy.map((sub) => {
                // let { st} = sub
                let sum = 0;
                keyspercent.map((item) => {
                  sum += parseFloat(sub[item] || 0);
                });
                let itemss = sub;
                keyspercent.map((item) => {
                  itemss[item + 'Per'] = Math.round((sub[item] / sum) * 100);
                });
                return itemss;
              });
              obj.data = [];
              obj.data = dataresult.map((sub) =>
                this.formatValue(sub[key], nullToZero)
              );
              obj.label = {
                show: !!showmultBarLabels,
                // 处理柱状图显示文本
                formatter: function(params) {
                  let keyss = '';
                  legends.map((item, index) => {
                    if (params.seriesName === item) {
                      keyss = keys[index];
                    }
                  });
                  let str = dataresult[params.dataIndex][keyss];
                  return str;
                }
              };

              customtooltip = function(params) {
                var label = '';
                var labelArr = [];
                var labelData = [];
                var labelType = [];

                params.forEach((item) => {
                  label = item.axisValueLabel;
                  labelArr.push(item.seriesName);

                  let keyss = '';
                  legends.map((itemlegends, index) => {
                    if (item.seriesName === itemlegends) {
                      keyss = keys[index];
                    }
                  });

                  let str = dataresult[item.dataIndex][keyss] || 0;
                  labelType.push(item.seriesType);
                  labelData.push(str);
                });

                var total = 0;
                labelData.forEach((item, index) => {
                  if (labelType[index] === 'bar') {
                    total += item - 0;
                  }
                });

                var str = `${label}<br/>`;
                labelArr.forEach((item, index) => {
                  if (labelType[index] === 'bar') {
                    str +=
                      item +
                      '：' +
                      labelData[index] +
                      ' (' +
                      Math.round((labelData[index] / total || 0) * 100) +
                      '%)<br/>';
                  } else {
                    str += item + '：' + labelData[index] + '<br/>';
                  }
                });
                return str;
              };
            }

            if (markPoint && markPoint[key]) {
              obj.markPoint = markPoint[key];
            }

            obj.barMaxWidth = 30;
            obj.barMinWidth = 0.1;
            obj.smooth = smooth;
            obj.markArea = markAreajson;
            /**
             * start 处理双X轴，第二个X轴需要的字段名称
             */

            if (
              xAxisIndex &&
              Array.isArray(xAxisIndex) &&
              xAxisIndex.length > 0
            ) {
              xAxisIndex.map((item, index) => {
                if (key === item.key) {
                  obj.xAxisIndex = 1;
                  obj.yAxisIndex = 1;
                }
              });
            }
            /**
             * end
             */

            if (DataType[key] === 'line') {
              const symbolObj = {
                showSymbol: !!symbol,
                symbol: symbol
              };
              const dataLength = this.data.filter(
                (item) => item[key] !== null
              ).length;
              if (dataLength === 1 && singleShowSymbol) {
                symbolObj.showSymbol = true;
                symbolObj.symbol = 'circle';
              }
              return {
                ...obj,
                ...symbolObj,
                symbolSize: 3.5,
                itemStyle: {
                  normal: {
                    color: color
                  }
                },
                xxx: 'ccc',
                lineStyle: {
                  color: colorRgba(color, 1),
                  // opacity: 1,
                  width: lineStyleWidth ? lineStyleWidth : 1.5
                },
                smooth: smooth,
                emphasis: {
                  lineStyle: {
                    width: lineStyleWidth ? lineStyleWidth : 1.5
                  }
                }
              };
            } else {
              if (DataType[key] !== 'area') {
                const dataObj = {
                  ...obj,
                  itemStyle: {
                    normal: {
                      color,
                      borderRadius: obj.stack === 'multi' ? 0 : 2
                    }
                  }
                };
                if (customColor) {
                  dataObj.itemStyle.normal = {
                    ...dataObj.itemStyle.normal,
                    color: (param) => {
                      return customColor['color' + param.dataIndex].color;
                    }
                  };
                  return dataObj;
                } else {
                  return dataObj;
                }
              } else {
                return obj;
              }
            }
          });
        } else {
          Array.isArray(seriesData) &&
          seriesData.forEach((V, index) => {
            const color = (colorList && colorList[index]) || colors[index];
            V.barMaxWidth = barMaxW; // 默认宽度
            V.barMinWidth = 0.1;
            V.connectNulls = true;
            V.smooth = smooth;
            if (!V.itemStyle) {
              V.itemStyle = {
                normal: {
                  borderRadius: bRadius // 边框圆角
                }
              };
            }
            if (V.type === 'line') {
              if (V.lineStyle) {
                V.lineStyle = {
                  normal: {
                    width: V.lineStyleWidth ? V.lineStyleWidth : 1.5
                  },
                  ...V.lineStyle
                };
              } else {
                V.lineStyle = {
                  normal: {
                    width: V.lineStyleWidth ? V.lineStyleWidth : 1.5
                  }
                };
              }

              V.emphasis = {
                lineStyle: {
                  color: colorRgba(color, 1),
                  width: V.lineStyleWidth ? V.lineStyleWidth : 1.5
                }
              };
            }
          });
          series = seriesData;
        }

        let dataZoom = {
          show: true,
          realtime: true,
          start: (dataRange && dataRange.start) || 80,
          end: (dataRange && dataRange.end) || 100,
          xAxisIndex: 0,
          borderColor: 'transparent',
          fillerColor: colorRgba(colorData.primary_01, 0.1),
          handleIcon: colorData.zoom_icon,
          handleStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: colorRgba(colorData.primary_01, 0.1)
                },
                {
                  offset: 1,
                  color: colorRgba(colorData.primary_01, 0.9)
                }
              ],
              global: false
            }
          },
          textStyle: {
            color: colorData.font_01
          },
          dataBackground: {
            lineStyle: {
              color: 'transparent'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: colorRgba(colorData.primary_01, 0.1)
                  },
                  {
                    offset: 1,
                    color: colorRgba(colorData.primary_01, 0.5)
                  }
                ]
              }
            }
          }
          // xAxisIndex: [0, 1],
        };

        const obj = {
          backgroundColor: backgroundColor || colorData.bg_white_color,
          title: {
            show: !!title,
            left: 'center',
            top: titleTop ? titleTop : '2%',
            text: title || '',
            textStyle: {
              color: colorData.font_01,
              fontSize: this.fontSize
            }
          },
          color: colors,
          textStyle: {
            color: colorData.font_01,
            fontSize: this.fontSize,
            fontFamily: 'Source Han Sans CN,Arial,Microsoft Yahei'
          },

          tooltip: {
            show: tooltipShow, // 是否展示 tooltip
            trigger:
              tooltipObj && tooltipObj.trigger ? tooltipObj.trigger : 'axis',
            // borderColor: colorData.font_05,
            borderWidth: 0,
            // backgroundColor: colorRgba(colorData.chart_tooltip_bg, 1),
            backgroundColor: colorData.bg_color,
            textStyle: {
              fontSize: this.fontSize,
              color: colorData.font_01
            },
            axisPointer: {
              lineStyle: {
                // 添加自定义指示线
                color: axisPointerColor ? axisPointerColor : colorData.comp_02,
                type: 'dotted'
              },
              type: pointerType,
              z: 10
            },
            confine: true,
            borderRadius: 2, // 圆角
            extraCssText: 'box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);',
            formatter: function(params) {
              if (groupbar) {
                return '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background:' +
                  params[0].color +
                  '"></span>' + '<span style="color:' +
                  colorData.font_01 +
                  '">' +
                  params[0].axisValueLabel +
                  '</span>' +
                  ':' +
                  '<span style="margin-left:5px;font-weight:500;color:' +
                  colorData.font_02 +
                  '">' +
                  `${params[0].data[0] ? params[0].data[0] : params[0].data}` +
                  '</span>';
              }
              let returnData = '';
              if (params && Array.isArray(params) && params.length > 0) {
                returnData = '<span style="display:inline-block;margin-bottom:5px; color:' +
                  colorData.font_02 + '">' +
                  params[0].axisValueLabel +
                  '</span>' + '<br/>';
              }
              for (let i = 0; i < params.length; i++) {
                if (params[i].seriesName !== '') {
                  let indexColor = params[i].color;
                  returnData +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background:' +
                    indexColor +
                    '"></span>';
                  returnData +=
                    '<span style="color:' +
                    colorData.font_01 +
                    '">' +
                    params[i].seriesName +
                    '</span>' +
                    ':' +
                    '<span style="margin-left:5px;font-weight:500;color:' +
                    colorData.font_02 +
                    '">' +
                    (that.formatNumber(params[i].value) || '--') +
                    (tooltipObj && tooltipObj.tooltipFormatUnit
                      ? tooltipObj.tooltipFormatUnit
                      : '') +
                    '</span></br>';
                }
              }
              return returnData;
            }
          },
          grid: {
            top:
              gridobj && gridobj.top
                ? gridobj.top
                : title ? 50 : !!leftTitle || !!rightTitle ? 40 : 30,
            left: gridobj && gridobj.left ? gridobj.left : 25,
            right: gridobj && gridobj.right ? gridobj.right : 25,
            // bottom: 80,
            bottom: dataRange
              ? 70
              : gridobj && gridobj.bottom
                ? gridobj.bottom
                : !objlegend
                  ? 40
                  : objlegend && objlegend.show
                    ? 40
                    : 20,
            containLabel: !(gridobj && gridobj.containLabel === 'hide')
          },

          axisPointer: {
            link: {xAxisIndex: 'all'}
          },

          legend,
          xAxis,
          yAxis,
          series,
          animation,
          visualMap
        };
        /**
         *start 处理双X轴，第二个X轴需要
         */
        if (xAxisIndex) {
          dataZoom.xAxisIndex = [0, 1];
          // dataZoom.top = '90%'
          // legend.bottom = 10

          if (xAxisIndexType === 'quotation') {
            obj.grid.height = '40%';
            obj.grid = [
              obj.grid,
              {
                left: '10%',
                right: '8%',
                top: '50%',
                height: '20%'
              }
            ];
          } else {
            obj.grid.height = '40%';
            obj.grid = [
              obj.grid,
              {
                left: obj.grid.left - 5,
                right: obj.grid.right,
                top: '50%',
                height: '40%',
                containLabel: true
              }
            ];
          }
        }
        // 两个X轴xAxisIndex，并且有rightAxis
        if (
          xAxisIndex &&
          Array.isArray(xAxisIndex) &&
          xAxisIndex.length > 0 &&
          rightAxis &&
          rightAxis.length &&
          series.length >= 3 &&
          doublexAxischart
        ) {
          yAxis.push({
            min: yAxisSetmin ? 'dataMin' : null,
            inverse: inverseyAxis ? inverseyAxis : false,
            type: 'value',
            show: yAxisShow ? !yAxisShow : true,
            name: leftTitle || '',
            axisLine: {
              lineStyle: {
                color: hideLine ? 'transparent' : colorData.comp_02
              }
            },
            axisTick: {
              show: false
            },
            position: 'right',
            splitLine: {
              show: !hideYaxisLine,
              lineStyle: {
                color: hideLine ? 'transparent' : colorData.comp_02,
                type: 'dotted'
              }
            },
            axisLabel: {
              show: yAxisLabelShow ? !yAxisLabelShow : true,
              formatter: yAxisLabelformatter
              // interval: 0,
            }
          });
          series[2].yAxisIndex = 2;
        }
        /**
         * 处理图例全部不选，x轴存在被遮挡的情况
         */
        if (this.isallcancaelLegends) {
          obj.grid.left = '5%';
        }

        if (formatterFlag) {
          obj.tooltip.formatter = function(params) {
            var label = '';
            var labelArr = [];
            var labelData = [];
            params.forEach((item) => {
              label = item.axisValueLabel;
              labelArr.push(item.seriesName);
              labelData.push(item.data);
            });
            var total = 0;
            labelData.forEach((item) => {
              total += item - 0;
            });
            var str = `${label}<br/>`;
            labelArr.forEach((item, index) => {
              str +=
                item +
                '：' +
                labelData[index] +
                ' (' +
                Math.round((labelData[index] / total) * 100) +
                '%)<br/>';
            });
            return str;
          };
        }

        if (showmultBarLabel) {
          obj.tooltip.formatter = customtooltip;
        }
        if (tooltipObj && tooltipObj.formatter) {
          obj.tooltip.formatter = tooltipObj.formatter;
        }
        if (dataRange) obj.dataZoom = dataZoom;

        if (reversXAxis) {
          // 反转 x和y的数据
          let copyx = {...obj.xAxis};
          obj.xAxis = obj.yAxis;
          obj.yAxis = copyx;
        }

        if (needtoolbox) {
          obj.toolbox = {
            right: 30,
            feature: {
              dataZoom: {
                title: {
                  zoom: '区域缩放',
                  back: '区域缩放还原'
                }
              },
              brush: {
                type: []
              }
            }
          };
        }

        let timeline = {
          // `timeline.data` 中的每一项，对应于 `options`
          // 数组中的每个 `option`
          show: showtimeline,
          autoPlay: false,
          axisType: 'category',
          playInterval: 1000,
          data: timelinedata
        };
        if (showtimeline) {
          obj.timeline = timeline;
          obj.options = timelineoptions;
        }
        if (dataset) obj.dataset = dataset;
        return obj;
      },
      resize() {
        if (this.myChart && this.$refs.lineChart) {
          if (this.pop) {
            this.myChart = this.$echarts.init(this.$refs.lineChart, null, {
              renderer: 'svg'
            });
          } else {
            this.myChart = this.$echarts.init(this.$refs.lineChart);
          }
          this.myChart.setOption(this.renderOptions(), true);
          this.myChart.resize();
        }
      }
    },
    mounted() {
      const chart = this.$refs.lineChart;
      if (chart) {
        if (this.pop) {
          this.myChart = this.$echarts.init(chart, null, {
            renderer: 'svg'
          });
        } else {
          this.myChart = this.$echarts.init(chart);
        }
        this.myChart.setOption(this.renderOptions());
        window.addEventListener('resize', () => {
          this.myChart && this.myChart.resize();
        });
        this.myChart.on('legendselectchanged', ({selected}) => {
          const data = [];
          Object.keys(selected).map((item) => {
            if (selected[item]) data.push(item);
            return item;
          });
          this.$emit('legendchange', data);
        });
        this.myChart.on('dataZoom', (data) => this.$emit('dataZoomChange', data));

        // 渲染完成事件
        this.myChart.on('finished', () => {
          let url = this.myChart.getDataURL();
          this.$emit('getChartUrl', url);
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
    beforeDestroy() {
      if (this.myChart) {
        this.myChart.off('legendselectchanged', ({selected}) => {
          const data = [];
          Object.keys(selected).map((item) => {
            if (selected[item]) data.push(item);
            return item;
          });
          this.$emit('legendchange', data);
        });
        this.myChart.off('dataZoom', (data) => this.$emit('dataZoomChange', data));
        window.removeEventListener('resize', () => {
          this.myChart.resize();
        });
        this.myChart.clear();
        this.myChart = null;
      }
    }
  };
</script>
