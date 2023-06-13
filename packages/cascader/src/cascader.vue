<template>
  <div ref="reference" :class="['gj-cascader', realSize && `gj-cascader--${realSize}`, { 'is-disabled': isDisabled }]">
    <div class="gj-cascader__box" :class="['gj-cascader__box--' + (realSize ? realSize : 'small'), showBorder ? 'is-showBorder' : '', !!inputValue ? 'is-highlight' : '', dropDownVisible ? 'is-focus' : '', selfAdaption ? 'is-notAdaption' : '', !readonly ? 'is-filter' : '']" v-clickoutside="() => toggleDropDownVisible(false)" @mouseenter="inputHover = true" @mouseleave="inputHover = false" @click="() => toggleDropDownVisible(readonly ? undefined : true)" @keydown="handleKeyDown">
      <div class="gj-cascader__box-content">
        <span class="gj-cascader__input" :class="[!readonly ? 'is-filter' : '']">
          <gj-input
            ref="input"
            v-model="inputValue"
            :size="realSize"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="isDisabled"
            :validate-event="false"
            :class="{
              'is-focus': dropDownVisible,
              'is-highlight': inputValue
            }"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
            @click="toggleDropDownVisible(true)"
            @keydown.delete="handleDelete"
          >
          </gj-input>
        </span>
        <span class="gj-cascader__placeholder" v-if="placeholder && !inputValue">{{ placeholder }}</span>
        <span class="gj-cascader__selected" v-if="!!inputValue">{{ inputValue }}</span>
      </div>

      <span class="gj-cascader__icon">
        <i v-if="clearBtnVisible" key="clear" class="gj-input__icon Gildata-clean" @click.stop="handleClear"></i>
        <i v-else-if="dropDownVisible && filterable" :class="['gj-input__icon', 'Gildata-search1']"></i>
        <i v-else key="arrow-down" :class="['gj-input__icon Gildata-downarrow', dropDownVisible && 'is-reverse']" @click.stop="toggleDropDownVisible()"></i>
      </span>
    </div>

    <transition name="gj-zoom-in-top" @after-leave="handleDropdownLeave">
      <div v-show="dropDownVisible" ref="popper" :class="['gj-popper', 'gj-cascader__dropdown', popperClass]">
        <div v-if="multiple && presentTags.length && !filtering" :class="{ 'gj-cascader__tagScroll': presentTags.length }" class="gj-cascader__tags" ref="tagScrollbar">
          <gj-tag v-for="tag in presentTags" :key="tag.key" type="info" :size="tagSize" :hit="tag.hitState" :closable="tag.closable" disable-transitions @close="deleteTag(tag)">
            {{ tag.text }}
          </gj-tag>
        </div>
        <gj-cascader-panel :class="{ 'is-multiple': multiple }" ref="panel" v-show="!filtering" v-model="checkedValue" :options="options" :props="config" :border="false" :render-label="$scopedSlots.default" @calcTagWidth="calcTagWidth" @expand-change="handleExpandChange" @close="toggleDropDownVisible(false)"> </gj-cascader-panel>
        <gj-scrollbar ref="suggestionPanel" v-if="filterable" v-show="filtering" tag="ul" class="gj-cascader__suggestion-panel" view-class="gj-cascader__suggestion-list" @keydown.native="handleSuggestionKeyDown">
          <template v-if="suggestions.length">
            <li v-for="(item, index) in suggestions" :key="item.uid" :class="['gj-cascader__suggestion-item', item.checked && 'is-checked']" :tabindex="-1" @click="handleSuggestionClick(index)">
              <i v-if="item.checked" class="Gildata-tick"></i>
              <span>{{ item.text }}</span>
            </li>
          </template>
          <slot v-else name="empty">
            <gj-empty empty-type="noResult" :image-size="84"></gj-empty>
            <!--            <li class="gj-cascader__empty-text">{{ t('el.cascader.noMatch') }}</li>-->
          </slot>
        </gj-scrollbar>
        <div class="gj-cascader__footer" v-if="!filtering && showFooter">
          <gj-button type="text" text-type="secondary" @click.stop="handleClear">{{ cancelButtonText }}</gj-button>
          <gj-button type="text" @click.stop="handleSubmit">{{ confirmButtonText }}</gj-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Popper from 'GildataDesign/src/utils/vue-popper';
import Clickoutside from 'GildataDesign/src/utils/clickoutside';
import Emitter from 'GildataDesign/src/mixins/emitter';
import Locale from 'GildataDesign/src/mixins/locale';
import Migrating from 'GildataDesign/src/mixins/migrating';
import GjInput from 'GildataDesign/packages/input';
import GjButton from 'GildataDesign/packages/button';
import GjTag from 'GildataDesign/packages/tag';
import GjScrollbar from 'GildataDesign/packages/scrollbar';
import GjCascaderPanel from 'GildataDesign/packages/cascader-panel';
import AriaUtils from 'GildataDesign/src/utils/aria-utils';
import { t } from 'GildataDesign/src/locale';
import { isEqual, isEmpty, kebabCase } from 'GildataDesign/src/utils/util';
import { isUndefined, isFunction } from 'GildataDesign/src/utils/types';
import { isDef } from 'GildataDesign/src/utils/shared';
import { addResizeListener, removeResizeListener } from 'GildataDesign/src/utils/resize-event';
import debounce from 'throttle-debounce/debounce';

const { keys: KeyCode } = AriaUtils;
const MigratingProps = {
  expandTrigger: {
    newProp: 'expandTrigger',
    type: String
  },
  changeOnSelect: {
    newProp: 'checkStrictly',
    type: Boolean
  },
  hoverThreshold: {
    newProp: 'hoverThreshold',
    type: Number
  }
};

const PopperMixin = {
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    appendToBody: Popper.props.appendToBody,
    visibleArrow: {
      type: Boolean,
      default: true
    },
    arrowOffset: Popper.props.arrowOffset,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions
  },
  methods: Popper.methods,
  data: Popper.data,
  beforeDestroy: Popper.beforeDestroy
};

const InputSizeMap = {
  large: 40,
  medium: 32,
  small: 28,
  mini: 22
};

export default {
  name: 'GjCascader',

  directives: { Clickoutside },

  mixins: [PopperMixin, Emitter, Locale, Migrating],

  inject: {
    GjForm: {
      default: ''
    },
    GjFormItem: {
      default: ''
    }
  },

  components: {
    GjInput,
    GjTag,
    GjScrollbar,
    GjCascaderPanel,
    GjButton
  },

  props: {
    value: {},
    options: Array,
    props: Object,
    size: String,
    placeholder: {
      type: String,
      default: () => t('el.cascader.placeholder')
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: Function,
    separator: {
      type: String,
      default: ' / '
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function,
      default: () => () => {}
    },
    popperClass: String,
    showFooter: {
      // 是否展示底部按钮
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '重置'
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    selfAdaption: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dropDownVisible: false,
      checkedValue: this.value,
      checkedValueStore: this.value, // 存储checkedValue
      inputHover: false,
      inputValue: null,
      inputValueStore: this.inputValue, // 存储输入框的inputValue（字符串）
      presentText: null,
      presentTags: [],
      checkedNodes: [],
      filtering: false,
      suggestions: [],
      inputInitialHeight: 0,
      pressDeleteCount: 0,
      initInputWidth: '' // placeholder文本宽度
    };
  },

  computed: {
    realSize() {
      const _elFormItemSize = (this.GjFormItem || {}).GjFormItemSize;
      return this.size || _elFormItemSize || (this.$ELEMENT || {}).size;
    },
    tagSize() {
      return ['small', 'mini'].indexOf(this.realSize) > -1 ? 'mini' : 'small';
    },
    isDisabled() {
      return this.disabled || (this.GjForm || {}).disabled;
    },
    config() {
      const config = this.props || {};
      const { $attrs } = this;

      Object.keys(MigratingProps).forEach((oldProp) => {
        const { newProp, type } = MigratingProps[oldProp];
        let oldValue = $attrs[oldProp] || $attrs[kebabCase(oldProp)];
        if (isDef(oldProp) && !isDef(config[newProp])) {
          if (type === Boolean && oldValue === '') {
            oldValue = true;
          }
          config[newProp] = oldValue;
        }
      });

      return config;
    },
    multiple() {
      return this.config.multiple;
    },
    leafOnly() {
      return !this.config.checkStrictly;
    },
    readonly() {
      return !this.filterable;
    },
    clearBtnVisible() {
      if (!this.clearable || this.isDisabled || this.filtering || !this.inputHover) {
        return false;
      }

      return this.multiple ? !!this.checkedNodes.filter((node) => !node.isDisabled).length : !!this.presentText;
    },
    panel() {
      return this.$refs.panel;
    }
  },

  watch: {
    dropDownVisible(val) {
      // 动态设置Gj-cascader__tags的宽度
      if (val) {
        if (this.showFooter) {
          this.checkedValue = JSON.parse(JSON.stringify(this.checkedValueStore));
          this.inputValue = this.inputValueStore;
          if (!this.isEmptyValue(this.checkedValue)) {
            this.computePresentContent();
          }
        }
        this.calcTagWidth();
      } else {
        if (this.showFooter) {
          if (!this.inputValueStore) {
            // 之前没有选中的情况
            this.handleClear(); // 清空已选择的内容
            return;
          } else {
            this.inputValue = this.inputValueStore;
          }
          // if (!this.presentTags.length && !this.inputValueStore) { // 当前为选中且之前也没有选中
          //   this.$refs.cascaderbox.style.width = this.initInputWidth + 'px';
          //   this.inputValue = null;
          //   this.inputValueStore = null;
          // } else {
          //   this.inputValue = this.presentText;
          // }
        }
      }
    },
    disabled() {
      this.computePresentContent();
    },
    value(val) {
      if (!isEqual(val, this.checkedValue)) {
        this.checkedValue = val;
        this.computePresentContent();
      }
    },
    /**
     * 记录单选时存在showFooter的流程处理
     * 1、选择数据后，触发cascader-node.vue中的 events.on.click = this.handleCheckChange;
     * 2、handleCheckChange方法中触发 panel组件的handleCheckChange方法
     * 3、cascader-panel.vue中 通过handleCheckChange修改checkedValue的值
     * 4、cascader-panel.vue中 watch监听checkedValue的变化，触发this.$emit('input', val);
     * 5、this.$emit('input', val) 会修改cascader.vue中的checkedValue值
     *   因为v-model语法糖本质是  :value="checkedValue" @input="checkedValue"  <gj-cascader-panel v-model="checkedValue">
     * 6、cascader.vue中 监听checkedValue的变化，执行this.updateInfo(val);
     * 7、最终只有用户点击确定后，才会input框中才会显示对于的数据
     * */
    checkedValue(val) {
      // 没有showFooter
      if (!this.showFooter) {
        const { value, dropDownVisible } = this;
        const { checkStrictly, multiple } = this.config;

        if (!isEqual(val, value) || isUndefined(value)) {
          this.computePresentContent();
          // hide dropdown when single mode
          if (!multiple && !checkStrictly && dropDownVisible) {
            this.toggleDropDownVisible(false);
          }

          this.$emit('input', val);
          this.$emit('change', val);
          this.dispatch('GjFormItem', 'el.form.change', [val]);
        }
      } else {
        // 存在showFooter
        this.updateInfo(val);
      }
    },
    options: {
      handler: function() {
        this.$nextTick(this.computePresentContent);
      },
      deep: true
    },
    presentText(val) {
      if (this.showFooter) return;
      this.inputValue = val;
    },

    presentTags(val, oldVal) {
      if (this.multiple && (val.length || oldVal.length)) {
        this.calcTagWidth();
        this.$nextTick(this.updateStyle);
      }
    },
    filtering(val) {
      this.$nextTick(this.updatePopper);
    }
  },

  mounted() {
    const { input } = this.$refs;
    if (input && input.$el) {
      this.inputInitialHeight = input.$el.offsetHeight || InputSizeMap[this.realSize] || 28;
    }

    if (!this.isEmptyValue(this.value)) {
      this.computePresentContent();
    }

    this.filterHandler = debounce(this.debounce, () => {
      const { inputValue } = this;

      if (!inputValue) {
        this.filtering = false;
        return;
      }

      const before = this.beforeFilter(inputValue);
      if (before && before.then) {
        before.then(this.getSuggestions);
      } else if (before !== false) {
        this.getSuggestions();
      } else {
        this.filtering = false;
      }
    });

    addResizeListener(this.$el, this.updateStyle);
  },

  beforeDestroy() {
    removeResizeListener(this.$el, this.updateStyle);
  },

  methods: {
    handleSubmit() {
      this.checkedValueStore = JSON.parse(JSON.stringify(this.checkedValue));
      this.inputValue = this.presentText;
      this.inputValueStore = this.inputValue;
      this.dispatchInfo(this.checkedValueStore);
      this.toggleDropDownVisible(false);
    },
    updateInfo(val) {
      // const { value, dropDownVisible } = this;
      const { value } = this;
      // const { checkStrictly, multiple } = this.config;

      if (Array.isArray(val) && Array.isArray(value)) {
        // 两个数组都为0时 也要更新状态
        if (val.length === 0 && value.length === 0) {
          return this.computePresentContent();
        }
      }

      if (!isEqual(val, value) || isUndefined(value)) {
        this.computePresentContent();

        // 取消单选时有showFooter时下拉框自动关闭的情况
        // if (!multiple && !checkStrictly && dropDownVisible) {
        //   this.toggleDropDownVisible(false);
        // }
      }
    },
    // 对外分发消息
    dispatchInfo(val) {
      this.$emit('input', val);
      this.$emit('change', val);
      this.dispatch('GjFormItem', 'el.form.change', [val]);
    },
    calcTagWidth() {
      this.$nextTick(() => {
        if (this.multiple) {
          let dom = this.$refs.tagScrollbar;
          if (dom) dom.style.width = this.$refs.panel.$el.clientWidth + 'px';
        }
      });
    },
    getCharCodeAt(str) {
      let length = 0;
      for (let i = 0; i < str.length; i++) {
        // 遍历字符串，枚举每个字符
        if (str.charCodeAt(i) > 255) {
          // 字符编码大于255，说明是双字节字符
          length += 2; // 则累加2个
        } else {
          length++; // 否则递加一次
        }
      }
      return length;
    },
    getMigratingConfig() {
      return {
        props: {
          'expand-trigger': 'expand-trigger is removed, use `props.expandTrigger` instead.',
          'change-on-select': 'change-on-select is removed, use `props.checkStrictly` instead.',
          'hover-threshold': 'hover-threshold is removed, use `props.hoverThreshold` instead'
        },
        events: {
          'active-item-change': 'active-item-change is renamed to expand-change'
        }
      };
    },
    toggleDropDownVisible(visible) {
      if (this.isDisabled) return;
      const { dropDownVisible } = this;
      const { input } = this.$refs;
      visible = isDef(visible) ? visible : !dropDownVisible;
      if (visible !== dropDownVisible) {
        this.dropDownVisible = visible;
        if (visible) {
          this.$nextTick(() => {
            this.updatePopper();
            this.panel.scrollIntoView();
          });
        }
        input.$refs.input.setAttribute('aria-expanded', visible);
        this.$emit('visible-change', visible);
      }
    },
    handleDropdownLeave() {
      this.filtering = false;
      if (!this.showFooter) {
        this.inputValue = this.presentText;
      }
      this.doDestroy();
    },
    handleKeyDown(event) {
      switch (event.keyCode) {
        case KeyCode.enter:
          this.toggleDropDownVisible();
          break;
        case KeyCode.down:
          this.toggleDropDownVisible(true);
          this.focusFirstNode();
          event.preventDefault();
          break;
        case KeyCode.esc:
        case KeyCode.tab:
          this.toggleDropDownVisible(false);
          break;
      }
    },
    handleFocus(e) {
      this.$emit('focus', e);
    },
    handleBlur(e) {
      this.$emit('blur', e);
    },
    handleInput(val, event) {
      !this.dropDownVisible && this.toggleDropDownVisible(true);

      // if (event && event.isComposing) return;
      if (val) {
        this.filterHandler();
      } else {
        this.filtering = false;
      }
    },
    handleClear() {
      this.presentTags = [];
      this.presentText = '';
      this.inputValue = '';
      this.inputValueStore = '';
      this.panel.clearCheckedNodes();
    },
    handleExpandChange(value) {
      this.$nextTick(this.updatePopper.bind(this));
      this.$emit('expand-change', value);
      this.$emit('active-item-change', value); // Deprecated
    },
    focusFirstNode() {
      this.$nextTick(() => {
        const { filtering } = this;
        const { popper, suggestionPanel } = this.$refs;
        let firstNode = null;

        if (filtering && suggestionPanel) {
          firstNode = suggestionPanel.$el.querySelector('.gj-cascader__suggestion-item');
        } else {
          const firstMenu = popper.querySelector('.gj-cascader-menu');
          firstNode = firstMenu.querySelector('.gj-cascader-node[tabindex="-1"]');
        }

        if (firstNode) {
          firstNode.focus();
          !filtering && firstNode.click();
        }
      });
    },
    computePresentContent() {
      // nextTick is required, because checked nodes may not change right now
      this.$nextTick(() => {
        // if (this.config.multiple) {
        //   this.computePresentTags();
        //   this.presentText = this.presentTags.length ? ' ' : null;
        // } else {
        //   this.computePresentText();
        // }
        // 多选
        if (this.config.multiple) {
          this.computePresentTags();
        }
        this.computePresentText();
      });
    },
    isEmptyValue(val) {
      const { multiple } = this;
      const { emitPath } = this.panel.config;
      if (multiple || emitPath) {
        return isEmpty(val);
      }
      return false;
    },
    computePresentText() {
      const { checkedValue, config } = this;
      if (!this.isEmptyValue(checkedValue)) {
        // 如果是多选 文字取最后一项
        let val = this.multiple ? checkedValue[checkedValue.length - 1] : checkedValue;
        const node = this.panel.getNodeByValue(val);
        if (node && (config.checkStrictly || node.isLeaf)) {
          this.presentText = node.getText(this.showAllLevels, this.separator);
          return;
        }
      }
      this.presentText = null;
    },
    computePresentTags() {
      const { isDisabled, leafOnly, showAllLevels, separator, collapseTags } = this;
      const checkedNodes = this.getCheckedNodes(leafOnly);
      const tags = [];

      const genTag = (node) => ({
        node,
        key: node.uid,
        text: node.getText(showAllLevels, separator),
        hitState: false,
        closable: !isDisabled && !node.isDisabled
      });

      if (checkedNodes.length) {
        const [first, ...rest] = checkedNodes;
        const restCount = rest.length;
        tags.push(genTag(first));

        if (restCount) {
          if (collapseTags) {
            tags.push({
              key: -1,
              text: `+ ${restCount}`,
              closable: false
            });
          } else {
            rest.forEach((node) => tags.push(genTag(node)));
          }
        }
      }

      this.checkedNodes = checkedNodes;
      this.presentTags = tags;
    },
    getSuggestions() {
      let { filterMethod } = this;

      if (!isFunction(filterMethod)) {
        filterMethod = (node, keyword) => node.text.toLowerCase().includes(keyword.toLowerCase());
      }

      const suggestions = this.panel.getFlattedNodes(this.leafOnly).filter((node) => {
        if (node.isDisabled) return false;
        node.text = node.getText(this.showAllLevels, this.separator) || '';
        return filterMethod(node, this.inputValue);
      });

      if (this.multiple) {
        this.presentTags.forEach((tag) => {
          tag.hitState = false;
        });
      } else {
        suggestions.forEach((node) => {
          node.checked = isEqual(this.checkedValue, node.getValueByOption());
        });
      }

      this.filtering = true;
      this.suggestions = suggestions;
      this.$nextTick(this.updatePopper);
    },
    handleSuggestionKeyDown(event) {
      const { keyCode, target } = event;
      switch (keyCode) {
        case KeyCode.enter:
          target.click();
          break;
        case KeyCode.up:
          const prev = target.previousElementSibling;
          prev && prev.focus();
          break;
        case KeyCode.down:
          const next = target.nextElementSibling;
          next && next.focus();
          break;
        case KeyCode.esc:
        case KeyCode.tab:
          this.toggleDropDownVisible(false);
          break;
      }
    },
    handleDelete() {
      const { inputValue, pressDeleteCount, presentTags } = this;
      const lastIndex = presentTags.length - 1;
      const lastTag = presentTags[lastIndex];
      this.pressDeleteCount = inputValue ? 0 : pressDeleteCount + 1;

      if (!lastTag) return;

      if (this.pressDeleteCount) {
        if (lastTag.hitState) {
          this.deleteTag(lastTag);
        } else {
          lastTag.hitState = true;
        }
      }
    },
    handleSuggestionClick(index) {
      const { multiple } = this;
      const targetNode = this.suggestions[index];

      if (multiple) {
        const { checked } = targetNode;
        targetNode.doCheck(!checked);
        this.panel.calculateMultiCheckedValue();
        this.filtering = false;
      } else {
        this.checkedValue = targetNode.getValueByOption();
        this.toggleDropDownVisible(false);
      }
    },
    deleteTag(tag) {
      const { checkedValue } = this;
      const current = tag.node.getValueByOption();
      const val = checkedValue.find((n) => isEqual(n, current));
      this.checkedValue = checkedValue.filter((n) => !isEqual(n, current));
      this.$emit('remove-tag', val);
    },
    updateStyle() {
      const { $el, inputInitialHeight } = this;
      if (this.$isServer || !$el) return;

      const { suggestionPanel } = this.$refs;
      const inputInner = $el.querySelector('.gj-input__inner');
      const cascaderBox = $el.querySelector('.gj-cascader__box');

      if (!inputInner) return;

      const tags = $el.querySelector('.gj-cascader__tags');
      let suggestionPanelEl = null;

      if (suggestionPanel && (suggestionPanelEl = suggestionPanel.$el)) {
        const suggestionList = suggestionPanelEl.querySelector('.gj-cascader__suggestion-list');
        suggestionList.style.minWidth = cascaderBox.offsetWidth + 'px';
      }

      if (tags) {
        const offsetHeight = Math.round(tags.getBoundingClientRect().height);
        let height = Math.max(offsetHeight + 6, inputInitialHeight) + 'px';
        if (this.presentTags.length === 0) {
          height = InputSizeMap[this.realSize] || 28 + 'px';
        }
        inputInner.style.height = height;
        if (this.dropDownVisible) {
          this.updatePopper();
        }
        // 滚动到底部
        // if (this.multiple && this.$refs['scrollbar']) this.$refs['scrollbar'].wrap.scrollTop = this.$refs['scrollbar'].wrap.scrollHeight;
      }
    },

    /**
     * public methods
     */
    getCheckedNodes(leafOnly) {
      return this.panel.getCheckedNodes(leafOnly);
    }
  }
};
</script>
