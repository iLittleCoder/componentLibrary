<template>
  <div
    class="jy-tree-node"
    @contextmenu="($event) => this.handleContextMenu($event)"
    v-show="node.visible"
    :class="{
      'is-expanded': expanded,
      'is-current': tree.store.currentNode === node,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.draggable"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
    ref="node"
  >
    <div
      class="jy-tree-node__content"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click.stop="handleClick('single', $event)"
      @dblclick.stop="handleClick('double', $event)"
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 4 + 'px' }"
      :class="{
        'is-rightIcon': tree.draggable || tree.iconRightClass,
        'is-disabled': !!node.disabled
      }"
    >
      <span
        v-if="tree.iconClassPosition === 'left'"
        class="jy-tree-node__expand-icon Gildata-s-rightarrow"
        @click.stop="handleExpandIconClick"
        :class="[
          {
            'is-leaf': node.isLeaf,
            expanded: !node.isLeaf && expanded
          },
          tree.iconClass ? tree.iconClass : 'Gildata-s-rightarrow'
        ]"
      >
      </span>
      <i
        v-if="tree.iconLeftClass"
        class="jy-tree-custom-leftIcon "
        :class="[tree.iconLeftClass ? tree.iconLeftClass : '']"
      >
      </i>
      <jy-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.native.stop
        @change="handleCheckChange"
      >
      </jy-checkbox>
      <span
        v-if="node.loading"
        class="jy-tree-node__loading-icon Gildata-loading"
      >
      </span>
      <node-content :node="node"></node-content>
      <span
        v-if="tree.iconClassPosition === 'right'"
        class="jy-tree-node__expand-icon el-icon-caret-right"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }"
      >
      </span>
      <!-- 可拖拽默认存在右侧图标 并且选中的情况下或hover状态时 才显示 -->
      <i
        v-if="tree.draggable && (tree.store.currentNode === node || isHover)"
        class="jy-tree-custom-rightIcon"
        :class="[tree.iconRightClass ? tree.iconRightClass : 'Gildata-drag2']"
      >
      </i>
      <!-- 存在右侧图标 并且选中的情况下或hover状态时 才显示 -->
      <i
        v-show="
          tree.iconRightClass && (tree.store.currentNode === node || isHover)
        "
        class="jy-tree-custom-rightIcon"
        :class="[tree.iconRightClass ? tree.iconRightClass : '']"
      >
      </i>
    </div>
    <jy-collapse-transition>
      <div
        class="jy-tree-node__children"
        v-if="!renderAfterExpand || childNodeRendered"
        v-show="expanded"
        role="group"
        :aria-expanded="expanded"
      >
        <jy-tree-node
          :render-content="renderContent"
          v-for="child in node.childNodes"
          :render-after-expand="renderAfterExpand"
          :key="child.id"
          :node="child"
          :dbclick="dbclick"
          :multKey="multKey"
          :nodeDoubleClick="nodeDoubleClick"
          @node-expand="handleChildNodeExpand"
        >
        </jy-tree-node>
      </div>
    </jy-collapse-transition>
  </div>
</template>

<script type="text/jsx">
import JyCollapseTransition from 'GildataDesign/src/transitions/collapse-transition';
import JyCheckbox from 'GildataDesign/packages/checkbox';
import emitter from 'GildataDesign/src/mixins/emitter';
import { getNodeKey, sleep } from './model/util';

export default {
  name: 'JyTreeNode',
  componentName: 'JyTreeNode',
  mixins: [emitter],
  props: {
    node: {
      default() {
        return {}
      },
    },
    multKey: {
      type: Boolean,
      default: false,
    },
    dbclick: {
      type: Boolean,
      default: false,
    },
    nodeDoubleClick: {
      type: Boolean,
      default: false,
    },
    props: {},
    renderContent: Function,
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
  },
  components: {
    JyCollapseTransition,
    JyCheckbox,
    NodeContent: {
      props: {
        node: {
          required: true
        },
      },
      render(h) {
        const parent = this.$parent
        const tree = parent.tree
        const node = this.node
        const { data, store } = node
        return parent.renderContent ? (
          parent.renderContent.call(parent._renderProxy, h, {
            _self: tree.$vnode.context,
            node,
            data,
            store
          })
        ) : tree.$scopedSlots.default ? (
          tree.$scopedSlots.default({ node, data })
        ) : (
          <span class="jy-tree-node__label">{node.label}</span>
        )
      }
    }
  },
  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      showCheckbox: false,
      oldChecked: null,
      oldIndeterminate: null,
      clickCount: 0,
      isHover: false // 当前元素是否处于hover状态
    }
  },

  watch: {
    'node.indeterminate'(val) {
      this.handleSelectChange(this.node.checked, val);
    },

    'node.checked'(val) {
      this.handleSelectChange(val, this.node.indeterminate);
    },

    'node.expanded'(val) {
      this.$nextTick(() => (this.expanded = val));
      if (val) {
        this.childNodeRendered = true;
      }
    },
  },

  methods: {
    onMouseEnter() {
      this.isHover = true;
    },
    onMouseLeave() {
      this.isHover = false;
    },
    getNodeKey(node) {
      return getNodeKey(this.tree.nodeKey, node.data);
    },

    handleSelectChange(checked, indeterminate) {
      if (
        this.oldChecked !== checked && this.oldIndeterminate !== indeterminate
      ) {
        this.tree.$emit('check-change', this.node.data, checked, indeterminate);
      }
      this.oldChecked = checked;
      this.indeterminate = indeterminate;
    },

    handleClick(bool, event) {
      if(this.node.disabled){
        return false
      }
      const store = this.tree.store;
      store.setCurrentNode(this.node);
      this.tree.$emit(
        'current-change',
        store.currentNode ? store.currentNode.data : null,
        store.currentNode
      );
      this.tree.currentNode = this;
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick();
      }
      if (this.tree.checkOnClickNode && !this.node.disabled) {
        this.handleCheckChange(null, {
          target: { checked: !this.node.checked }
        })
      }
      // 支持快捷键
      if (this.multKey && this.node.data.leaf) {
        this.tree.$emit('multKeyFunc', this.node.data, this.node, event);
        // 延时操作，分别处理单击和双击
        // 如果是双击的话，会3次执行此处，1次执行‘node-click’
        sleep(50).then(() => {
          // 子节点双击事件
          if (this.nodeDoubleClick && bool == 'double' && this.node.data.isleaf) {
            this.tree.$emit('node-doubleClick', this.node.data, this.node, this);
            return
          }
          if (bool !== 'double' && this.dbclick) {
            this.tree.$emit('double-singleClick', this.node.data, this.node, this);
            return
          }
          this.tree.$emit('node-click', this.node.data, this.node, this, event);
        });
      } else {
        // 子节点双击事件
        if (this.nodeDoubleClick && bool == 'double' && this.node.data.isleaf) {
          this.tree.$emit('node-doubleClick', this.node.data, this.node, this);
          return
        }
        if (bool !== 'double' && this.dbclick) {
          this.tree.$emit('double-singleClick', this.node.data, this.node, this);
          return
        }
        this.tree.$emit('node-click', this.node.data, this.node, this, event);
      }
    },

    handleContextMenu(event) {
      if (
        this.tree._events['node-contextmenu'] &&
        this.tree._events['node-contextmenu'].length > 0
      ) {
        event.stopPropagation();
        event.preventDefault();
      }
      this.tree.$emit(
        'node-contextmenu',
        event,
        this.node.data,
        this.node,
        this
      );
    },

    handleExpandIconClick() {
      if (this.node.isLeaf) return
      if (this.expanded) {
        this.tree.$emit('node-collapse', this.node.data, this.node, this);
        this.node.collapse();
      } else {
        this.node.expand();
        this.$emit('node-expand', this.node.data, this.node, this);
      }
    },

    handleCheckChange(value, ev) {
      this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
      this.$nextTick(() => {
        const store = this.tree.store
        this.tree.$emit('check', this.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys(),
        })
      });
    },

    handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('JyTreeNode', 'tree-node-expand', node);
      this.tree.$emit('node-expand', nodeData, node, instance);
    },

    handleDragStart(event) {
      if (!this.tree.draggable) return
      this.tree.$emit('tree-node-drag-start', event, this);
    },

    handleDragOver(event) {
      if (!this.tree.draggable) return
      this.tree.$emit('tree-node-drag-over', event, this);
      event.preventDefault();
    },

    handleDrop(event) {
      event.preventDefault();
    },

    handleDragEnd(event) {
      if (!this.tree.draggable) return
      this.tree.$emit('tree-node-drag-end', event, this);
    },
  },

  created() {
    const parent = this.$parent;
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }

    const tree = this.tree;
    if (!tree) {
      console.warn("Can not find node's tree.")
    }

    const props = tree.props || {};
    const childrenKey = props['children'] || 'children';

    this.$watch(`node.data.${childrenKey}`, () => {
      this.node.updateChildren();
    })
    this.showCheckbox = tree.showCheckbox;
    if (this.node.expanded) {
      this.expanded = true;
      this.childNodeRendered = true;
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', (node) => {
        if (this.node !== node) {
          this.node.collapse()
        }
      });
    }
  },
}
</script>
