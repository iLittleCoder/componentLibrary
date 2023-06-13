<template>
  <ul class="gj-select-group__wrap" v-show="visible">
    <li class="gj-select-group__title">{{ label }}</li>
    <li>
      <ul class="gj-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from 'GildataDesign/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'GjOptionGroup',

    componentName: 'GjOptionGroup',

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
        this.broadcast('GjOption', 'handleGroupDisabled', val);
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
        this.broadcast('GjOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
