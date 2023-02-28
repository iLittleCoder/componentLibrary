<script>
export default {
  name: 'JyAvatar',

  props: {
    size: {
      type: [Number, String],
      validator(val) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small', 'smaller', 'mini'].includes(val);
        }
        return typeof val === 'number';
      }
    },
    shape: {
      type: String,
      default: 'circle',
      validator(val) {
        return ['circle', 'square'].includes(val);
      }
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: 'cover'
    },
    backgroundColor: String
  },

  data() {
    return {
      isImageExist: true
    };
  },

  computed: {
    avatarClass() {
      const { size, icon, shape } = this;
      let classList = ['jy-avatar'];

      if (size && typeof size === 'string') {
        classList.push(`jy-avatar--${size}`);
      }

      if (icon) {
        classList.push('jy-avatar--icon');
      }

      if (shape) {
        classList.push(`jy-avatar--${shape}`);
      }

      return classList.join(' ');
    }
  },

  methods: {
    handleError() {
      const { error } = this;
      const errorFlag = error ? error() : false;
      if (errorFlag !== false) {
        this.isImageExist = false;
      }
    },
    renderAvatar() {
      const { icon, src, alt, isImageExist, srcSet, fit } = this;
      if (isImageExist && src) {
        return <img
          src={src}
          onError={this.handleError}
          alt={alt}
          srcSet={srcSet}
          style={{ 'object-fit': fit }}/>;
      }

      // 图片加载失败
      if (!this.isImageExist) {
        return (<i class='Gildata-p-loadfailed' />);
      }

      if (icon) {
        return (<i class={icon} />);
      }

      return this.$slots.default;
    }
  },

  render() {
    const { avatarClass, size, backgroundColor } = this;

    const sizeStyle = typeof size === 'number' ? {
      height: `${size}px`,
      width: `${size}px`,
      lineHeight: `${size}px`
    } : {};

    if (backgroundColor) {
      sizeStyle.backgroundColor = backgroundColor;
    }

    return (
      <span class={ avatarClass } style={ sizeStyle }>
        {
          this.renderAvatar()
        }
      </span>
    );
  }

};
</script>
