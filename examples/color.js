export const tintColor = (c, tint) => {
  const color = c.replace('#', '');
  let red = parseInt(color.slice(0, 2), 16);
  let green = parseInt(color.slice(2, 4), 16);
  let blue = parseInt(color.slice(4, 6), 16);

  if (tint === 0) { // when primary color is in its rgb space
    return [red, green, blue].join(',');
  } else {
    red += Math.round(tint * (255 - red));
    green += Math.round(tint * (255 - green));
    blue += Math.round(tint * (255 - blue));
    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);
    return `#${ red }${ green }${ blue }`;
  }
};

// 颜色混合 规则符合 sass - mix
export const mix = (color_1, color_2, weight) => {
  let c1 = color_1.replace(/#/g, '');
  let c2 = color_2.replace(/#/g, '');
  function d2h(d) { return d.toString(16); } // 将十进制值转换为十六进制
  function h2d(h) { return parseInt(h, 16); } // 将十六进制值转换为十进制
  weight = (typeof (weight) !== 'undefined') ? weight : 50; // 如果省略该参数，则将权重设置为50%

  var color = '#';
  for (var i = 0; i <= 5; i += 2) { // 循环-红，绿，蓝
    let v1 = h2d(c1.substr(i, 2));
    let v2 = h2d(c2.substr(i, 2));
    // 根据指定的权重将来自每个源颜色的当前对组合起来,四舍五入
    let val = d2h(Math.round(v2 + (v1 - v2) * (weight / 100.0)));
    while (val.length < 2) { val = '0' + val; } // 如果val结果是单个数字，则在前面加上一个'0'

    color += val;
  }
  return color;
};

export const hex2rgb = (hex, weight) => {
  // 十六进制颜色值的正则表达式
  var reg = new RegExp('^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$');
  /* 16进制颜色转为RGB格式 */
  let color = hex ? hex.toLowerCase() : hex;
  if (color && reg.test(color)) {
    if (color.length === 4) {
      var colorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    //  处理六位的颜色值
    var colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(window.parseInt('0x' + color.slice(i, i + 2)));
    }

    if (weight) {
      return 'rgba(' + colorChange.join(',') + ',' + weight + ')';
    }

    return colorChange.join(',');
  } else {
    return color;
  }
};
