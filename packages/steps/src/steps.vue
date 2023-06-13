<template>
  <div
    class="gj-steps"
    :class="[
       !simple && 'gj-steps--' + direction,
       simple && 'gj-steps--simple',
       nav && 'gj-steps--nav'
     ]">
      <slot></slot>
  </div>
</template>

<script>
import Migrating from 'GildataDesign/src/mixins/migrating';

export default {
  name: 'GjSteps',

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
