<template>
  <div
    class="gj-tree-select"
    :class="[
      selectSize ? 'gj-tree-select--' + selectSize : '',
      {
        'no-border': !border,
        'select-option-show': visible
      }
    ]"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div
      class="gj-tree-select-new-main"
      :class="[
        selectDisabled ? 'is-disabled' : '',
        isSelfAdaption && collapseTags && selected.length
          ? 'gj-tree-select-not-set-width-long'
          : '',
        (!!selectedLabel && !multiple) || (multiple && !!selected.length)
          ? 'gj-tree-select-new-main-active'
          : '',
        isSelfAdaption ? 'gj-tree-select-not-set-width' : ''
      ]"
      @mouseenter="inputHovering = true"
      @mouseleave="inputHovering = false"
    >
      <div class="gj-tree-select-content">
        <span class="gj-tree-select__single">
          <gj-input
            ref="reference"
            v-model="selectedLabel"
            type="text"
            :placeholder="currentPlaceholder"
            :name="name"
            :id="id"
            :autocomplete="autoComplete || autocomplete"
            :size="selectSize"
            :disabled="selectDisabled"
            :readonly="readonly"
            :validate-event="false"
            :class="{
              'is-focus': visible,
              'is-filter':
                (filterable && !multiple) ||
                (filterable && multiple && selected.length > 0)
            }"
            :tabindex="multiple && filterable ? '-1' : null"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="debouncedOnInputChange"
            @keydown.native.down.stop.prevent="handleNavigate('next')"
            @keydown.native.up.stop.prevent="handleNavigate('prev')"
            @keydown.native.esc.stop.prevent="visible = false"
            @keydown.native.tab="visible = false"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
          >
          </gj-input>
        </span>
        <span
          class="gj-tree-select-placeholder"
          v-if="!selectedLabel && !multiple"
          :title="currentPlaceholder"
          >{{ currentPlaceholder }}</span
        >
        <span
          class="gj-tree-select-selected-item"
          v-if="!!selectedLabel && !multiple"
          :title="selectedLabel"
          >{{ selectedLabel }}
        </span>
        <span
          class="gj-tree-select-placeholder"
          v-if="
            multiple && !selected.length && currentPlaceholder && !filterable
          "
          :title="currentPlaceholder"
          >{{ currentPlaceholder }}</span
        >
        <span
          :style="{ minHeight: 'auto' }"
          ref="mulpFilter"
          class="gj-tree-select-selected-item"
          v-if="multiple && (selected.length || filterable)"
        >
          <div class="gj-tree-select__tags" ref="tags">
            <span v-if="collapseTags && selected.length" style="display:flex">
              <gj-tag
                :closable="!selectDisabled"
                :size="collapseTagSize"
                :hit="selected[0].hitState"
                type="info"
                @close="deleteTag($event, selected[0])"
                disable-transitions
              >
                <span class="gj-tree-select__tags-text">{{
                  selected[0].currentLabel
                }}</span>
              </gj-tag>
              <gj-tag
                v-if="selected.length > 1"
                :closable="false"
                :size="collapseTagSize"
                type="info"
                disable-transitions
              >
                <span class="gj-tree-select__tags-text"
                  >+ {{ selected.length - 1 }}</span
                >
              </gj-tag>
            </span>

            <div
              class="gj-m-tree-select__tags-text"
              v-if="!collapseTags && showFooter"
            >
              <span v-for="(item, index) in selectedCopy" :key="index"
                >{{ item.currentLabel
                }}{{ index < selectedCopy.length - 1 ? separator : '' }}</span
              >
            </div>
            <div
              class="gj-m-tree-select__tags-text"
              v-if="!collapseTags && !showFooter"
            >
              <span v-for="(item, index) in selected" :key="index"
                >{{ item.currentLabel
                }}{{ index < selected.length - 1 ? separator : '' }}</span
              >
            </div>

            <span
              class="gj-tree-select-placeholder multiple-placeholder"
              :title="currentPlaceholder"
              v-if="
                multiple && !selected.length && currentPlaceholder && filterable
              "
              >{{ currentPlaceholder || placeholder }}
            </span>

            <input
              type="text"
              class="gj-tree-select__input"
              :class="[selectSize ? `is-${selectSize}` : '']"
              :disabled="selectDisabled"
              :autocomplete="autoComplete || autocomplete"
              @focus="handleFocus"
              @blur="softFocus = false"
              @keyup="managePlaceholder"
              @keydown="resetInputState"
              @keydown.down.prevent="handleNavigate('next')"
              @keydown.up.prevent="handleNavigate('prev')"
              @keydown.esc.stop.prevent="visible = false"
              @keydown.delete="deletePrevTag"
              @keydown.tab="visible = false"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition"
              v-model="query"
              @input="debouncedQueryChange"
              v-if="filterable"
              :style="{
                'flex-grow': '1',
                width: inputLength / inputWidth + '%',
                'max-width': inputWidth + 'px',
                position: !!query || selected.length ? 'relative' : 'absolute',
                left: 0
              }"
              ref="input"
            />
          </div>
        </span>
      </div>

      <span class="gj-tree-select-right-icon">
        <i
          v-show="!showClose"
          :class="[
            'gj-tree-select__caret',
            'gj-input__icon',
            iconClass === 'search' ? 'Gildata-search1' : iconClass,
            visible && 'is-reverse',
            (!!selectedLabel || selected.length > 0) && iconClass !== 'search'
              ? 'gj-input__selected'
              : ''
          ]"
        ></i>
        <i
          v-if="showClose"
          class="gj-tree-select__caret gj-input__icon Gildata-clean"
          @click="handleClearClick"
        ></i>
      </span>
    </div>

    <transition
      name="gj-zoom-in-top"
      @before-enter="handleMenuEnter"
      @after-leave="doDestroy"
    >
      <down-tree
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false"
      >
        <!-- <gj-scrollbar
          tag="ul"
          wrap-class="gj-tree-select-dropdown__wrap"
          view-class="gj-tree-select-dropdown__list"
          ref="scrollbar"
          :class="{
            'is-empty': !allowCreate && query && filteredOptionsCount === 0
          }"
          v-show="treeData.length > 0 && !loading"
        >
        </gj-scrollbar> -->
        <template
          v-if="
            emptyText &&
              (!allowCreate ||
                loading ||
                (allowCreate && treeData.length === 0))
          "
        >
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="gj-tree-select-dropdown__empty" v-else>
            <gj-empty empty-type="noResult" description="无搜索结果"></gj-empty>
          </p>
        </template>
      </down-tree>
    </transition>
  </div>
</template>

<script type="text/babel">
import Emitter from 'GildataDesign/src/mixins/emitter';
import Focus from 'GildataDesign/src/mixins/focus';
import Locale from 'GildataDesign/src/mixins/locale';
import GjInput from 'GildataDesign/packages/input';
import DownTree from './down-tree.vue';
import GjTag from 'GildataDesign/packages/tag';
import GjScrollbar from 'GildataDesign/packages/scrollbar';
import debounce from 'throttle-debounce/debounce';
import Clickoutside from 'GildataDesign/src/utils/clickoutside';
import {
  addResizeListener,
  removeResizeListener
} from 'GildataDesign/src/utils/resize-event';
import scrollIntoView from 'GildataDesign/src/utils/scroll-into-view';
import {
  getValueByPath,
  valueEquals,
  isIE,
  isEdge
} from 'GildataDesign/src/utils/util';
// import NavigationMixin from './navigation-mixin';
import { isKorean } from 'GildataDesign/src/utils/shared';

import { treeToData } from './tree-to-data.js';

export default {
  mixins: [Emitter, Locale, Focus('reference')],

  name: 'GjTreeSelect',

  componentName: 'GjTreeSelect',

  inject: {
    GjForm: {
      default: ''
    },

    GjFormItem: {
      default: ''
    }
  },

  provide() {
    return {
      select: this
    };
  },

  computed: {
    _elFormItemSize() {
      return (this.GjFormItem || {}).GjFormItemSize;
    },

    readonly() {
      return (
        !this.filterable ||
        this.multiple ||
        (!isIE() && !isEdge() && !this.visible)
      );
    },

    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== '';
      let criteria =
        this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },

    iconClass() {
      let data = this.remote && this.filterable;
      if (data) {
        return 'search';
      } else {
        return 'Gildata-downarrow';
        // if (this.visible) {
        //   return 'Gildata-downarrow';
        // } else {
        //   return 'Gildata-uparrow';
        // }
      }
    },

    debounce() {
      return this.remote ? 300 : 0;
    },

    emptyText() {
      if (this.loading) {
        return this.loadingText || this.t('el.select.loading');
      } else {
        if (this.remote && this.query === '' && this.options.length === 0) {
          return false;
        }
        if (
          this.filterable &&
          this.query &&
          this.options.length > 0 &&
          this.filteredOptionsCount === 0
        ) {
          return this.noMatchText || this.t('el.select.noMatch');
        }
        if (this.options.length === 0) {
          return this.noDataText || this.t('el.select.noData');
        }
      }
      return null;
    },

    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },

    selectDisabled() {
      return this.disabled || (this.GjForm || {}).disabled;
    },

    collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1 ? 'mini' : 'small';
    },
    propPlaceholder() {
      return typeof this.placeholder !== 'undefined'
        ? this.placeholder
        : this.t('el.select.placeholder');
    },
    selectedObj() {
      if (!this.multiple) {
        let obj = {
          value: '',
          currentLabel: ''
        };
        let data = treeToData(this.treeData, this.defaultProps.children).filter(
          (item) => item[this.nodeKey] === this.value
        );
        if (data && data.length > 0) {
          obj = {
            value: data[0][this.nodeKey],
            currentLabel: data[0][this.defaultProps.label]
          };
        }
        return obj;
      } else {
        let data = treeToData(this.treeData, this.defaultProps.children)
          .filter((item) => this.value.includes(item[this.nodeKey]))
          .map((_) => {
            return {
              ..._,
              currentLabel: _[this.defaultProps.label],
              value: _[this.nodeKey],
              hitState: false
            };
          });

        return data;
      }
    }
  },

  components: {
    GjInput,
    DownTree,
    GjTag,
    GjScrollbar
  },

  directives: { Clickoutside },

  props: {
    name: String,
    id: String,
    showFooter: {
      type: Boolean,
      default: false
    },
    value: {
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn(
            "[Element Warn][Select]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
          );
        return true;
      }
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      required: false
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    selectWidth: {
      type: String,
      default: ''
    },
    isSelfAdaption: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: '/'
    },
    treeData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label'
        };
      }
    },
    checkStrictly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      options: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      selectedCopy: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },

  watch: {
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    size() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },

    propPlaceholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },

    value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight();
        if (
          (val && val.length > 0) ||
          (this.$refs.input && this.query !== '')
        ) {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!valueEquals(val, oldVal)) {
        this.dispatch('GjFormItem', 'gj.form.change', val);
      }
    },

    visible(val) {
      if (!val) {
        this.broadcast('GjDownTree', 'destroyPopper');
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.query = '';
        this.previousQuery = null;
        this.selectedLabel = '';
        this.inputLength = 20;
        this.menuVisibleOnFocus = false;
        this.resetHoverIndex();
        this.$nextTick(() => {
          if (
            this.$refs.input &&
            this.$refs.input.value === '' &&
            this.selected.length === 0
          ) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (
              this.filterable &&
              this.allowCreate &&
              this.createdSelected &&
              this.createdLabel
            ) {
              this.selectedLabel = this.createdLabel;
            } else {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }

          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        }
      } else {
        this.broadcast('GjDownTree', 'updatePopper');
        if (this.filterable) {
          // this.query = this.remote ? '' : this.selectedLabel;
          this.query = this.remote ? '' : '';
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              // TODO:
            }

            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel;
              this.selectedLabel = '';
            }
          }
        }
      }
      this.$emit('visible-change', val);
    }
  },

  methods: {
    resetClick(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : '';
      this.selected = value;
    },
    sureClick(event) {
      event.stopPropagation();
      const value = this.selected.map((item) => {
        return item.currentValue;
      });
      this.selectedCopy = this.selected.map((item) => {
        return { currentLabel: item.currentLabel };
      });
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
    },
    handleNavigate(direction) {
      if (this.isOnComposition) return;
      this.navigateOptions(direction);
    },
    handleComposition(event) {
      const text = event.target.value;
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.$nextTick((_) => this.handleQueryChange(text));
      } else {
        const lastCharacter = text[text.length - 1] || '';
        this.isOnComposition = !isKorean(lastCharacter);
      }
    },
    handleQueryChange(val) {
      if (this.previousQuery === val || this.isOnComposition) return;
      if (
        this.previousQuery === null &&
        (typeof this.filterMethod === 'function' ||
          typeof this.remoteMethod === 'function')
      ) {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.$nextTick(() => {
        if (this.visible) {
          this.broadcast('GjDownTree', 'updatePopper');
        }
      });
      this.hoverIndex = -1;
      if (this.multiple && this.filterable) {
        this.$nextTick(() => {
          const length = this.$refs.input.value.length * 15 + 20;
          this.inputLength = this.collapseTags ? Math.min(50, length) : length;
          this.managePlaceholder();
          this.resetInputHeight();
        });
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.hoverIndex = -1;
        this.remoteMethod(val);
      } else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val);
        // TODO:
      } else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('GjDownTree', 'setTreeData', val);
      }
      if (
        this.defaultFirstOption &&
        (this.filterable || this.remote) &&
        this.filteredOptionsCount
      ) {
        this.checkDefaultFirstOption();
      }
    },

    scrollToOption(option) {
      const target =
        Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        const menu = this.$refs.popper.$el.querySelector(
          '.gj-tree-select-dropdown__wrap'
        );
        scrollIntoView(menu, target);
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },

    handleMenuEnter() {
      this.$nextTick(() => this.scrollToOption(this.selected));
    },

    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val);
      }
    },

    getOption(value) {
      let option;
      const isObject =
        Object.prototype.toString.call(value).toLowerCase() ===
        '[object object]';
      const isNull =
        Object.prototype.toString.call(value).toLowerCase() === '[object null]';
      const isUndefined =
        Object.prototype.toString.call(value).toLowerCase() ===
        '[object undefined]';

      if (this.selectedObj.value) {
        option = this.selectedObj;
      }
      if (option) return option;
      const label = !isObject && !isNull && !isUndefined ? String(value) : '';
      let newOption = {
        value: value,
        currentLabel: label
      };
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },
    setSelected() {
      if (!this.multiple) {
        let option = this.getOption(this.value);
        if (option.created) {
          this.createdLabel = option.currentLabel;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.currentLabel;
        this.selected = option;
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      let result = [];
      if (Array.isArray(this.value)) {
        // this.value.forEach((value) => {
        //   result.push(this.getOption(value));
        // });
        result = this.selectedObj;
      }
      this.selected = result;
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },

    handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown || this.filterable) {
          if (this.filterable && !this.visible) {
            this.menuVisibleOnFocus = true;
          }
          this.visible = true;
        }
        this.$emit('focus', event);
      } else {
        this.softFocus = false;
      }
    },

    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },

    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false;
        } else {
          this.$emit('blur', event);
        }
      }, 50);
      this.softFocus = false;
    },

    handleClearClick(event) {
      this.deleteSelected(event);
    },

    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },

    handleClose() {
      this.visible = false;
    },

    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      const option = this.selected[this.selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    },

    deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        const value = this.value.slice();
        value.pop();
        if (!this.showFooter) {
          this.$emit('input', value);
          this.emitChange(value);
        }
      }
    },

    managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value
          ? ''
          : this.cachedPlaceHolder;
      }
    },

    resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
      this.inputLength = this.$refs.input.value.length * 15 + 20;
      this.resetInputHeight();
    },

    resetInputHeight() {
      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(
          inputChildNodes,
          (item) => item.tagName === 'INPUT'
        )[0];
        const tags = this.$refs.tags;
        const tagsHeight = tags
          ? Math.round(tags.getBoundingClientRect().height)
          : 0;
        const sizeInMap = this.initialInputHeight || 40;

        let heightNum;

        if (this.selected.length === 0) {
          heightNum = sizeInMap + 'px';
        } else {
          heightNum =
            Math.max(
              tags ? tagsHeight + (tagsHeight > sizeInMap ? 0 : 0) : 0,
              sizeInMap
            ) + 'px';
        }
        input.style.height = heightNum;

        if (this.visible && this.emptyText !== false) {
          this.broadcast('GjDownTree', 'updatePopper');
        }
        if (this.$refs.mulpFilter) {
          // 设置多选filter高度

          this.$refs.mulpFilter.style.minHeight = heightNum;
        }
      });
    },

    resetHoverIndex() {
      setTimeout(() => {
        if (!this.multiple) {
          this.hoverIndex = this.options.indexOf(this.selected);
        } else {
          if (this.selected.length > 0) {
            this.hoverIndex = Math.min.apply(
              null,
              this.selected.map((item) => this.options.indexOf(item))
            );
          } else {
            this.hoverIndex = -1;
          }
        }
      }, 300);
    },

    setSoftFocus() {
      this.softFocus = true;
      const input = this.$refs.input || this.$refs.reference;
      if (input) {
        input.focus();
      }
    },

    getValueIndex(arr = [], value) {
      const isObject =
        Object.prototype.toString.call(value).toLowerCase() ===
        '[object object]';
      if (!isObject) {
        return arr.indexOf(value);
      } else {
        const valueKey = this.valueKey;
        let index = -1;
        arr.some((item, i) => {
          if (
            getValueByPath(item, valueKey) === getValueByPath(value, valueKey)
          ) {
            index = i;
            return true;
          }
          return false;
        });
        return index;
      }
    },

    toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },

    deleteSelected(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : '';
      if (!this.showFooter) {
        this.$emit('input', value);
        this.emitChange(value);
        this.$emit('clear');
      }
      this.visible = false;
    },

    deleteTag(event, tag) {
      let index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        const value = this.value.slice();
        value.splice(index, 1);
        if (!this.showFooter) {
          this.$emit('input', value);
          this.emitChange(value);
          this.$emit('remove-tag', tag.value);
        }
      }
      event.stopPropagation();
    },

    onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },

    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },

    handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },

    checkDefaultFirstOption() {
      this.hoverIndex = -1;
      // highlight the created option
      let hasCreated = false;
      for (let i = this.options.length - 1; i >= 0; i--) {
        if (this.options[i].created) {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) return;
      for (let i = 0; i !== this.options.length; ++i) {
        const option = this.options[i];
        if (this.query) {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = i;
            break;
          }
        } else {
          // highlight currently selected option
          if (option.itemSelected) {
            this.hoverIndex = i;
            break;
          }
        }
      }
    },

    getValueKey(item) {
      if (
        Object.prototype.toString.call(item.value).toLowerCase() !==
        '[object object]'
      ) {
        return item.value;
      } else {
        return getValueByPath(item.value, this.valueKey);
      }
    },
    getTreeSelected(data) {
      if (!this.multiple) {
        this.$emit('input', data[this.nodeKey]);
        this.emitChange(data[this.nodeKey]);
        this.visible = false;
        this.isSilentBlur = true;
        this.setSoftFocus();
        if (this.visible) return;
      } else {
        let value = (this.value || []).slice();
        let treeIdList = data.map((item) => item[this.nodeKey]);
        value = treeIdList;
        this.emitChange(value);
        this.$emit('input', value);
        if (this.filterable) this.$refs.input.focus();
      }
    }
  },

  created() {
    this.cachedPlaceHolder = this.currentPlaceholder = this.propPlaceholder;
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '');
    }

    this.debouncedOnInputChange = debounce(this.debounce, () => {
      this.onInputChange();
    });

    this.debouncedQueryChange = debounce(this.debounce, (e) => {
      this.handleQueryChange(e.target.value);
    });

    this.$on('setSelected', this.setSelected);
    this.$on('handleTreeSelected', this.getTreeSelected);
  },

  mounted() {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = '';
    }
    addResizeListener(this.$el, this.handleResize);

    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      };
      const input = reference.$el.querySelector('input');
      this.initialInputHeight =
        input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },

  beforeDestroy() {
    if (this.$el && this.handleResize) {
      removeResizeListener(this.$el, this.handleResize);
    }
  }
};
</script>
