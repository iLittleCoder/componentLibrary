<template>
  <transition name="jy-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'jy-message',
        type && !iconClass ? `jy-message--${type}` : '',
        center ? 'is-center' : '',
        description ? 'is-description' : '',
        customClass,
        plain ? 'is-plain' : '',
        !showIcon ? 'is-noIcon' : ''
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert"
    >
      <template v-if="showIcon">
        <i class="jy-message__icon" :class="iconClass" v-if="iconClass"></i>
        <svg v-else-if="typeClass" class="icon svg-icon" aria-hidden="true">
          <use :xlink:href="'#' + typeClass"></use>
        </svg>
      </template>

      <div class="jy-message__box">
        <slot>
          <p v-if="!dangerouslyUseHTMLString" class="jy-message__content">
            {{ message }}
          </p>
          <p v-else v-html="message" class="jy-message__content"></p>
        </slot>
        <div v-if="description" class="jy-message__des">{{ description }}</div>
      </div>
      <div class="jy-message__subtitle" v-if="subtitle || showClose">
        <p v-if="subtitle" @click="clickSubtitle">{{ subtitle }}</p>
        <i
          v-if="showClose"
          class="jy-message__closeBtn Gildata-close"
          @click="close"
        ></i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
let typeMap = {
  // primary: 'notes2', // 对应的图标是蓝色感叹号
  success: 'correct2',
  info: 'notes2', // 对应的图标是蓝色感叹号
  warning: 'warning2',
  error: 'error2'
};

export default {
  data() {
    return {
      visible: false,
      message: '',
      description: '', // 提醒文字描述
      subtitle: '', // 副标题
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      onSubtitle: null, // 增加onSubtitle方法
      showClose: false,
      closed: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false,
      plain: false,
      showIcon: true
    };
  },

  computed: {
    typeClass() {
      const { type, iconClass } = this;
      // return this.type && !this.iconClass ? `el-message__icon el-icon-${ typeMap[this.type] }` : '';
      return type && !iconClass
        ? type && typeMap[type]
          ? `Gildata-color-${typeMap[type]}`
          : ''
        : '';
    },
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`
      };
    }
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },

  methods: {
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    clickSubtitle() {
      this.closed = true;
      if (typeof this.onSubtitle === 'function') {
        this.onSubtitle(this);
      }
    },

    clearTimer() {
      clearTimeout(this.timer);
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
    }
  },
  mounted() {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  }
};
</script>
