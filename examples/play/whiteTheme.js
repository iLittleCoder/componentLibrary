export let configure = {
  version: 1,
  themeName: 'White',
  theme: {
    backgroundColor: '#ffffff',
    /* 标题 */
    title: {
      /* 主标题 */
      textStyle: {
        color: '#202020',
        fontSize: 13,
        fontWeight: 500
      },
      /* 副标题 */
      subtextStyle: {
        color: 'rgba(32,32,32,0.65)',
        fontSize: 12
      }
    },
    /* 全局的字体样式 */
    textStyle: {
      color: 'rgba(32,32,32,0.65)',
      'fontSize': 12,
      'fontFamily': 'Source Han Sans CN,Arial,Microsoft Yahei'
    },
    /* 提示框组件 */
    tooltip: {
      borderWidth: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      textStyle: {'fontSize': 12, 'color': 'rgba(32,32,32,0.65)'},
      /* 选中时默认为dotted虚线 */
      axisPointer: {
        lineStyle: {
          color: 'rgba(32,32,32,0.07)',
          type: 'dotted'
        },
        type: 'line',
        z: 10
      },
      confine: true, // 是否将 tooltip 框限制在图表的区域内
      borderRadius: 2,
      extraCssText: 'box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);'
    },
    /* 图例组件 */
    legend: {
      type: 'scroll', // 可滚动翻页的图例。当图例数量较多时可以使用
      pageIconColor: '#202020', // 翻页按钮的颜色
      pageIconSize: 12, // 翻页按钮的大小
      pageTextStyle: { // 图例页信息的文字样式
        color: 'rgba(32,32,32,0.65)',
        height: 10
      },
      /* 图例的尺寸 */
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 24, // 图例每项之间的间隔
      textStyle: {
        color: 'rgba(32,32,32,0.65)',
        fontSize: 12,
        lineHeight: 12,
        height: 16,
        rich: {'a': {'verticalAlign': 'middle'}}, // 富文本
        padding: [4, 0, 0, 0]
      },
      pageIconInactiveColor: 'rgba(32,32,32,0.3)' // 翻页按钮不激活时（即翻页到头时）的颜色
    },
    /* grid 不支持通过JSON定义 */
    // 'grid': {'top': 50, 'left': 25, 'right': 20, 'bottom': 40, 'containLabel': true},
    axisPointer: {'link': {'xAxisIndex': 'all'}},
    /* x轴 */
    xAxis: {
      splitLine: { // 坐标轴在 grid 区域中的分隔线
        lineStyle: {
          color: 'rgba(32,32,32,0.07)'
        }
      }
    },
    animation: true, // 图例翻页是否使用动画
    /* 指示器的文本标签 */
    label: {
      'color': 'rgba(32,32,32,0.65)'
    },
    /* zoom组件 */
    dataZoom: {
      textStyle: {
        color: '#202020'
      },
      height: 20,
      /* dataZoom的边框颜色 */
      borderColor: 'transparent',
      /* dataZoom选择范围时背景色（选框样式） */
      brushStyle: {
        color: '#256DFF'
      },
      /* 两侧缩放手柄的样式配置 */
      handleStyle: {
        color: '#256DFF',
        borderColor: '#256DFF'
      },
      handleSize: 20,
      /* 两侧缩放手柄的图标 */
      handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAANlJREFUOE/tlDFuwkAURN9wg9zBoaZN5zS0qXILIyGRIlSQihQgRbKrdClS5RBwCgrsgpMwaC0MCAUKAw1iu13tvPl/tfPFhZcCL0ocS7wArTp8Q4H5LTLNSmCz455hXAdWaQRvi1STEvjY8RSIzwECszzV879Amw+JNvAUTCT+VivmEoPKdHNnuz8FLJ2ixMMKkKeqjB2AAVZkGh50drTCOxDub3iD3yaE4QvobrNtvtXgweZ1c7a0+dmP4sks1xwSu+hFid8lRjVBpcymX2T6vM6APaeyQ+0aZ/sWJKbyhlAAAAAASUVORK5CYII=',
      /* 移动手柄的尺寸高度(移动手柄在当前已选择区域的最顶部) */
      moveHandleSize: 0,
      fillerColor: '#E5EDFF', // 选中范围的填充颜色
      /* 数据阴影 */
      dataBackground: {
        lineStyle: {
          color: 'transparent'
        },
        areaStyle: {
          color: '#E5EDFF',
          opacity: 1 // 缩放区域未选中区域的填充色，注意默认透明度为0.2
        }
      }
    },
    /* visualMap 地图的视觉映射组件 */
    visualMap: {
      textStyle: {
        color: '#202020'
      },
      color: [
        '#256DFF',
        '#e5edff'
      ],
      inRange: {
        color: [
          '#e5edff',
          '#256DFF'
        ]
      }
    },
    /* 仪表盘 */
    gauge: {
      /* 仪表盘指针样式 */
      itemStyle: {
        color: 'rgba(32,32,32,0.45)'
      },
      title: {
        color: 'rgba(32,32,32,0.65)'
      },
      axisLine: {
        /* 是否显示仪表盘轴线。 */
        lineStyle: {
          /* 设置仪表盘各段的颜色 0.2表示0~20%  */
          color: [
            [
              0.2,
              '#35B55F'
            ],
            [
              0.4,
              '#66D48A'
            ],
            [
              0.6,
              '#FFCA00'
            ],
            [
              0.8,
              '#FF8C00'
            ],
            [
              1,
              '#EE5640'
            ]
          ]
        }
      },
      /* 坐标轴刻度 */
      axisTick: {
        lineStyle: {
          color: '#ffffff'
        }
      },
      /* 分隔线样式 */
      splitLine: {
        lineStyle: {
          color: '#ffffff'
        }
      },
      /* 详情 */
      detail: {
        color: '#202020'
      },
      /* 仪表盘刻度的分割段数 */
      splitNumber: 10,
      /* 刻度标签的样式 */
      axisLabel: {
        color: 'rgba(32,32,32,0.6500)'
      }
    },
    /* 雷达图 */
    'radar': {
      /* a b 富文本  */
      'textStyle': {
        'rich': {
          'a': {
            'color': 'rgba(32,32,32,0.65)'
          },
          'b': {
            'color': '#256DFF'
          }
        }
      },
      /* 各个指示器名称 */
      'axisName': {
        'color': 'rgba(32,32,32,0.65)'
      },
      'axisLine': {
        'lineStyle': {
          'color': 'rgba(32,32,32,0.12)'
        }
      },
      'splitLine': {
        'lineStyle': {
          'color': [
            'rgba(32,32,32,0.07)'
          ]
        }
      },
      /* 区域分隔线 */
      'splitArea': {
        'areaStyle': {
          'color': '#ffffff'
        }
      }
    },
    /* 词云 */
    'wordCloud': {
      'textStyle': {
        'emphasis': {
          'shadowColor': 'rgba(32,32,32,0.65)'
        }
      }
    },
    /* 散点图 */
    'scatter': {
      'borderColor': 'rgba(32,32,32,0.07)',
      'label': {
        'color': '#202020'
      },
      /* 标签的统一布局配置 */
      'labelLayout': {
        'color': '#202020'
      }
    },
    /* 地理坐标系组件 */
    'geo': {
      'itemStyle': {
        'normal': {
          'borderColor': '#202020'
        },
        'emphasis': {
          'areaColor': '#FCCA6A' // 鼠标选择区域颜色
        }
      },
      'label': { // 地图上文字
        'normal': {
          'show': false,
          'fontSize': 12,
          'color': 'rgba(20,20,20,0.65)'
        }
      },
      'emphasis': { // 高亮时不显示标签(省份名称)
        'label': {
          'show': false,
          'color': '#202020'
        }
      }
    }
  }
};
