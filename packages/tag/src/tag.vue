<!--修改点
1、type类型默认为primary
3、size 默认值为small
4、去掉hit属性（是否有边框描边），ui设计稿就没有边框
   带边框的情况为，effect="plain"
5、增加leftIcon属性（左侧图标），支持彩色图标、elementUI和聚源的icon
6、增加rightIcon属性（右侧图标），支持彩色图标、elementUI和聚源的icon
7、增加operable属性（可操作的），文字点击有按键效果
-->

<script>
export default {
  name: 'GjTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    leftIcon: String,
    rightIcon: String,
    size: String,
    operable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit('close', event);
    },
    handleClick(event) {
      this.$emit('click', event);
    }
  },
  computed: {
    tagSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },
    showLeftSvg() {
      return this.leftIcon && this.leftIcon.includes('Gildata-color');
    },
    showRightSvg() {
      return (
        !this.closable &&
        this.rightIcon &&
        this.rightIcon.includes('Gildata-color')
      );
    }
  },
  render(h) {
    const {
      type,
      tagSize,
      hit,
      leftIcon,
      rightIcon,
      operable,
      closable
    } = this;
    const classes = [
      'gj-tag',
      type ? `gj-tag--${type}` : '',
      tagSize ? `gj-tag--${tagSize}` : '',
      hit && 'is-hit',
      leftIcon && 'is-leftIcon',
      (closable || rightIcon) && 'is-rightIcon',
      operable && 'is-operable'
    ];
    const tagEl = (
      <span
        class={classes}
        style={{ backgroundColor: this.color }}
        on-click={this.handleClick}
      >
        {this.showLeftSvg && (
          <svg class="icon svg-icon" aria-hidden="true">
            <use xlinkHref={`#${this.leftIcon}`} />
          </svg>
        )}
        {this.leftIcon && !this.showLeftSvg && <i class={this.leftIcon} />}
        {this.$slots.default && <span>{this.$slots.default}</span>}
        {this.closable && (
          <i class="gj-tag__close Gildata-close" on-click={this.handleClose} />
        )}
        {this.showRightSvg && (
          <svg class="icon svg-icon" aria-hidden="true">
            <use xlinkHref={`#${this.rightIcon}`} />
          </svg>
        )}
        {!this.closable && this.rightIcon && !this.showRightSvg && (
          <i class={this.rightIcon} />
        )}
      </span>
    );

    return this.disableTransitions ? (
      tagEl
    ) : (
      <transition name="gj-zoom-in-center">{tagEl}</transition>
    );
  }
};
</script>
