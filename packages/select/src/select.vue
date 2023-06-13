<template>
  <div
    class="gj-select"
    :class="[
      selectSize ? 'gj-select--' + selectSize : '',
      {
        'no-border': !border,
        'select-option-show': visible,
        'gj-select__adaption': isSelfAdaption
      }
    ]"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div
      class="gj-select-new-main"
      :class="[
        selectDisabled ? 'is-disabled' : '',
        isSelfAdaption && collapseTags && selected.length ? 'gj-select-not-set-width-long' : '',
        (!!selectedLabel && !multiple) || (multiple && !!selected.length) ? 'gj-select-new-main-active' : '',
        isSelfAdaption ? 'gj-select-not-set-width' : ''
      ]"
      @mouseenter="inputHovering = true"
      @mouseleave="inputHovering = false"
    >
      <div
        class="gj-select-content"
        :class="{
          'is-no-filter': !filterable
        }"
      >
        <span class="gj-select__single">
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
              'is-filter': (filterable && !multiple) || (filterable && multiple && selected.length > 0)
            }"
            :tabindex="multiple && filterable ? '-1' : null"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="debouncedOnInputChange"
            @keydown.native.down.stop.prevent="handleNavigate('next')"
            @keydown.native.up.stop.prevent="handleNavigate('prev')"
            @keydown.native.enter.prevent="selectOption"
            @keydown.native.esc.stop.prevent="visible = false"
            @keydown.native.tab="visible = false"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
          >
          </gj-input>
        </span>
        <span class="gj-select-placeholder" v-if="!selectedLabel && !multiple" :title="currentPlaceholder">{{
          currentPlaceholder
        }}</span>
        <span class="gj-select-selected-item" v-if="!!selectedLabel && !multiple" :title="selectedLabel"
          >{{ selectedLabel }}
        </span>
        <span
          class="gj-select-placeholder"
          v-if="
            multiple &&
              currentPlaceholder &&
              !filterable &&
              ((showFooter && !selectedCopy.length) || (!selected.length && !showFooter))
          "
          :title="currentPlaceholder"
          >{{ currentPlaceholder }}</span
        >

        <div
          class="gj-select-selected-item gj-select-selected-item-multiple"
          v-if="multiple && ((showFooter && selectedCopy.length) || (selected.length && !showFooter) || filterable)"
        >
          <div class="gj-select__tags" ref="tags">
            <!-- <template v-if="!showCharter">
              <span v-if="collapseTags && selected.length" class="gj-select-tagsitem">
                <gj-tag
                  class="gj-select-tagsitem-first"
                  :closable="!selectDisabled"
                  :size="collapseTagSize"
                  :hit="selected[0].hitState"
                  type="info"
                  @close="deleteTag($event, selected[0])"
                  disable-transitions
                >
                  <span class="gj-select__tags-text">{{ selected[0].currentLabel }}</span>
                </gj-tag>
                <gj-tag
                  v-if="selected.length > 1"
                  :closable="false"
                  :size="collapseTagSize"
                  type="info"
                  disable-transitions
                >
                  <span class="gj-select__tags-text">+ {{ selected.length - 1 }}</span>
                </gj-tag>
              </span>
            </template>

            <template v-if="showCharter">
              <span v-if="collapseTags && selectedCopy.length" class="gj-select-tagsitem">
                <gj-tag
                  class="gj-select-tagsitem-first"
                  :closable="!selectDisabled"
                  :size="collapseTagSize"
                  :hit="selectedCopy[0].hitState"
                  type="info"
                  @close="deleteTag($event, selectedCopy[0])"
                  disable-transitions
                >
                  <span class="gj-select__tags-text">{{ selectedCopy[0].currentLabel }}</span>
                </gj-tag>
                <gj-tag
                  v-if="selectedCopy.length > 1"
                  :closable="false"
                  :size="collapseTagSize"
                  type="info"
                  disable-transitions
                >
                  <span class="gj-select__tags-text">+ {{ selectedCopy.length - 1 }}</span>
                </gj-tag>
              </span>
            </template> -->
            <span v-if="collapseTags && tagList.length" class="gj-select-tagsitem">
              <gj-tag
                class="gj-select-tagsitem-first"
                :closable="!selectDisabled && !showFooter"
                :size="collapseTagSize"
                :hit="tagList[0].hitState"
                type="info"
                @close="deleteTag($event, tagList[0])"
                disable-transitions
              >
                <span class="gj-select__tags-text">{{ tagList[0].currentLabel }}</span>
              </gj-tag>
              <gj-tag
                v-if="tagList.length > 1"
                :closable="false"
                :size="collapseTagSize"
                type="info"
                disable-transitions
              >
                <span class="gj-select__tags-text">+ {{ tagList.length - 1 }}</span>
              </gj-tag>
            </span>

            <div class="gj-m-select__tags-text" v-if="!collapseTags && showFooter">
              <span v-for="(item, index) in selectedCopy" :key="index"
                >{{ item.currentLabel }}{{ index < selectedCopy.length - 1 ? separator : '' }}</span
              >
            </div>
            <div class="gj-m-select__tags-text test" v-if="!collapseTags && !showFooter">
              <span v-for="(item, index) in selected" :key="index"
                >{{ item.currentLabel }}{{ index < selected.length - 1 ? separator : '' }}</span
              >
            </div>

            <span
              class="gj-select-placeholder multiple-placeholder"
              v-if="
                multiple &&
                  !query &&
                  filterable &&
                  ((showFooter && !selectedCopy.length) || (!selected.length && !showFooter))
              "
              :title="currentPlaceholder"
              >{{ currentPlaceholder || cachedPlaceHolder }}</span
            >

            <input
              type="text"
              class="gj-select__input"
              :class="[selectSize ? `is-${selectSize}` : '']"
              :disabled="selectDisabled"
              :autocomplete="autoComplete || autocomplete"
              @focus="handleFocus"
              @blur="softFocus = false"
              @keyup="managePlaceholder"
              @keydown="resetInputState"
              @keydown.down.prevent="handleNavigate('next')"
              @keydown.up.prevent="handleNavigate('prev')"
              @keydown.enter.prevent="selectOption"
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
                position: !!query || value.length ? 'relative' : 'absolute',
                left: 0
              }"
              ref="input"
            />
          </div>
        </div>
      </div>

      <span class="gj-select-right-icon">
        <i
          v-show="!showClose"
          :class="[
            'gj-select__caret',
            'gj-input__icon',
            iconClass === 'search' ? 'Gildata-search1' : iconClass,
            visible && 'is-reverse',
            !!selectedLabel || selected.length > 0 ? 'gj-input__selected' : ''
          ]"
        ></i>
        <i
          class="gj-select__caret gj-input__icon"
          :class="[showClose ? 'Gildata-clean' : '']"
          @click="handleClearClick"
        ></i>
      </span>
    </div>

    <transition name="gj-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="doDestroy">
      <gj-select-menu ref="popper" :append-to-body="popperAppendToBody" v-show="visible && emptyText !== false">
        <div v-if="!showCharter">
          <div
            v-if="showFooter && multiple && selected.length"
            :style="{ 'max-width': inputWidth + 'px' }"
            class="gj-m-select__tags-text-top"
          >
            <template v-for="(item, itemIndex) in selected">
              <gj-tag
                :key="itemIndex"
                :closable="!selectDisabled"
                :size="collapseTagSize"
                :hit="item.hitState"
                type="info"
                @close="deleteTag($event, item)"
                disable-transitions
              >
                <span class="gj-select__tags-text">{{ item.currentLabel }}</span>
              </gj-tag>
            </template>
          </div>
          <div v-if="showFooter && multiple && selected.length" class="gj-m-select__tags-text-line"></div>
          <gj-scrollbar
            tag="ul"
            wrap-class="gj-select-dropdown__wrap"
            view-class="gj-select-dropdown__list"
            ref="scrollbar"
            :class="{
              'is-empty': !allowCreate && query && filteredOptionsCount === 0
            }"
            v-show="options.length > 0 && !loading"
          >
            <gj-option :value="query" created v-if="showNewOption"> </gj-option>
            <slot></slot>
          </gj-scrollbar>
          <div v-if="showFooter && multiple" class="gj-select-reset">
            <span @click="resetClick">重置</span>
            <span @click="sureClick">确定</span>
          </div>

          <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.length === 0))">
            <slot name="empty" v-if="$slots.empty"></slot>
            <p class="gj-select-dropdown__empty" v-else>
              <gj-empty empty-type="noResult" :description="emptyText"></gj-empty>
            </p>
          </template>
        </div>
        <div v-else>
          <slot></slot>
        </div>
      </gj-select-menu>
    </transition>
  </div>
</template>

<script type="text/babel">
import Emitter from 'GildataDesign/src/mixins/emitter';
import Focus from 'GildataDesign/src/mixins/focus';
import Locale from 'GildataDesign/src/mixins/locale';
import GjInput from 'GildataDesign/packages/input';
import GjEmpty from 'GildataDesign/packages/empty';
import GjSelectMenu from './select-dropdown.vue';
import GjOption from './option.vue';
import GjTag from 'GildataDesign/packages/tag';
import GjScrollbar from 'GildataDesign/packages/scrollbar';
import debounce from 'throttle-debounce/debounce';
import Clickoutside from 'GildataDesign/src/utils/clickoutside';
import { addResizeListener, removeResizeListener } from 'GildataDesign/src/utils/resize-event';
import scrollIntoView from 'GildataDesign/src/utils/scroll-into-view';
import { getValueByPath, valueEquals, isIE, isEdge } from 'GildataDesign/src/utils/util';
import NavigationMixin from './navigation-mixin';
import { isKorean } from 'GildataDesign/src/utils/shared';

export default {
  mixins: [Emitter, Locale, Focus('reference'), NavigationMixin],

  name: 'GjSelect',

  componentName: 'GjSelect',

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
      return !this.filterable || this.multiple || (!isIE() && !isEdge() && !this.visible);
    },

    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== '';
      let criteria = this.clearable && !this.selectDisabled && this.inputHovering && hasValue;
      return criteria;
    },

    iconClass() {
      // let data = this.remote && this.filterable;
      let data = this.filterable && this.visible;
      if (data) {
        if (this.visible) {
          return 'search';
        } else {
          if (this.value.length > 0) {
            return 'search';
          } else {
            return 'Gildata-downarrow';
          }
        }
      } else {
        return 'Gildata-downarrow';
        // if (this.visible) {
        //   return 'Gildata-uparrow ';
        // } else {
        //   return 'Gildata-downarrow';
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
        if (this.filterable && this.query && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || this.t('el.select.noMatch');
        }
        if (this.options.length === 0) {
          return this.noDataText || '无搜索结果' || this.t('el.select.noData');
        }
      }
      return null;
    },

    showNewOption() {
      let hasExistingOption = this.options
        .filter((option) => !option.created)
        .some((option) => option.currentLabel === this.query);
      return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption;
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
      return typeof this.placeholder !== 'undefined' ? this.placeholder : this.t('el.select.placeholder');
    },
    tagList() {
      if (this.showCharter || this.showFooter) {
        return this.selectedCopy;
      } else {
        return this.selected;
      }
    }
  },

  components: {
    GjInput,
    GjSelectMenu,
    GjOption,
    GjTag,
    GjScrollbar,
    GjEmpty
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
    showCharter: Boolean,
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
      default: ','
    }
  },

  data() {
    return {
      options: [],
      cachedOptions: [],
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
        if ((val && val.length > 0) || (this.$refs.input && this.query !== '')) {
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
        // 表单中的校验方法
        this.dispatch('GjFormItem', 'el.form.change', val);
      }
    },

    visible(val) {
      if (!val) {
        this.broadcast('GjSelectDropdown', 'destroyPopper');
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
          if (this.$refs.input && this.$refs.input.value === '' && this.selected.length === 0) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (this.filterable && this.allowCreate && this.createdSelected && this.createdLabel) {
              this.selectedLabel = this.createdLabel;
            } else {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }

          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        } else {
          this.setSelected2(this.value);
        }
      } else {
        this.broadcast('GjSelectDropdown', 'updatePopper');
        if (this.filterable) {
          this.query = this.remote ? '' : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              this.broadcast('GjOption', 'queryChange', '');
              this.broadcast('GjOptionGroup', 'queryChange');
            }

            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel;
              this.selectedLabel = '';
            }
          }
        }
      }

      this.$emit('visible-change', val);
    },

    options() {
      if (this.$isServer) return;
      this.$nextTick(() => {
        this.broadcast('GjSelectDropdown', 'updatePopper');
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      let inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    }
  },

  methods: {
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
    resetClick(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : '';
      this.selected = value;

      this.selectedCopy = [];
      this.$emit('input', value);
      this.emitChange(value);
      // this.visible = false;
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
        (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')
      ) {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.$nextTick(() => {
        if (this.visible) this.broadcast('GjSelectDropdown', 'updatePopper');
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
        this.broadcast('GjOptionGroup', 'queryChange');
      } else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('GjOption', 'queryChange', val);
        this.broadcast('GjOptionGroup', 'queryChange');
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    },

    scrollToOption(option) {
      const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        const menu = this.$refs.popper.$el.querySelector('.gj-select-dropdown__wrap');
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
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';
      const isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]';

      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        const cachedOption = this.cachedOptions[i];
        const isEqual = isObject
          ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey)
          : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
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
      if (this.showCharter) {
        this.setCharterSelected();
        return;
      }

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
        this.value.forEach((value) => {
          result.push(this.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    setSelected2(value) {
      if (this.showCharter) {
        this.setCharterSelected();
        return;
      }
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
      if (Array.isArray(value)) {
        value.forEach((item) => {
          result.push(this.getOption(item));
        });
      }
      this.selected = result;
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    setCharterSelected() {
      if (!this.value || !this.value.length) {
        this.selectedLabel = '';
        this.selected = this.selectedCopy = this.multiple ? [] : {};
        return;
      }
      if (!this.multiple) {
        let filterOp = this.options.find((_) => _.value === this.value);
        let option = filterOp;
        if (option.created) {
          this.createdLabel = option.label;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.label;
        this.selected = {
          currentLabel: option.label,
          currentValue: option.value,
          ...option
        };
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      let result = [];
      if (Array.isArray(this.value)) {
        this.value.forEach((value) => {
          // let option =  this.getOption(value);
          let option = this.options.find((_) => _.value === value);
          result.push({
            currentLabel: option.label,
            ...option,
            currentValue: option.value
          });
        });
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
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
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
        let input = [].filter.call(inputChildNodes, (item) => item.tagName === 'INPUT')[0];
        const tags = this.$refs.tags;
        const tagsHeight = tags ? Math.round(tags.getBoundingClientRect().height) : 0;
        const sizeInMap = this.initialInputHeight || (this.border ? 26 : 28);

        let heightNum;
        if (this.selected.length === 0) {
          heightNum = sizeInMap + 'px';
        } else {
          heightNum = Math.max(tags ? tagsHeight + (tagsHeight > sizeInMap ? 0 : 0) : 0, sizeInMap) + 'px';
        }
        input.style.height = heightNum;
        if (this.visible && this.emptyText !== false) {
          this.broadcast('GjSelectDropdown', 'updatePopper');
        }
      });
    },

    resetHoverIndex() {
      setTimeout(() => {
        if (!this.multiple) {
          this.hoverIndex = this.options.indexOf(this.selected);
        } else {
          if (this.selected.length > 0) {
            this.hoverIndex = Math.min.apply(null, this.selected.map((item) => this.options.indexOf(item)));
          } else {
            this.hoverIndex = -1;
          }
        }
      }, 300);
    },

    handleOptionSelect(option, byClick) {
      if (this.multiple) {
        let value = (this.value || []).slice();
        if (this.showFooter) {
          value = this.selected
            .map((item) => {
              return item.currentValue;
            })
            .slice();
        }
        const optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option.value);
        }
        if (!this.showFooter) {
          this.emitChange(value);
          this.$emit('input', value);
        } else {
          this.setSelected2(value);
        }
        if (option.created) {
          this.query = '';
          this.handleQueryChange('');
          this.inputLength = 20;
        }
        if (this.filterable) this.$refs.input.focus();
      } else {
        this.$emit('input', option.value);
        this.emitChange(option.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      this.setSoftFocus();
      if (this.visible) return;
      this.$nextTick(() => {
        this.scrollToOption(option);
      });
    },

    setSoftFocus() {
      this.softFocus = true;
      const input = this.$refs.input || this.$refs.reference;
      if (input) {
        input.focus();
      }
    },

    getValueIndex(arr = [], value) {
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      if (!isObject) {
        return arr.indexOf(value);
      } else {
        const valueKey = this.valueKey;
        let index = -1;
        arr.some((item, i) => {
          if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
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

    selectOption() {
      if (!this.visible) {
        this.toggleMenu();
      } else {
        if (this.options[this.hoverIndex]) {
          this.handleOptionSelect(this.options[this.hoverIndex]);
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
        } else {
          this.selected.splice(index, 1);
        }
      }
      event.stopPropagation();
    },
    deleteTag2(event, tag) {
      let index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        const value = this.value.slice();
        value.splice(index, 1);
        this.selected.splice(index, 1);
      }
      event.stopPropagation();
    },

    onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },

    onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--;
        this.filteredOptionsCount--;
        this.options.splice(index, 1);
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
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value;
      } else {
        return getValueByPath(item.value, this.valueKey);
      }
    },
    handleOptionCharterSelect(childNodes, option, allSelect) {
      if (!this.multiple) {
        let { value, label } = option;
        this.selected = {
          currentLabel: label,
          value,
          currentValue: value
        };
        this.selectedLabel = label;

        this.$emit('input', value);
        this.emitChange(value);
        this.visible = false;
        if (this.filterable) this.query = this.selectedLabel;
      } else {
        let newvalue = (this.value || []).slice();
        let selectData = (this.selected || []).slice();
        if (this.showFooter) {
          newvalue = this.selected
            .map((item) => {
              return item.value;
            })
            .slice();
        }

        if (!allSelect) {
          let { value, label } = option;
          const optionIndex = this.getValueIndex(newvalue, value);
          if (optionIndex > -1) {
            newvalue.splice(optionIndex, 1);
            selectData.splice(optionIndex, 1);
          } else if (this.multipleLimit <= 0 || newvalue.length < this.multipleLimit) {
            newvalue.push(value);
            selectData.push({
              value: value,
              currentLabel: label,
              currentValue: value
            });
          }
        } else {
          let datacount = option.filter((_) => newvalue.includes(_.value)).length;
          option.forEach((_) => {
            let { value, label } = _;
            const optionIndex = this.getValueIndex(newvalue, value);
            if (datacount === option.length) {
              newvalue.splice(optionIndex, 1);
              selectData.splice(optionIndex, 1);
            }
            if (datacount === 0 || (datacount > 0 && datacount < option.length && optionIndex === -1)) {
              if (this.multipleLimit <= 0 || newvalue.length < this.multipleLimit) {
                newvalue.push(value);
                selectData.push({
                  value: value,
                  currentLabel: label,
                  currentValue: value
                });
              }
            }
          });
        }
        this.selected = selectData;
        if (!this.showFooter) {
          this.emitChange(newvalue);
          this.$emit('input', newvalue);
        }
      }
      this.setSoftFocus();
      if (this.visible) return;
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

    this.$on('handleOptionClick', this.handleOptionSelect);
    this.$on('setSelected', this.setSelected);
    this.$on('handleOptionCharterClick', this.handleOptionCharterSelect);
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
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
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
    if (this.showCharter) {
      this.setCharterSelected();
      this.selectedCopy = this.selected;
    }
  },

  beforeDestroy() {
    if (this.$el && this.handleResize) {
      removeResizeListener(this.$el, this.handleResize);
    }
  }
};
</script>
