<template>
  <div
    class="jy-steps"
    :class="[
       !simple && 'jy-steps--' + direction,
       simple && 'jy-steps--simple',
       nav && 'jy-steps--nav'
     ]">
      <slot></slot>
  </div>
</template>

<script>
import Migrating from 'GildataDesign/src/mixins/migrating';

export default {
  name: 'JySteps',

  mixins: [Migrating],

  props: {
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean,
    simple: Boolean,
    nav: Boolean,
    point: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    }
  },

  data() {
    return {
      steps: [],
      stepOffset: 0
    };
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'center': 'center is removed.'
        }
      };
    }
  },

  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
};
</script>
