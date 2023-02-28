<template>
  <!--transition组件可以给任何元素和组件添加进入/离开过渡-->
  <!--after-enter、after-leave是对应的钩子-->
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <!--包裹dialog的div-->
    <!-- 只当在 event.target 是当前元素自身时触发处理函数, 即点击弹框背景是触发，点击弹框内部元素不会触发 -->
    <div
      v-show="visible"
      class="jy-dialog__wrapper"
      @click.self="handleWrapperClick">
      <!--通过改变key值来销毁div-->
      <div
        role="dialog"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['jy-dialog', { 'is-fullscreen': fullscreen, 'jy-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <!--dialog_header包含：标题、关闭按钮-->
        <div class="jy-dialog__header">
          <!--标题-->
          <slot name="title">
            <span class="jy-dialog__title">{{ title }}</span>
          </slot>
          <!--关闭按钮-->
          <button
            type="button"
            class="jy-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="jy-dialog__close jy-icon Gildata-close"></i>
          </button>
        </div>
        <!--中间的内容-->
        <div class="jy-dialog__body" v-if="rendered"><slot></slot></div>
        <!--底部内容-->
        <div class="jy-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from 'GildataDesign/src/utils/popup';
  import Migrating from 'GildataDesign/src/mixins/migrating';
  import emitter from 'GildataDesign/src/mixins/emitter';

  export default {
    name: 'JyDialog',

    mixins: [Popup, emitter, Migrating],

    props: {
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      // 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: {
        type: String,
        default: '500px'
      },

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },

      destroyOnClose: Boolean
    },

    data() {
      return {
        closed: false, // 内部记录弹框的状态
        key: 0
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
          // 关闭时销毁 Dialog 中的元素
          if (this.destroyOnClose) {
            this.$nextTick(() => {
              this.key++; // 通过改变key值销毁元素
            });
          }
        }
      }
    },

    computed: {
      style() {
        let style = {};
        if (!this.fullscreen) {
          style.marginTop = this.top;
          if (this.width) {
            style.width = this.width;
          }
        }
        return style;
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        // beforeClose关闭前的回调，会暂停 Dialog 的关闭
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('JySelectDropdown', 'updatePopper');
        this.broadcast('JyDropdownMenu', 'updatePopper');
      },
      afterEnter() {
        this.$emit('opened');
      },
      afterLeave() {
        this.$emit('closed');
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        // 用来控制遮罩的打开
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
