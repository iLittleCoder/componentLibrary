<!--
修改点
1、增加textType 属性，用来控制文字按钮的颜色，增加secondary次要文字 primary / success / warning / danger / info / secondary 只有当type为text时才生效
2、增加secondary 属性，用来显示次要按钮（有边框 无背景）
3、增加no-border 属性，用来显示无边框的按钮（图标按钮、文字+图形按钮）

按钮样式规则
高28  左图标 左边距6  右图标 右边距6   纯文字 8
高22  左图标 左边距4  右图标 右边距4   纯文字 6
高32  左图标 左边距8  右图标 右边距8   纯文字 10
高40  左图标 左边距10 右图标 右边距10  纯文字12
高18  左图标 左边距2  右图标 右边距2   纯文字 4
icon尺寸统一是16px
-->

<template>
  <button
    class="jy-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'jy-button--' + type : '',
      buttonSize ? 'jy-button--' + buttonSize : '',
      buttonText ? 'jy-text-button--' + textType : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-secondary': secondary,
        'is-no-border': noBorder,
        'is-round': round,
        'is-circle': circle,
        'is-left': $slots.left,
        'is-right': $slots.right,
      }
    ]"
  >
    <i class="Gildata-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <slot v-if="!icon" name="left"></slot>
    <span v-if="$slots.default"><slot></slot></span>
    <slot name="right"></slot>
  </button>
</template>
<script>
  export default {
    name: 'JyButton',

    inject: {
      jyForm: {
        default: ''
      },
      jyFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      textType: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'small'
      },
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      secondary: Boolean,
      noBorder: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },

    computed: {
      buttonText() {
        return this.type === 'text' && this.textType;
      },
      _elFormItemSize() {
        return (this.jyFormItem || {}).jyFormItemSize;
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled() {
        return this.$options.propsData.hasOwnProperty('disabled') ? this.disabled : (this.jyForm || {}).disabled;
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
