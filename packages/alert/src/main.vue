<template>
  <transition name="el-alert-fade">
    <div
      class="jy-alert"
      :class="[
        typeClass,
        center ? 'is-center' : '',
        'is-' + effect,
        !showBackgroundColor ? 'is-hideBgColor' : '',
        showIcon ? 'is-showIcon' : '',
        showTextType ? 'is-showTextType' : '',
        noBorder ? 'is-noBorder' : ''
      ]"
      :style="{ alignItems: alignItems }"
      v-show="visible"
      role="alert"
    >
      <svg v-if="showIcon" class="jy-alert__icon svg-icon" :class="[isBigIcon]" aria-hidden="true">
        <use :xlink:href="'#' + iconClass"></use>
      </svg>
      <div class="jy-alert__content">
        <span class="jy-alert__title" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="jy-alert__description" v-if="$slots.default && !description"><slot></slot></p>
        <p class="jy-alert__description" v-if="description && !$slots.default">{{ description }}</p>
        <span class="jy-alert__closebtn" :class="{ 'is-customed': closeText !== '' }" @click="close()"
          ><span v-if="closeText">{{ closeText }}</span
          ><i v-if="closable" class="Gildata-close"></i
        ></span>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
const TYPE_CLASSES_MAP = {
  primary: 'Gildata-color-notes2',
  success: 'Gildata-color-correct2',
  warning: 'Gildata-color-warning2',
  error: 'Gildata-color-error2',
  info: 'Gildata-color-notes31'
};

const TYPE_Light = {
  primary: 'Gildata-color-notes1',
  success: 'Gildata-color-correct1',
  warning: 'Gildata-color-warning1',
  error: 'Gildata-color-error1',
  info: 'Gildata-color-notes31'
};

export default {
  name: 'JyAlert',

  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ''
    },
    showIcon: Boolean,
    showBackgroundColor: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    effect: {
      type: String,
      default: 'light',
      validator: function(value) {
        return ['light', 'dark'].indexOf(value) !== -1;
      }
    },
    showTextType: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    alignItems: {
      type: String,
      default: 'center'
    },
    // 是否显示浅色图标
    showLightIcon: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: true
    };
  },

  methods: {
    close() {
      this.visible = false;
      this.$emit('close');
    }
  },

  computed: {
    typeClass() {
      return `jy-alert--${this.type}`;
    },

    iconClass() {
      return (this.showLightIcon ? TYPE_Light[this.type] : TYPE_CLASSES_MAP[this.type]) || 'Gildata-color-notes31';
    },

    isBigIcon() {
      return this.description || this.$slots.default ? 'is-big' : '';
    },

    isBoldTitle() {
      return this.description || this.$slots.default ? 'is-bold' : '';
    }
  }
};
</script>
