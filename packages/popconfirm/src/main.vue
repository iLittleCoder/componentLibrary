<template>
  <gj-popover
    popper-class="gj-popconfirm__popover"
    v-bind="$attrs"
    v-model="visible"
    trigger="click"
  >
  <div class="gj-popconfirm">
    <div class="gj-popconfirm__main">
    <gj-icon
      v-if="!hideIcon"
      :name="icon"
      class="gj-popconfirm__icon"
      :style="{color: iconColor}"
    ></gj-icon>
      {{title}}
    </div>
    <div class="gj-popconfirm__action">
      <gj-button
        size="mini"
        :type="cancelButtonType" 
        @click="cancel"
      >
        {{ displayCancelButtonText }}
      </gj-button>
      <gj-button
        size="mini" 
        :type="confirmButtonType" 
        @click="confirm"
        type="primary"
      >
        {{ displayConfirmButtonText }}
      </gj-button>
    </div>
  </div>
  <slot name="reference" slot="reference"></slot>
</gj-popover>
</template>

<script>
import GjIcon from 'GildataDesign/packages/icon';
import GjPopover from 'GildataDesign/packages/popover';
import GjButton from 'GildataDesign/packages/button';
import {t} from 'GildataDesign/src/locale';

export default {
  name: 'GjPopconfirm',
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
    GjPopover,
    GjButton,
    GjIcon
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
