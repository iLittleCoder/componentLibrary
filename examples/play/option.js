let init = {
  type: 'gauge',
  min: 0,
  max: 100, // 最大值
  progress: { // 进度的宽度
    show: true,
    width: 12
  },
  axisLine: {
    lineStyle: {
      width: 12
    }
  },
  axisTick: {
    show: false
  },
  splitLine: { // 仪表盘上分隔线样式
    distance: -12,
    length: 12,
    lineStyle: {
      color: '#ffffff',
      width: 2
    }
  },
  pointer: { // 是否显示指针
    length: '50%',
    width: 4, // 设置指针宽度 可以去掉指针尾部的尖角
    itemStyle: {
      color: 'rgba(20, 20, 20, 0.45)'
    }
  },
  anchor: { // 指针下面圆圈的样式
    show: false,
    showAbove: true,
    size: 16,
    itemStyle: {
      borderWidth: 3,
      borderColor: 'rgba(20, 20, 20, 0.45)'
    }
  },
  center: ['50%', '60%'], // 仪表盘的位置
  radius: '60%', // 仪表盘半径
  detail: {
    valueAnimation: true,
    rich: {
      value: {
        fontSize: 24,
        fontWeight: 500,
        color: '#202020'
      },
      unit: {
        fontSize: 14,
        color: 'rgba(20, 20, 20, 0.65)',
        padding: [0, 0, -8, 2]
      }
    }
  },
  title: {
    fontSize: 12,
    color: 'rgba(32,32,32,0.4500)'
  }
}

let obj = {

  series: [
    {
      tooltip: {
        position: "right",
        formatter(params) {
          console.log(params, 'params');
          return `风险评分百分比:${params.data.value}%`;
        }
      },
      startAngle: 180, // 起始角度
      endAngle: 0, // 结束角度
      splitNumber: 1, // 分割段数
      splitLine: {
        show: false
      },
      pointer: { // 是否显示指针
        show: false
      },
      axisLabel: { // 刻度标签
        show: true,
        distance: -20,
        padding: [0, 10, 0, -10], // 通过padding可设置0和100%的位置
        // 通过换行让数字处于底部
        formatter: value => value > 0 ? `

              ${value}%` : `

              0` // 加上单位
      },
      detail: { // 仪表盘详情，用于显示数据
        offsetCenter: [0, -10], // 数据偏移量
        formatter: function (value) {
          return '{value|' + value.toFixed(0) + '}{unit|%}'; // 添加单位
        }
      },
      title: {
        offsetCenter: [0, 10] // 设置完成进度的位置
      },
      data: [
        {
          value: 87,
          name: '完成进度',
          itemStyle: { // 设置基础仪表盘的颜色
            color: '#81ADFF'
          }
        }
      ]
    }
  ]
}
let val = merge(init, obj.series[0])
obj.series[0] = val
