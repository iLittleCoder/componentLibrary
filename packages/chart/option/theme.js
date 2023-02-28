export let configure = (colorMap, theme) => {
  return {
    backgroundColor: colorMap.chartBg,
    /* 标题 */
    title: {
      /* 主标题 */
      textStyle: {
        color: colorMap.font_01,
        fontSize: 13,
        fontWeight: 500
      },
      /* 副标题 */
      subtextStyle: {
        color: colorMap.font_02,
        fontSize: 12
      }
    },
    /* 全局的字体样式 */
    textStyle: {
      color: colorMap.font_02,
      fontSize: 12,
      fontFamily: 'Source Han Sans CN,Arial,Microsoft Yahei'
    },
    /* 提示框组件 */
    tooltip: {
      borderWidth: 0,
      backgroundColor: colorMap.tooltipBg,
      textStyle: { fontSize: 12, lineHeight: 12, color: colorMap.font_01 },
      /* 选中时默认为dotted虚线 */
      axisPointer: {
        lineStyle: {
          color: colorMap.border1,
          type: 'dotted'
        },
        type: 'line',
        z: 10
      },
      confine: true, // 是否将 tooltip 框限制在图表的区域内
      borderRadius: 2,
      extraCssText: theme === 'White' ? 'box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1)' : 'box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.6)'
    },
    /* 图例组件 */
    legend: {
      type: 'scroll', // 可滚动翻页的图例。当图例数量较多时可以使用
      pageIconColor: colorMap.font_01, // 翻页按钮的颜色
      pageIconSize: 12, // 翻页按钮的大小
      pageTextStyle: {
        // 图例页信息的文字样式
        color: colorMap.font_02,
        height: 10
      },
      /* 图例的尺寸 */
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 24, // 图例每项之间的间隔
      textStyle: {
        color: colorMap.font_02,
        fontSize: 12,
        lineHeight: 12,
        height: 16,
        rich: { a: { verticalAlign: 'middle' } }, // 富文本
        padding: [4, 0, 0, 0]
      },
      pageIconInactiveColor: colorMap.font_04 // 翻页按钮不激活时（即翻页到头时）的颜色
    },
    /* grid 不支持通过JSON定义 */
    // 'grid': {'top': 50, 'left': 25, 'right': 20, 'bottom': 40, 'containLabel': true},
    axisPointer: { link: { xAxisIndex: 'all' } },
    // type为value(数值轴，适用于连续数据)
    valueAxis: {
      // 坐标轴轴线
      axisLine: {
        lineStyle: {
          color: colorMap.border1
        }
      },
      // 坐标轴刻度标签
      axisLabel: {
        color: colorMap.font_02
      },
      // 分割线
      splitLine: {
        lineStyle: {
          color: colorMap.border1,
          type: 'dotted'
        }
      },
      nameTextStyle: {
        lineHeight: 30,
        color: colorMap.font_03
      }
    },
    // type为time( 时间轴，适用于连续的时序数据)
    timeAxis: {
      // 坐标轴轴线
      axisLine: {
        lineStyle: {
          color: colorMap.border2
        }
      },
      // 坐标轴刻度标签
      axisLabel: {
        color: colorMap.font_02
      },
      // 分割线
      splitLine: {
        lineStyle: {
          color: colorMap.border1,
          type: 'dotted'
        }
      },
      nameTextStyle: {
        lineHeight: 30,
        color: colorMap.font_03
      }
    },
    // type为category(类目轴，适用于离散的类目数据)
    categoryAxis: {
      axisLine: {
        lineStyle: {
          color: colorMap.border2
        }
      },
      axisLabel: {
        color: colorMap.font_02
      },
      splitLine: {
        lineStyle: {
          color: colorMap.border1,
          type: 'dotted'
        }
      },
      nameTextStyle: {
        lineHeight: 30,
        color: colorMap.font_03
      }
    },
    // type为log(对数轴。适用于对数数据)
    logAxis: {
      axisLine: {
        lineStyle: {
          color: colorMap.border2
        }
      },
      axisLabel: {
        color: colorMap.font_02
      },
      splitLine: {
        lineStyle: {
          color: colorMap.border1,
          type: 'dotted'
        }
      },
      nameTextStyle: {
        lineHeight: 30,
        color: colorMap.font_03
      }
    },
    animation: true, // 图例翻页是否使用动画
    /* 指示器的文本标签 */
    label: {
      color: colorMap.font_02
    },
    /* zoom组件 */
    dataZoom: {
      borderRadius: [2, 2, 2, 2],
      textStyle: {
        color: colorMap.font_01
      },
      height: 20,
      /* dataZoom的边框颜色 */
      borderColor: theme === 'White' ? '#EFEFEF' : '#323232',
      /* dataZoom选择范围时背景色（选框样式） */
      brushStyle: {
        color: colorMap.primary1
      },
      /* 两侧缩放手柄的样式配置 */
      handleStyle: {
        color: colorMap.primary1,
        borderColor: colorMap.primary1
      },
      handleSize: 20,
      /* 两侧缩放手柄的图标 浅色有蓝色图标 深色用黄色图标 */
      handleIcon:
        theme === 'White'
          ? 'image://data:image/png;base64,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'
          : 'image://data:image/png;base64,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',
      /* 移动手柄的尺寸高度(移动手柄在当前已选择区域的最顶部) */
      moveHandleSize: 0,
      // fillerColor: colorMap.primary2, // 选中范围的填充颜色
      /* 数据阴影 */
      dataBackground: {
        lineStyle: {
          color: 'transparent'
        },
        areaStyle: {
          color: colorMap.primary2,
          opacity: 1 // 缩放区域未选中区域的填充色，注意默认透明度为0.2
        }
      },
      /* 选中数据的阴影 */
      selectedDataBackground: {
        lineStyle: {
          color: 'transparent'
        }
      }
    },
    /* visualMap 地图的视觉映射组件 */
    visualMap: {
      textStyle: {
        color: colorMap.font_01
      },
      color: [colorMap.primary1, colorMap.primary2],
      inRange: {
        color: [colorMap.primary2, colorMap.primary1]
      }
    },
    /* 仪表盘 */
    gauge: {
      /* 仪表盘指针样式 */
      itemStyle: {
        color: colorMap.font_03
      },
      title: {
        color: colorMap.font_02
      },
      axisLine: {
        /* 是否显示仪表盘轴线。 */
        lineStyle: {
          /* 设置仪表盘各段的颜色 0.2表示0~20%  */
          color: [[0.2, colorMap.graph16], [0.4, colorMap.graph17], [0.6, colorMap.graph18], [0.8, colorMap.graph19], [1, colorMap.graph20]]
        }
      },
      /* 坐标轴刻度 */
      axisTick: {
        lineStyle: {
          color: colorMap.lineColor
        }
      },
      /* 分隔线样式 */
      splitLine: {
        lineStyle: {
          color: colorMap.lineColor
        }
      },
      /* 详情 */
      detail: {
        color: colorMap.font_01
      },
      /* 仪表盘刻度的分割段数 */
      splitNumber: 10,
      /* 刻度标签的样式 */
      axisLabel: {
        color: colorMap.font_02
      }
    },
    /* 雷达图 */
    radar: {
      /* a b 富文本  */
      textStyle: {
        rich: {
          a: {
            color: colorMap.font_02
          },
          b: {
            color: colorMap.primary1
          }
        }
      },
      /* 各个指示器名称 */
      axisName: {
        color: colorMap.font_02
      },
      axisLine: {
        lineStyle: {
          color: colorMap.border2
        }
      },
      splitLine: {
        lineStyle: {
          color: [colorMap.border1]
        }
      },
      /* 区域分隔线 */
      splitArea: {
        areaStyle: {
          // 设置成颜色数组，分隔线会按数组中颜色的顺序依次循环设置颜色
          color: [colorMap.chartBg, colorMap.radarBg]
        }
      }
    },
    /* 词云 */
    wordCloud: {
      textStyle: {
        emphasis: {
          shadowColor: colorMap.font_02
        }
      }
    },
    /* 散点图 */
    scatter: {
      borderColor: colorMap.border1,
      label: {
        color: colorMap.font_01
      },
      /* 标签的统一布局配置 */
      labelLayout: {
        color: colorMap.font_01
      }
    },
    /* 地理坐标系组件 */
    geo: {
      itemStyle: {
        borderColor: colorMap.font_01,
        emphasis: {
          areaColor: colorMap.warning1 // 鼠标选择区域颜色
        }
      },
      label: {
        // 地图上文字
        show: false,
        fontSize: 12,
        color: colorMap.font_02
      },
      emphasis: {
        // 高亮时不显示标签(省份名称)
        label: {
          show: false,
          color: colorMap.font_01
        }
      }
    }
  };
};
