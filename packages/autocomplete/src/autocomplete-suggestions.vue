<template>
  <transition name="jy-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="jy-autocomplete-suggestion jy-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region"
    >
      <jy-scrollbar
        tag="ul"
        wrap-class="jy-autocomplete-suggestion__wrap"
        view-class="jy-autocomplete-suggestion__list"
      >
        <li v-if="!parent.hideLoading && parent.loading">
          <i class="Gildata-loading"></i>
        </li>
        <slot v-else> </slot>
      </jy-scrollbar>
    </div>
  </transition>
</template>
<script>
import Popper from 'GildataDesign/src/utils/vue-popper';
import Emitter from 'GildataDesign/src/mixins/emitter';
import JyScrollbar from 'GildataDesign/packages/scrollbar';

export default {
  components: { JyScrollbar },
  mixins: [Popper, Emitter],

  componentName: 'JyAutocompleteSuggestions',

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
      this.dispatch('JyAutocomplete', 'item-click', item);
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
      '.jy-autocomplete-suggestion__list'
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
