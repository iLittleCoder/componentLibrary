<template>
  <transition name="gj-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="gj-autocomplete-suggestion gj-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region"
    >
      <gj-scrollbar
        tag="ul"
        wrap-class="gj-autocomplete-suggestion__wrap"
        view-class="gj-autocomplete-suggestion__list"
      >
        <li v-if="!parent.hideLoading && parent.loading">
          <i class="Gildata-loading"></i>
        </li>
        <slot v-else> </slot>
      </gj-scrollbar>
    </div>
  </transition>
</template>
<script>
import Popper from 'GildataDesign/src/utils/vue-popper';
import Emitter from 'GildataDesign/src/mixins/emitter';
import GjScrollbar from 'GildataDesign/packages/scrollbar';

export default {
  components: { GjScrollbar },
  mixins: [Popper, Emitter],

  componentName: 'GjAutocompleteSuggestions',

  data() {
    return {
      parent: this.$parent,
      dropdownWidth: ''
    };
  },

  props: {
    options: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    id: String
  },

  methods: {
    select(item) {
      this.dispatch('GjAutocomplete', 'item-click', item);
    }
  },

  updated() {
    this.$nextTick((_) => {
      this.popperJS && this.updatePopper();
    });
  },

  mounted() {
    this.$parent.popperElm = this.popperElm = this.$el;
    this.referenceElm =
      this.$parent.$refs.input.$refs.input ||
      this.$parent.$refs.input.$refs.textarea;
    this.referenceList = this.$el.querySelector(
      '.gj-autocomplete-suggestion__list'
    );
    this.referenceList.setAttribute('role', 'listbox');
    this.referenceList.setAttribute('id', this.id);
  },

  created() {
    this.$on('visible', (val, inputWidth) => {
      this.dropdownWidth = inputWidth + 'px';
      this.showPopper = val;
    });
  }
};
</script>
