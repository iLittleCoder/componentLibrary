<template>
  <div ref="root" class="jy-affix" :style="rootStyle">
    <div :class="{ 'jy-affix--fixed': fixed }" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { on, off, getScrollContainer } from 'GildataDesign/src/utils/dom';
import { addResizeListener } from 'GildataDesign/src/utils/resize-event';
export default {
  name: 'JyAffix',
  props: {
    zIndex: {
      type: [Number, String],
      default: 100
    },
    target: {
      type: String,
      default: ''
    },
    offset: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      values: ['top', 'bottom'],
      default: 'top'
    }
  },
  computed: {
    affixStyle() {
      // 通过固钉的状态自动更新固钉的样式
      if (!this.fixed) return {};
      const offset = this.offset ? `${this.offset}px` : 0;
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
        top: this.position === 'top' ? offset : '',
        bottom: this.position === 'bottom' ? offset : '',
        transform: this.transform ? `translateY(${this.transform}px)` : '',
        zIndex: this.zIndex
      };
    },
    rootStyle() {
      return {
        height: this.fixed ? `${this.height}px` : '',
        width: this.fixed ? `${this.width}px` : ''
      };
    }
  },
  watch: {
    // 监测固钉fixed状态变化，并对外emit change事件
    fixed(val) {
      this.$emit('change', val);
    }
  },
  data() {
    return {
      fixed: false,
      height: 0, // height of root
      width: 0, // width of root
      scrollTop: 0, // scrollTop of documentElement
      clientHeight: 0, // clientHeight of documentElement
      transform: 0,
      scrollContainer: null,
      el: null
    };
  },
  mounted() {
    this.init();
    // 根据固钉元素，向上寻找滚动容器
    this.scrollContainer = getScrollContainer(this.$refs.root);

    // 监听滚动容器的scroll事件
    on(this.scrollContainer, 'scroll', this.onScroll);
    // 监听固钉元素的resize事件
    addResizeListener(this.$refs.root, this.updateData);
  },
  beforeDestroy() {
    off(this.scrollContainer, 'scroll', this.onScroll);
  },
  methods: {
    init() {
      this.el = document.documentElement;
      if (this.target) {
        // 根据传入的target确定 target容器
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
      }
    },
    onScroll() {
      // 滚动容器的scroll事件的响应函数
      // 更新固钉状态
      this.updateData();
      this.$emit('scroll', {
        scrollTop: this.scrollTop,
        fixed: this.fixed
      });
    },
    update() {
      this.updateData();
    },
    updateData() {
      if (!this.$refs.root) return;
      // 更新固钉状态函数
      const rootRect = this.$refs.root.getBoundingClientRect();
      const targetRect = this.el.getBoundingClientRect();
      this.height = rootRect.height;
      this.width = rootRect.width;
      this.scrollTop =
        this.scrollContainer === window ? document.documentElement.scrollTop : this.scrollContainer.scrollTop;
      this.clientHeight = document.documentElement.clientHeight;

      if (this.position === 'top') {
        if (this.target) {
          const difference = targetRect.bottom - this.offset - this.height;
          // targetRect.bottom > 0 对应的是让固钉始终保持在容器内，超过范围则隐藏
          this.fixed = this.offset > rootRect.top && targetRect.bottom > 0;
          // 用于处理场景：滚动过程中，target容器可视区域不足以显示整个固钉，则固钉应相应偏移，只展示部分
          this.transform = difference < 0 ? difference : 0;
        } else {
          this.fixed = this.offset > rootRect.top;
        }
      } else {
        if (this.target) {
          const difference = this.clientHeight - targetRect.top - this.offset - this.height;
          this.fixed = this.clientHeight - this.offset < rootRect.bottom && this.clientHeight > targetRect.top;
          this.transform = difference < 0 ? -difference : 0;
        } else {
          this.fixed = this.clientHeight - this.offset < rootRect.bottom;
        }
      }
    }
  }
};
</script>
