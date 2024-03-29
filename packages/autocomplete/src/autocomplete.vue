<template>
  <div
    class="jy-autocomplete"
    v-clickoutside="close"
    aria-haspopup="listbox"
    role="combobox"
    :aria-expanded="suggestionVisible"
    :aria-owns="id"
  >
    <jy-input
      ref="input"
      v-bind="[$props, $attrs]"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
      @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
      @keydown.enter.native="handleKeyEnter"
      @keydown.native.tab="close"
      @click.native="handleClick"
    >
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </template>
    </jy-input>
    <jy-autocomplete-suggestions
      visible-arrow
      :class="[popperClass ? popperClass : '']"
      :popper-options="popperOptions"
      :append-to-body="popperAppendToBody"
      ref="suggestions"
      :placement="placement"
      :id="id"
    >
      <div v-if="suggestions.length > 0">
        <li
          v-for="(item, index) in suggestions"
          :key="index"
          :class="{ highlighted: highlightedIndex === index }"
          @click="select(item)"
          :id="`${id}-item-${index}`"
          role="option"
          :aria-selected="highlightedIndex === index"
        >
          <slot :item="item">
            {{ item[valueKey] }}
          </slot>
        </li>
      </div>
      <div v-else>
        <jy-empty></jy-empty>
      </div>
    </jy-autocomplete-suggestions>
  </div>
</template>
<script>
import debounce from 'throttle-debounce/debounce';
import JyInput from 'GildataDesign/packages/input';
import JyEmpty from 'GildataDesign/packages/empty';
import Clickoutside from 'GildataDesign/src/utils/clickoutside';
import JyAutocompleteSuggestions from './autocomplete-suggestions.vue';
import Emitter from 'GildataDesign/src/mixins/emitter';
import Migrating from 'GildataDesign/src/mixins/migrating';
import { generateId } from 'GildataDesign/src/utils/util';
import Focus from 'GildataDesign/src/mixins/focus';

export default {
  name: 'JyAutocomplete',

  mixins: [Emitter, Focus('input'), Migrating],

  inheritAttrs: false,

  componentName: 'JyAutocomplete',

  components: {
    JyInput,
    JyEmpty,
    JyAutocompleteSuggestions
  },

  directives: { Clickoutside },

  props: {
    valueKey: {
      type: String,
      default: 'value'
    },
    popperClass: String,
    popperOptions: Object,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    name: String,
    size: String,
    value: String,
    maxlength: Number,
    minlength: Number,
    autofocus: Boolean,
    fetchSuggestions: Function,
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    customItem: String,
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    suffixIcon: String,
    label: String,
    debounce: {
      type: Number,
      default: 300
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    hideLoading: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    highlightFirstItem: {
      type: Boolean,
      default: false
    },
    noHighLight: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activated: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1,
      suggestionDisabled: false
    };
  },
  computed: {
    suggestionVisible() {
      const suggestions = this.suggestions;
      let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
      // 输入框有值时 且loading为false时 显示下拉框
      return (
        ((this.value && !isValidData && !this.loading) ||
          (isValidData || this.loading)) &&
        this.activated
      );
    },
    id() {
      return `jy-autocomplete-${generateId()}`;
    }
  },
  watch: {
    suggestionVisible(val) {
      let $input = this.getInput();
      if ($input) {
        this.broadcast('JyAutocompleteSuggestions', 'visible', [
          val,
          $input.offsetWidth
        ]);
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          'custom-item': 'custom-item is removed, use scoped slot instead.',
          props: 'props is removed, use value-key instead.'
        }
      };
    },
    getData(queryString) {
      if (this.suggestionDisabled) {
        return;
      }
      this.loading = true;
      this.fetchSuggestions(queryString, (suggestions) => {
        this.loading = false;
        if (this.suggestionDisabled) {
          return;
        }
        if (Array.isArray(suggestions)) {
          this.suggestions = suggestions;
          this.highlightedIndex = this.highlightFirstItem ? 0 : -1;
        } else {
          console.error(
            '[Element Error][Autocomplete]autocomplete suggestions must be an array'
          );
        }
      });
    },
    handleInput(value) {
      this.$emit('input', value);
      this.suggestionDisabled = false;
      if (!this.triggerOnFocus && !value) {
        this.suggestionDisabled = true;
        this.suggestions = [];
        return;
      }
      this.debouncedGetData(value);
    },
    handleChange(value) {
      this.$emit('change', value);
    },
    handleFocus(event) {
      this.activated = true;
      this.$emit('focus', event);
      if (this.triggerOnFocus) {
        this.debouncedGetData(this.value);
      }
    },
    handleClick() {
      if (this.triggerOnFocus) {
        this.activated = true;
      }
    },
    handleBlur(event) {
      this.$emit('blur', event);
    },
    handleClear() {
      this.activated = false;
      this.$emit('clear');
    },
    close(e) {
      this.activated = false;
    },
    handleKeyEnter(e) {
      if (
        this.suggestionVisible &&
        this.highlightedIndex >= 0 &&
        this.highlightedIndex < this.suggestions.length
      ) {
        e.preventDefault();
        this.select(this.suggestions[this.highlightedIndex]);
      } else if (this.selectWhenUnmatched) {
        this.$emit('select', { value: this.value });
        this.$nextTick((_) => {
          this.suggestions = [];
          this.highlightedIndex = -1;
        });
      }
    },
    select(item) {
      this.$emit('input', item[this.valueKey]);
      this.$emit('select', item);
      this.$nextTick((_) => {
        this.suggestions = [];
        this.highlightedIndex = -1;
        this.$refs.input.focus();
        this.activated = false;
      });
    },
    blur() {
      this.$refs.input.blur();
    },
    highlight(index) {
      if (!this.noHighLight) {
        return;
      }
      if (!this.suggestionVisible || this.loading) {
        return;
      }
      if (index < 0) {
        this.highlightedIndex = -1;
        return;
      }
      if (index >= this.suggestions.length) {
        index = this.suggestions.length - 1;
      }
      const suggestion = this.$refs.suggestions.$el.querySelector(
        '.jy-autocomplete-suggestion__wrap'
      );
      const suggestionList = suggestion.querySelectorAll(
        '.jy-autocomplete-suggestion__list li'
      );

      let highlightItem = suggestionList[index];
      let scrollTop = suggestion.scrollTop;
      let offsetTop = highlightItem.offsetTop;

      if (
        offsetTop + highlightItem.scrollHeight >
        scrollTop + suggestion.clientHeight
      ) {
        suggestion.scrollTop += highlightItem.scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= highlightItem.scrollHeight;
      }
      this.highlightedIndex = index;
      let $input = this.getInput();
      $input.setAttribute(
        'aria-activedescendant',
        `${this.id}-item-${this.highlightedIndex}`
      );
    },
    getInput() {
      return this.$refs.input.getInput();
    }
  },
  mounted() {
    this.debouncedGetData = debounce(this.debounce, this.getData);
    this.$on('item-click', (item) => {
      this.select(item);
    });
    let $input = this.getInput();
    $input.setAttribute('role', 'textbox');
    $input.setAttribute('aria-autocomplete', 'list');
    $input.setAttribute('aria-controls', 'id');
    $input.setAttribute(
      'aria-activedescendant',
      `${this.id}-item-${this.highlightedIndex}`
    );
  },
  beforeDestroy() {
    this.$refs.suggestions.$destroy();
  }
};
</script>
