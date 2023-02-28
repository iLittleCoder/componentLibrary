<template>
  <jy-popover
    popper-class="jy-popconfirm__popover"
    v-bind="$attrs"
    v-model="visible"
    trigger="click"
  >
  <div class="jy-popconfirm">
    <div class="jy-popconfirm__main">
    <jy-icon
      v-if="!hideIcon"
      :name="icon"
      class="jy-popconfirm__icon"
      :style="{color: iconColor}"
    ></jy-icon>
      {{title}}
    </div>
    <div class="jy-popconfirm__action">
      <jy-button
        size="mini"
        :type="cancelButtonType" 
        @click="cancel"
      >
        {{ displayCancelButtonText }}
      </jy-button>
      <jy-button
        size="mini" 
        :type="confirmButtonType" 
        @click="confirm"
        type="primary"
      >
        {{ displayConfirmButtonText }}
      </jy-button>
    </div>
  </div>
  <slot name="reference" slot="reference"></slot>
</jy-popover>
</template>

<script>
import JyIcon from 'GildataDesign/packages/icon';
import JyPopover from 'GildataDesign/packages/popover';
import JyButton from 'GildataDesign/packages/button';
import {t} from 'GildataDesign/src/locale';

export default {
  name: 'JyPopconfirm',
  props: {
    title: {
      type: String
    },
    confirmButtonText: {
      type: String
    },
    cancelButtonText: {
      type: String
    },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancelButtonType: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'Gildata-color-warning2'
    },
    iconColor: {
      type: String,
      default: ''
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    JyPopover,
    JyButton,
    JyIcon
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    displayConfirmButtonText() {
      return this.confirmButtonText || t('el.popconfirm.confirmButtonText');
    },
    displayCancelButtonText() {
      return this.cancelButtonText || t('el.popconfirm.cancelButtonText');
    }
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit('confirm');
    },
    cancel() {
      this.visible = false;
      this.$emit('cancel');
    }
  }
};
</script>
