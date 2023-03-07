import { colorRgba, formatNumber } from 'GildataDesign/src/utils/util';

export let colors = {
  White: {
    font_01: '#202020',
    font_02: 'rgba(20, 20, 20, 0.65)',
    font_03: 'rgba(20, 20, 20, 0.45)',
    font_04: 'rgba(20, 20, 20, 0.3)',
    border1: 'rgba(32,32,32,0.07)',
    border2: 'rgba(32,32,32,0.12)',
    chartBg: '#ffffff',
    lineColor: '#ffffff',
    tooltipBg: 'rgba(255, 255, 255, 0.95)',
    primary1: '#256DFF',
    primary2: '#e5edff',
    warning1: '#FCCA6A',
    graph1: '#81adff',
    graph2: '#fcca6a',
    graph3: '#ff9e9e',
    graph4: '#54D5F0',
    graph5: '#FFA380',
    graph6: '#79E0B1',
    graph7: '#EAAFDC',
    graph8: '#90BBE0',
    graph9: '#EBCA9D',
    graph10: '#BBB6F5',
    graph11: '#97BBFF',
    graph12: '#ACC9FF',
    graph13: '#C1D6FF',
    graph14: '#D6E4FF',
    graph15: '#E7EFFF',
    graph16: '#35B55F',
    graph17: '#66D48A',
    graph18: '#FFCA00',
    graph19: '#FF8C00',
    graph20: '#EE5640',
    pieBorderColor: '#fff',
    radarBg: '#F7F9FC'
  },
  Black: {
    font_01: '#E6E6E6',
    font_02: 'rgba(230, 230, 230, 0.65)',
    font_03: 'rgba(230, 230, 230, 0.45)',
    font_04: 'rgba(230, 230, 230, 0.3)',
    border1: 'rgba(230,230,230,0.07)',
    border2: 'rgba(230,230,230,0.12)',
    chartBg: '#15181A',
    lineColor: '#15181A',
    tooltipBg: 'rgba(43,43,44,0.95)',
    primary1: '#F5BA63',
    primary2: '#3d2f19',
    warning1: '#FCCA6A',
    graph1: '#81adff',
    graph2: '#fcca6a',
    graph3: '#ff9e9e',
    graph4: '#54D5F0',
    graph5: '#FFA380',
    graph6: '#79E0B1',
    graph7: '#EAAFDC',
    graph8: '#90BBE0',
    graph9: '#EBCA9D',
    graph10: '#BBB6F5',
    graph11: '#7196DC',
    graph12: '#5B78AF',
    graph13: '#405375',
    graph14: '#2F3C53',
    graph15: '#1F2631',
    graph16: '#35B55F',
    graph17: '#66D48A',
    graph18: '#FFCA00',
    graph19: '#FF8C00',
    graph20: '#EE5640',
    pieBorderColor: '#15181A',
    radarBg: '#1B1D1F'
  }
};

/**
 * 定义柱状图的基本配置
 * */
export let barOption = (colorMap) => {
  return {
    legend: {
      bottom: 0
    },
    color: [
      colorMap.graph1,
      colorMap.graph2,
      colorMap.graph3,
      colorMap.graph4,
      colorMap.graph5,
      colorMap.graph6,
      colorMap.graph7,
      colorMap.graph8,
      colorMap.graph9,
      colorMap.graph10
    ],
    grid: { top: 40, left: 5, right: 0, bottom: 0, containLabel: true },
    xAxis: {
      axisLine: {
        // 去掉x轴的轴线
        show: true
      },
      axisTick: {
        // 去掉x轴的刻度线
        show: false
      },
      splitLine: {
        // Y轴方向的分割线
        show: false
      }
    },
    yAxis: {
      axisTick: {
        // y轴 刻度线
        show: false
      },
      splitLine: {
        // x轴方面的分割线
        show: true,
        type: 'value'
      },
      nameTextStyle: {
        padding: [0, 0, 0, 0]
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      padding: [10, 12, 6, 12],
      formatter: (params) => {
        let returnData = '';
        if (params && Array.isArray(params) && params.length > 0) {
          returnData =
            `<span style="display:inline-block; margin-bottom:5px; color: ${colorMap.font_01}">` +
            params[0].axisValueLabel +
            '</span>' +
            '<br/>';
        }
        for (let i = 0; i < params.length; i++) {
          if (params[i].seriesName !== '') {
            let indexColor = params[i].color;
            returnData +=
              '<span style="display:inline-block; border-radius:2px;width:10px; height:10px;background:' +
              indexColor +
              '"></span>';
            returnData +=
              `<span style="display:inline-block; margin-bottom:5px; margin-left:8px; color: ${
                colorMap.font_02
              }">` +
              params[i].seriesName +
              '</span>' +
              ':' +
              `<span style="display:inline-block; margin-bottom:5px; margin-left:8px; font-weight:500;color: ${
                colorMap.font_01
              }">` +
              (formatNumber(params[i].value) || '--') +
              '</span></br>';
          }
        }
        return returnData;
      }
    }
  };
};

/**
 * 定义柱状图的series配置
 * */
export let barSeries = {
  type: 'bar',
  itemStyle: { borderRadius: [2, 2, 0, 0] },
  barMaxWidth: 16,
  barMinWidth: 1,
  connectNulls: true,
  smooth: false
};

/**
 * 定义折线图的基本配置
 * */
export let lineOption = (colorMap) => {
  return {
    legend: {
      bottom: 0
      // itemStyle: {
      //   color: colorMap.lineColor
      // }
    },
    color: [
      colorMap.graph1,
      colorMap.graph2,
      colorMap.graph3,
      colorMap.graph4,
      colorMap.graph5,
      colorMap.graph6,
      colorMap.graph7,
      colorMap.graph8,
      colorMap.graph9,
      colorMap.graph10
    ],
    grid: { top: 40, left: 5, right: 0, bottom: 0, containLabel: true },
    xAxis: {
      show: true,
      splitLine: {
        show: false
      },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      min: null,
      type: 'value',
      splitLine: {
        show: true
      },
      nameTextStyle: {
        padding: [0, 0, 0, 0]
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      padding: [10, 12, 6, 12],
      formatter: (params) => {
        let returnData = '';
        if (params && Array.isArray(params) && params.length > 0) {
          returnData =
            `<span style="display:inline-block; margin-bottom:5px; color: ${colorMap.font_01}">` +
            params[0].axisValueLabel +
            '</span>' +
            '<br/>';
        }
        for (let i = 0; i < params.length; i++) {
          if (params[i].seriesName !== '') {
            let indexColor = params[i].color;
            returnData +=
              '<span style="display:inline-block; margin-right:5px;border-radius:2px;width:10px;height:10px;background:' +
              indexColor +
              '"></span>';
            returnData +=
              `<span style="display:inline-block; margin-bottom:5px; color: ${colorMap.font_02}">` +
              params[i].seriesName +
              '</span>' +
              ':' +
              `<span style="display:inline-block; margin-bottom:5px; margin-left:8px;font-weight:500;color: ${
                colorMap.font_01
              }">` +
              (formatNumber(params[i].value) || '--') +
              '</span></br>';
          }
        }
        return returnData;
      }
    }
  };
};

/**
 * 设置折线图的series式
 * @param key 对应的下标
 * */
export function lineSeries(key, colorMap) {
  return {
    type: 'line',
    connectNulls: true,
    smooth: false,
    itemStyle: {
      borderRadius: 2,
      emphasis: {
        // 定义hover圆点颜色
        color: lineOption(colorMap).color[key]
      }
    },
    // 设置折线的粗细
    lineStyle: { width: 1.5 },
    // 默认值为2，必须设置
    emphasis: { lineStyle: { width: 1.5 } }
  };
}

/**
 * 设置面积图的样式（设置areaStyle，但未设置color,使用默认的颜色，否则使用外部自定义的颜色）
 * @param item 是否设置areaStyle属性则为面积图
 * @param key 对应的下标
 * */
export function lineAreaStyle(item, key, colorMap) {
  if (item.areaStyle) {
    // 不显示折线上的圆点
    item.showSymbol = false;
    // 未设置color 统一使用默认的颜色
    if (!item.areaStyle.color) {
      item.areaStyle.color = colorRgba(lineOption(colorMap).color[key], 0.25);
    }
    return item;
  } else {
    return item;
  }
}

/**
 * 饼图的基本配置
 * */
export let preOption = (colorMap) => {
  return {
    color: [
      colorMap.graph1,
      colorMap.graph2,
      colorMap.graph3,
      colorMap.graph4,
      colorMap.graph5,
      colorMap.graph6,
      colorMap.graph7,
      colorMap.graph8,
      colorMap.graph9,
      colorMap.graph10
    ],
    tooltip: {
      trigger: 'item', // 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
      formatter: (params) => {
        return (
          `<span style="margin-right: 8px; color: ${colorMap.font_02}">${params.data.name}</span>` +
          `<span style="font-weight:500; color: ${colorMap.font_01};">${params.data.value}</span>`
        );
      }
    }
  };
};

/**
 * 饼图的基本配置
 * */
export function preSeries(chartWidth, colorMap) {
  return {
    avoidLabelOverlap: true, // 是否启用防止标签重叠策略
    label: {
      // 饼图图形上的文本标签
      minMargin: 5,
      lineHeight: 12,
      formatter: '{b}({d}%)',
      padding: [0, 0, 20, 0],
      position: 'outside',
      rich: { time: { fontSize: 12, color: colorMap.font_02 } },
      color: colorMap.font_02,
      textStyle: { fontSize: 12 }
    },
    // 标签的视觉引导线配置
    labelLine: { length: 15, length2: 0, maxSurfaceAngle: 80 },
    radius: ['35%', '45%'],
    type: 'pie',
    center: ['50%', '50%'],
    itemStyle: { borderColor: colorMap.pieBorderColor, borderWidth: 1 },
    /* 自定义视觉引导线 */
    labelLayout: (params) => {
      const isLeft = params.labelRect.x < chartWidth / 2;
      const points = params.labelLinePoints;
      points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
      return {
        labelLinePoints: points
      };
    }
  };
}

/**
 * 散点图和气泡图的基本配置
 * colorMap 主题色
 * type 当前图形的类型
 * */
export let scatterOption = (colorMap, type) => {
  return {
    grid: { top: 40, left: 5, right: 0, bottom: 0, containLabel: true },
    color: [colorMap.graph1, colorMap.graph6, colorMap.graph4, colorMap.graph8, colorMap.graph10],
    legend: {
      bottom: 0,
      itemGap: 24 // 图例每项之间的间隔
    },
    xAxis: {
      axisLine: {
        // 是否显示坐标轴轴线
        show: true
      },
      axisTick: { show: false }, // 刻度线
      axisLabel: { show: true },
      splitLine: {
        // 坐标轴在 grid 区域中的分隔线
        show: true
      }
    },
    yAxis: {
      axisLine: { show: true },
      splitLine: { show: true },
      axisTick: { show: false }, // 刻度线
      nameTextStyle: { padding: [0, 0, 0, 0] }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        let returnData = '';
        if (params && Array.isArray(params) && params.length > 0) {
          returnData =
            `<span style="display:inline-block; margin-bottom:5px; color: ${colorMap.font_01};">` +
            params[0].axisValueLabel +
            '</span>' +
            '<br/>';
        }
        for (let i = 0; i < params.length; i++) {
          if (params[i].seriesName !== '') {
            // 注意: 如果是气泡图 这里用的是borderColor"#81ADFF", 因为color带透明度 "rgba(129, 173, 255, 0.12)"
            // 如果是散点图，indexColor取color，因为散点图设置了白色的边框，如果是气泡图，indexColor取borderColor
            let indexColor = type === 'scatter' ? params[i].color : params[i].borderColor;
            returnData +=
              '<span style="display:inline-block; border-radius: 50%; margin-right:5px; width:10px;height:10px;background:' +
              indexColor +
              '"></span>';
            returnData +=
              `<span style="display:inline-block; margin-bottom:5px; color: ${colorMap.font_02}">` +
              params[i].seriesName +
              '</span>' +
              ':' +
              `<span style="display:inline-block; margin-bottom:5px; margin-left:8px;font-weight:500;color: ${
                colorMap.font_01
              };">` +
              (params[i].value[1] || '--') +
              '</span></br>'; // params[i].value[1] 只显示Y轴上的数据
          }
        }
        return returnData;
      }
    }
  };
};

/**
 * 散点图的series配置
 * */
export let scatterSeries = (colorMap) => {
  return {
    type: 'scatter',
    // 设置圆点的大小
    symbolSize: 10,
    itemStyle: {
      borderColor: colorMap.lineColor,
      borderWidth: 1
    }
  };
};

/**
 * 气泡图的series配置
 * */
export function bubbleSeries(key, colorMap) {
  return {
    type: 'scatter',
    itemStyle: {
      color: () => colorRgba(scatterOption(colorMap).color[key], 0.12), // 要用函数返回，否则legend的颜色也会变成rgba(129, 173, 255, 0.12)
      borderColor: scatterOption(colorMap).color[key],
      borderWidth: 1
    }
  };
}

/**
 * 仪表盘的基本配置
 * */
export let gaugeOption = (colorMap) => {
  return {
    tooltip: {
      borderWidth: 0,
      backgroundColor: colorMap.tooltipBg,
      borderRadius: 2,
      extraCssText: 'box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);',
      formatter: (params) => {
        return (
          `<span style="margin-right: 8px; color: ${colorMap.font_02}">${params.name}</span>` +
          `<span style="font-weight:500; color: ${colorMap.font_01};">${params.data.value}%</span>`
        );
      }
    }
  };
};

/**
 * 仪表盘的series配置
 * */
export let gaugeSeries = (colorMap) => {
  return {
    type: 'gauge',
    min: 0,
    max: 100, // 最大值
    progress: {
      // 进度的宽度
      show: true,
      width: 12
    },
    axisLabel: {
      // 刻度标签
      show: true,
      distance: 20,
      formatter: (value) => (value > 0 ? `${value}%` : value) // 加上单位
    },
    axisLine: {
      lineStyle: {
        width: 12
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      // 仪表盘上分隔线样式
      distance: -12,
      length: 12,
      lineStyle: {
        // color: '#ffffff',
        color: colorMap.lineColor,
        width: 2
      }
    },
    pointer: {
      // 是否显示指针
      length: '50%',
      width: 4, // 设置指针宽度 可以去掉指针尾部的尖角
      itemStyle: {
        color: colorMap.font_03
      }
    },
    anchor: {
      // 指针下面圆圈的样式
      show: true,
      showAbove: true,
      size: 16,
      itemStyle: {
        borderWidth: 3,
        borderColor: colorMap.font_03
      }
    },
    center: ['50%', '60%'], // 仪表盘的位置
    radius: '80%', // 仪表盘半径
    detail: {
      valueAnimation: true,
      rich: {
        value: {
          fontSize: 24,
          fontWeight: 500,
          color: colorMap.font_01
        },
        unit: {
          fontSize: 14,
          color: colorMap.font_02,
          padding: [0, 0, -8, 2]
        }
      }
    },
    title: {
      fontSize: 12,
      color: colorMap.font_03
    }
  };
};

/**
 * 雷达的基本配置
 * */
export let radarOption = (colorMap, indicator) => {
  let obj = {
    color: [
      colorMap.graph1,
      colorMap.graph2,
      colorMap.graph3,
      colorMap.graph4,
      colorMap.graph5,
      colorMap.graph6,
      colorMap.graph7,
      colorMap.graph8,
      colorMap.graph9,
      colorMap.graph10
    ],
    legend: {
      bottom: 0,
      icon: 'circle'
    },
    splitNumber: 4,
    // 区域分隔
    splitArea: {
      show: true
    },
    radar: {
      radius: '65%', // 显示的区域大小
      indicator: []
    },
    series: [
      {
        type: 'radar',
        lineStyle: {
          // 设置连接线的宽度
          width: 1.5
        }
      }
    ]
  };
  // 判断是否传递indicator
  if (indicator) {
    obj.tooltip = {
      trigger: 'item',
      formatter: ({ name, color, value }) => {
        let returnData = '';
        if (name) {
          returnData +=
            '<span style="display:inline-block; border-radius: 50%; margin-right:5px; width:10px;height:10px;background:' +
            color +
            '"></span>';
          returnData +=
            `<span style="display:inline-block; margin-bottom:5px; background: ${color}  color: ${
              colorMap.font_01
            };">` +
            name +
            '</span>' +
            '<br/>';
        }
        for (let i = 0; i < value.length; i++) {
          returnData +=
            `<span style="display:inline-block; margin-bottom:5px; color: ${colorMap.font_02}">` +
            indicator[i].name +
            '</span>' +
            ':' +
            `<span style="display:inline-block; margin-bottom:5px; margin-left: 8px;font-weight:500;color: ${
              colorMap.font_01
            };">` +
            (formatNumber(value[i]) || '--') +
            '</span></br>';
        }
        return returnData;
      }
    };
  } else {
    // 用系统默认的
    obj.tooltip = {
      trigger: 'item'
    };
  }
  return obj;
};

/**
 * 雷达的series配置
 * */
export function radarSeries(key, colorMap) {
  return {
    areaStyle: {
      // 分割区域的颜色
      color: colorRgba(radarOption(colorMap).color[key], 0.12)
    }
  };
}

/**
 * 中国地图的基本配置
 * */
export let chinaOption = (colorMap) => {
  return {
    tooltip: {
      trigger: 'item'
    },
    // 配置右侧可拖拽的柱状条
    visualMap: {
      right: '5%',
      bottom: '10%',
      itemWidth: 10,
      itemHeight: 70,
      min: 0,
      max: 100000,
      calculable: true, // 是否显示拖拽用的手柄
      text: ['高', '低'], // 取值范围的文字
      splitNumber: 6, // 默认分割段数
      color: [
        colorMap.graph1,
        colorMap.graph11,
        colorMap.graph12,
        colorMap.graph13,
        colorMap.graph14,
        colorMap.graph15
      ],
      textStyle: {
        color: colorMap.font_01,
        fontSize: 12,
        lineHeight: 18
      }
    },
    geo: {
      map: 'china',
      roam: true, // 开启缩放和平移
      zoom: 1, // 视角缩放比例
      scaleLimit: {
        min: 1,
        max: 2
      },
      label: {
        // 地图上文字
        show: false,
        fontSize: 12,
        color: colorMap.font_02
      },
      itemStyle: {
        borderColor: colorMap.font_01
      },
      select: {
        itemStyle: {
          areaColor: colorMap.graph2 // 选中的区域颜色
        },
        label: {
          // 选中时不显示省份名
          show: false,
          color: colorMap.font_01
        }
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
