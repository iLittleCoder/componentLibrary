<template>
  <div class="jy-tabs__active-bar" :class="`is-${ rootTabs.tabPosition }`" :style="barStyle"></div>
</template>
<script>
  import { arrayFind } from 'GildataDesign/src/utils/util';
  export default {
    name: 'TabBar',

    props: {
      tabs: Array
    },

    inject: ['rootTabs'],

    computed: {
      barStyle: {
        get() {
          let style = {};
          let offset = 0;
          let tabSize = 0;
          const sizeName = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'width' : 'height';
          const sizeDir = sizeName === 'width' ? 'x' : 'y';
          const firstUpperCase = str => {
            return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
          };
          this.tabs.every((tab, index) => {
            // 给offset一个初始化高度，高度为父元素的paddingTop
            if (sizeName === 'height' && index === 0) {
              let parent = this.$parent && this.$parent.$refs.nav;
              offset += parent && parseFloat(window.getComputedStyle(parent).paddingTop);
            }
            let $el = arrayFind(this.$parent.$refs.tabs || [], t => t.id.replace('tab-', '') === tab.paneName);
            if (!$el) { return false; }
            tabSize = $el[`client${firstUpperCase(sizeName)}`];
            const tabStyles = window.getComputedStyle($el);
            if (!tab.active) {
              // 水平tabs时
              if (sizeName === 'width') {
                // 当前tab未激活时，offset += 自身的宽度 + 左右外边距的距离
                offset += $el[`client${firstUpperCase(sizeName)}`] + parseFloat(tabStyles.marginLeft) + parseFloat(tabStyles.marginRight);
              } else {
                // 竖直时，offset += 自身的高度 + 上下外边距的距离

                offset += $el[`client${firstUpperCase(sizeName)}`] + parseFloat(tabStyles.marginTop) + parseFloat(tabStyles.marginBottom);
              }
              return true;
            } else {
              if (sizeName === 'width' && this.tabs.length > 0) {
                // 计算高亮的宽度 自身宽度 减去左右内边距的距离
                tabSize -= parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
              }
              if (sizeName === 'width') {
                // 计算偏移量时要加上自身左侧外边距的距离
                offset += parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.marginLeft);
              }
              return false;
            }
          });

          const transform = `translate${firstUpperCase(sizeDir)}(${offset}px)`;
          style[sizeName] = tabSize + 'px';
          style.transform = transform;
          style.msTransform = transform;
          style.webkitTransform = transform;

          return style;
        }
      }
    }
  };
</script>
