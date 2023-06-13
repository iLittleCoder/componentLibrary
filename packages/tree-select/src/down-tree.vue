<template>
  <div
    class="gj-tree-select-dropdown gj-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }"
  >
    <gj-scrollbar
      tag="ul"
      wrap-class="gj-tree-select-dropdown__wrap"
      view-class="gj-tree-select-dropdown__list"
      ref="scrollbar"
      :class="{
        'is-empty': !$parent.allowCreate && $parent.query && $parent.filteredOptionsCount === 0
      }"
      v-show="allTreeData.length > 0 && !$parent.loading"
    >
      <div
        class="gj-tree-select-dropdown-tree scroll-bar"
        :class="['gj-tree-select-dropdown-tree--' + ($parent.size ? $parent.size : 'small')]"
      >
        <!-- @check-change="handleCheckChange" -->

        <Tree
          ref="tree"
          default-expand-all
          :show-checkbox="multiple"
          :data="allTreeData"
          :filter-node-method="filterNode"
          :node-key="nodeKey"
          :props="defaultProps"
          :check-strictly="checkStrictly"
          :default-checked-keys="defaultCheckedKeys"
          @node-click="handleNodeClick"
          @check="handleCheck"
        />
      </div>
    </gj-scrollbar>
  </div>
</template>

<script type="text/babel">
import Popper from 'GildataDesign/src/utils/vue-popper';
import Emitter from 'GildataDesign/src/mixins/emitter';
import GjScrollbar from 'GildataDesign/packages/scrollbar';
import Tree from 'GildataDesign/packages/tree';
import { treeToData } from './tree-to-data.js';
export default {
  name: 'GjDownTree',

  componentName: 'GjDownTree',
  components: {
    Tree,
    GjScrollbar
  },

  mixins: [Popper, Emitter],

  inject: ['select'],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },

    visibleArrow: {
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      minWidth: '',
      treeData: []
    };
  },

  computed: {
    popperClass() {
      return this.$parent.popperClass;
    },
    allTreeData() {
      return this.$parent.treeData;
    },
    multiple() {
      return this.$parent.multiple;
    },
    filterable() {
      return this.$parent.filterable;
    },
    nodeKey() {
      return this.$parent.nodeKey;
    },
    defaultProps() {
      return this.$parent.defaultProps;
    },
    currentValue() {
      return this.select.value;
    },
    currentLabel() {
      return this.select.selectedLabel;
    },
    defaultCheckedKeys() {
      if (this.select.value && this.multiple) {
        return this.select.value;
      } else {
        return [];
      }
    },
    checkStrictly() {
      return this.$parent.checkStrictly;
    }
  },

  watch: {
    '$parent.inputWidth'() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    },
    currentValue: {
      handler: function(value) {
        if (this.multiple && value.length > 0) {
          this.$refs.tree.setCheckedKeys(value);
        }
      },
      deep: true
    },
    currentLabel: {
      handler: function(value) {
        let data = treeToData(this.allTreeData, this.defaultProps.children).filter(
          (item) => item[this.nodeKey] === this.currentValue
        );
        this.$refs.tree.setCurrentNode(data[0]);
      },
      deep: true
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper();
    });
    this.$on('destroyPopper', this.destroyPopper);
    this.$on('setTreeData', this.getTreeData);
  },
  methods: {
    filterNode(value, data) {
      if (this.filterable) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      } else {
        return true;
      }
    },

    getTreeData(value) {
      this.$refs.tree.filter(value);
    },
    handleNodeClick(data) {
      if (data.disabled || this.multiple) return;
      this.dispatch('GjTreeSelect', 'handleTreeSelected', data);
    },
    handleCheckChange(obj, selected, node) {
      console.log('handleCheckChange', obj, selected, node);
    },
    handleCheck(node, selected) {
      this.dispatch('GjTreeSelect', 'handleTreeSelected', [selected.checkedNodes]);
    }
  }
};
</script>
