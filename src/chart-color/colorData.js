export const colorRgba = (sHex, alpha = 1) => {
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
};

const colorData = {
  White: {
    /* dotted分割线颜色 */
    comp_02: colorRgba('#202020', 0.07),
    /* xAxis.axisLine分割线颜色 */
    comp_xAxis: colorRgba('#202020', 0.12),
    /* 字体色 */
    font_01: colorRgba('#202020', 0.65),
    font_light: colorRgba('#202020', 0.45),

    /* 背景色 */
    bg_color: colorRgba('#ffffff', 0.95),
    bg_white_color: '#ffffff',

    font_02: '#202020',
    /* 主色 */
    primary_01: '#256dff',
    zoom_icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAANlJREFUOE/tlDFuwkAURN9wg9zBoaZN5zS0qXILIyGRIlSQihQgRbKrdClS5RBwCgrsgpMwaC0MCAUKAw1iu13tvPl/tfPFhZcCL0ocS7wArTp8Q4H5LTLNSmCz455hXAdWaQRvi1STEvjY8RSIzwECszzV879Amw+JNvAUTCT+VivmEoPKdHNnuz8FLJ2ixMMKkKeqjB2AAVZkGh50drTCOxDub3iD3yaE4QvobrNtvtXgweZ1c7a0+dmP4sks1xwSu+hFid8lRjVBpcymX2T6vM6APaeyQ+0aZ/sWJKbyhlAAAAAASUVORK5CYII='
  },
  Black: {
    /* dotted分割线颜色 */
    comp_02: colorRgba('#E6E6E6', 0.07),
    /* xAxis.axisLine分割线颜色 */
    comp_xAxis: colorRgba('#E6E6E6', 0.12),
    /* 字体色 */
    font_01: colorRgba('#E6E6E6', 0.65),
    font_light: colorRgba('#E6E6E6', 0.45),

    /* 背景色 */
    bg_color: colorRgba('#2B2B2C', 0.95),
    bg_white_color: '#15181A',

    font_02: '#E6E6E6',
    /* 主色 */
    primary_01: '#F5BA63',
    zoom_icon:
      'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAABOUlEQVRoQ+2bMQ6CMBiF37/p6mbi6uwVTJxwdPMgMjNzEN28gYlXcHY1urnqVgPiQAIptJCW+hhJaf/3vvdXQ4oguzbxDG+kUFgCaprfG+wlDwjOGCHGMb1JLu6lLgAmg9VUXfgTY1kI1vEeSm0DE/eVI3IQRPF9+LGswyMPQbRTQdIrRFHg0OmSIAl67gAj6jkgbXkkqLXI8wEk6DkgbXm9EUxW83zx5HQtFdH2vlaBZgAFmjrYllTdeNP1f8+RoKmDJNhw8zE1mBG1dY4RZURtM1S8OezrrRojyogyoo0c4F+1RjZVDOImw03GNDvl59iDpj6yB9mDptlhD3bjHHuQPdhNknr7HeymPPtZKNDeQ7czkKBb/+1XJ0F7D93OQIJu/bdf/R8Ihn4gNvgjzcEfSs/6OODPCj7oa2mWc1BxbQAAAABJRU5ErkJggg=='
  }
};

export const renderColor = (type) => {
  return colorData[type];
};

export const colors = [
  '#81adff',
  '#fcca6a',
  '#ff9e9e',
  '#54D5F0',
  '#FFA380',
  '#79E0B1',
  '#EAAFDC',
  '#90BBE0',
  '#EBCA9D',
  '#BBB6F5'
];

/* 散点图颜色 */
export const scatterColors = [
  '#81adff',
  '#9FE5EF',
  '#78CBEF'
];
