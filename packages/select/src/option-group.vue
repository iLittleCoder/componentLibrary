<template>
  <ul class="jy-select-group__wrap" v-show="visible">
    <li class="jy-select-group__title">{{ label }}</li>
    <li>
      <ul class="jy-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from 'GildataDesign/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'JyOptionGroup',

    componentName: 'JyOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('JyOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('JyOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
