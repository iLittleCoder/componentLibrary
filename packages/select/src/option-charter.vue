<template>
  <div class="jy-select-charter" ref="charter" v-if="select.visible">
    <div class="jy-select-charter__header">
      <!-- @select="handleSelect" -->
      <jy-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <jy-menu-item v-for="item in charterList" :key="item" :index="item">
          <span v-for="(ele, index) in item" :key="item + index" @click.stop="handleClick(item, ele)">{{ ele }}</span>
        </jy-menu-item>
      </jy-menu>
      <div class="jy-select-charter__line"></div>
    </div>
    <div class="jy-select-charter__tags">
      <div
        v-if="showFooter && selectMultiple && selected.length && !collapseTags"
        class="jy-m-select__tags-text-top"
        :style="{ 'max-width': charterWidth + 'px' }"
      >
        <template v-for="(item, itemIndex) in selected">
          <jy-tag
            :key="itemIndex"
            :closable="!select.selectDisabled"
            :size="select.collapseTagSize"
            :hit="false"
            type="info"
            @close="select.deleteTag2($event, item)"
            disable-transitions
          >
            <span class="jy-select__tags-text">{{ item.currentLabel }}</span>
          </jy-tag>
        </template>
      </div>

      <div
        v-if="showFooter && selectMultiple && selected.length && collapseTags"
        class="jy-m-select__tags-text-top"
        :style="{ 'max-width': charterWidth + 'px' }"
      >
        <jy-tag
          :closable="!select.selectDisabled"
          :size="select.collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="select.deleteTag2($event, selected[0])"
          disable-transitions
        >
          <span class="jy-select__tags-text">{{ selected[0].currentLabel }}</span>
        </jy-tag>
        <jy-tag
          v-if="selected.length > 1"
          :closable="false"
          :size="select.collapseTagSize"
          type="info"
          disable-transitions
        >
          <span class="jy-select__tags-text">+ {{ selected.length - 1 }}</span>
        </jy-tag>
      </div>

      <div v-if="showFooter && selectMultiple && selected.length" class="jy-select-charter__line"></div>
    </div>

    <jy-scrollbar ref="scrollbarCharter" wrap-class="jy-select-charter__wrap" view-class="jy-select-charter__list">
      <div ref="showAllData">
        <div v-for="(item, index) in allData" :key="index">
          <div
            class="jy-select-charter__letter"
            :class="{ 'is-multiple': selectMultiple, ['at-' + item.initial]: true }"
          >
            <jy-checkbox
              :disabled="allDisabled(item)"
              v-if="selectMultiple"
              :value="allSelect(item)"
              :indeterminate="isIndeterminate(item)"
              @click.native.stop.prevent="selectAllCharterClick(item)"
            ></jy-checkbox>
            <span> {{ item.initial }}</span>
          </div>
          <div
            @click.stop="selectOptionClick(ele)"
            class="jy-select-charter__item"
            v-for="(ele, index) in item.data"
            :key="ele[defaultProps.value] + index"
            :class="{
              'is-disabled': ele.disabled || limitReached,
              'is-multiple': selectMultiple,
              'is-selected':
                (!selectMultiple && selectedValue === ele[defaultProps.value]) ||
                (selectMultiple && selectedValue.includes(ele[defaultProps.value]))
            }"
          >
            <i
              class="Gildata-tick optionChecked"
              v-if="!selectMultiple && selectedValue === ele[defaultProps.value]"
            ></i>
            <jy-checkbox
              :disabled="ele.disabled"
              v-if="selectMultiple"
              :value="selectedValue.includes(ele[defaultProps.value])"
              @click.native.stop.prevent="selectOptionClick(ele)"
            ></jy-checkbox>
            <span> {{ ele[defaultProps.label] }}</span>
          </div>
        </div>
      </div>

      <template v-if="allData.length === 0">
        <slot name="empty" v-if="$slots.empty"></slot>
        <p class="jy-select-dropdown__empty" v-else>
          <jy-empty empty-type="noData"></jy-empty>
        </p>
      </template>
    </jy-scrollbar>
    <div v-if="showFooter && selectMultiple" class="jy-select-reset">
      <span @click="select.resetClick">重置</span>
      <span @click="select.sureClick">确定</span>
    </div>
  </div>
</template>
<script type="text/babel">
import Emitter from 'GildataDesign/src/mixins/emitter';
import JyMenu from 'GildataDesign/packages/menu';
import JyMenuItem from 'GildataDesign/packages/menu-item';
import JyEmpty from 'GildataDesign/packages/empty';
import JyScrollbar from 'GildataDesign/packages/scrollbar';
import JyTag from 'GildataDesign/packages/tag';
import scrollIntoView from 'GildataDesign/src/utils/scroll-into-view';

import { pySegSort, getChineseHeadLetter } from './getPinyin';
export default {
  mixins: [Emitter],
  name: 'JyOptionCharter',
  componentName: 'JyOptionCharter',

  components: {
    JyMenu,
    JyMenuItem,
    JyScrollbar,
    JyEmpty,
    JyTag
  },

  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    charterList: {
      type: Array,
      default: () => {
        return ['ABCDE', 'FGHIJ', 'KLMNO', 'PQRST', 'UVWXYZ'];
      }
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value'
        };
      }
    }
  },

  inject: ['select'],

  data() {
    return {
      activeIndex: this.charterList[0],
      charterWidth: 422
    };
  },
  computed: {
    allData() {
      let data = this.data;
      if (this.select.filterable) {
        if (
          this.select.selectedLabel &&
          !this.select.multiple &&
          !this.select.remoteMethod &&
          !this.select.filterMethod
        ) {
          data = this.data.filter((item) => item[this.defaultProps.label].indexOf(this.select.query) > -1);
        }
        if (this.select.query && this.select.multiple && !this.select.remoteMethod && !this.select.filterMethod) {
          data = this.data.filter((item) => item[this.defaultProps.label].indexOf(this.select.query) > -1);
        }
      }
      return pySegSort(data, this.defaultProps.label);
    },
    showFooter() {
      return this.select.showFooter;
    },
    selectMultiple() {
      return this.select.multiple;
    },
    limitReached() {
      if (this.select.multiple) {
        return (this.select.value || []).length >= this.select.multipleLimit && this.select.multipleLimit > 0;
      } else {
        return false;
      }
    },
    selected() {
      return this.select.selected;
    },
    selectedValue() {
      if (this.select.multiple) {
        let data = [];
        this.select.selected.forEach((item) => {
          data.push(item.value);
        });
        return data;
      } else {
        return this.select.selected.value;
      }
    },

    filterValue() {
      return this.select.query;
    },
    selectVisible() {
      return this.select.visible;
    },
    collapseTags() {
      return this.select.collapseTags;
    }
  },
  watch: {
    filterValue(val) {
      if (val) {
        let letterItem = getChineseHeadLetter(val);
        let index = this.charterList.findIndex((item) => item.indexOf(letterItem) > -1);
        this.activeIndex = this.charterList[index];
      }
    },
    selectVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.charterWidth = this.select.$refs.popper.$el.getBoundingClientRect().width;
          this.defaultScroll();
        });
      }
    }
  },

  methods: {
    handleClick(item, ele) {
      this.activeIndex = item;
      // console.log('bbbbbbbbbbbb');
      let data = this.allData.filter((item) => ele === item.initial);
      if (data.length > 0) {
        let option = document.getElementsByClassName('at-' + ele);
        this.scrollToOption(option[0]);
      } else {
        this.changeScroll();
      }
    },
    handleSelect(val) {
      // console.log('aaaaaaaaaa');
      this.activeIndex = val;
      this.changeScroll();
    },
    changeScroll() {
      let data = this.allData.filter((item) => this.activeIndex.includes(item.initial));
      if (data.length > 0) {
        let option = document.getElementsByClassName('at-' + data[0].initial);
        this.scrollToOption(option[0]);
      }
    },
    defaultScroll() {
      let option = this.$refs.showAllData.getElementsByClassName('jy-select-charter__item is-selected');
      this.scrollToOption(option[0]);
    },

    scrollToOption(option) {
      // const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      const target = option;
      if (this.select.$refs.popper && target) {
        const menu = this.select.$refs.popper.$el.querySelector('.jy-select-charter__wrap');
        scrollIntoView(menu, target);
      }
      this.$refs.scrollbarCharter && this.$refs.scrollbarCharter.handleScroll();
    },

    selectOptionClick(ele) {
      if (this.limitReached !== true && ele.disabled !== true) {
        this.dispatch('JySelect', 'handleOptionCharterClick', [
          this,
          {
            label: ele[this.defaultProps.label],
            value: ele[this.defaultProps.value]
          }
        ]);
      }
    },
    selectAllCharterClick(item) {
      let data = item.data.filter((_) => _.disabled !== true);
      this.dispatch('JySelect', 'handleOptionCharterClick', [this, data, true]);
    },
    initIndex() {
      let resIndex = this.charterList[0];
      if (this.selectMultiple) {
        if (this.select.value) {
          let dataArr = this.data.filter((item) => this.select.value.includes(item[this.defaultProps.value]));
          let letterItem = pySegSort(dataArr, this.defaultProps.label)[0].initial;
          let index = this.charterList.findIndex((item) => item.indexOf(letterItem) > -1);
          resIndex = this.charterList[index];
        } else {
          resIndex = this.charterList[0];
        }
      } else {
        let dataItem = this.data.find((item) => item[this.defaultProps.value] === this.select.value);
        if (dataItem) {
          let letterItem = getChineseHeadLetter(dataItem[this.defaultProps.label]);
          let index = this.charterList.findIndex((item) => item.indexOf(letterItem) > -1);
          resIndex = this.charterList[index];
        } else {
          resIndex = this.charterList[0];
        }
      }
      this.activeIndex = resIndex;
    },
    // 全选禁用
    allDisabled(item) {
      let dataLength = item.data.length;
      let count = item.data.filter((_) => _.disabled === true).length;
      if (dataLength && dataLength === count) {
        return true;
      } else {
        return false;
      }
    },
    isIndeterminate(item) {
      let dataLength = item.data.length;
      let count = item.data.filter((_) => this.selectedValue.includes(_.value)).length;
      if (count > 0) {
        if (dataLength && dataLength === count) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    // 权限字母
    allSelect(item) {
      let dataLength = item.data.length;
      let count = item.data.filter((_) => this.selectedValue.includes(_.value)).length;
      if (dataLength && dataLength === count) {
        return true;
      } else {
        return false;
      }
    }
  },

  created() {
    this.initIndex();
    this.select.options = this.data;
    this.select.cachedOptions = this.data;
  },
  mounted() {}
};
</script>
