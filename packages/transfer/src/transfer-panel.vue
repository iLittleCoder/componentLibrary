<template>
  <div class="jy-transfer-panel">
    <div class="jy-transfer-panel__header">
      <div
        v-if="oneWay && type === 'right'"
        class="jy-transfer-panel__oneWayHeader"
      >
        <span>{{ title }}</span>
        <span @click="handleDelete('all')"><i class="Gildata-delete"></i></span>
      </div>
      <jy-checkbox
        v-else
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate"
      >
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </jy-checkbox>
    </div>

    <div
      :class="['jy-transfer-panel__body', hasFooter ? 'is-with-footer' : '']"
    >
      <jy-input
        class="jy-transfer-panel__filter"
        v-model="query"
        size="mini"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable"
      >
        <i
          slot="suffix"
          :class="['jy-input__icon', inputIcon]"
          @click="clearQuery"
        ></i>
      </jy-input>
      <jy-scrollbar
        v-show="!hasNoMatch && data.length > 0"
        class="jy-transfer-panel__scrollbar"
        :class="{ 'is-filterable': filterable }"
      >
        <div v-if="oneWay && type === 'right'" class="jy-transfer-panel__list">
          <div
            class="jy-transfer-panel__delItem"
            v-for="item in currentList"
            :key="item[keyProp]"
          >
            <span>{{ item[labelProp] || item[keyProp] }}</span>
            <span
              @click="handleDelete('item', item[keyProp])"
              class="jy-transfer-panel__del"
              ><i class="Gildata-close"
            /></span>
          </div>
        </div>
        <jy-checkbox-group
          v-else
          v-model="checked"
          class="jy-transfer-panel__list"
        >
          <jy-checkbox
            :class="[
              'jy-transfer-panel__item',
              oneWay && type === 'right' ? 'is-oneWay' : ''
            ]"
            :label="item[keyProp]"
            :disabled="item[disabledProp]"
            :key="item[keyProp]"
            v-for="item in currentList"
          >
            <option-content :option="item"></option-content>
            <!--        <option-content :oneWay="oneWay" :type="type" :option="item"></option-content>-->
          </jy-checkbox>
        </jy-checkbox-group>
      </jy-scrollbar>

      <jy-empty
        v-show="hasNoMatch || (data.length === 0 && !hasNoMatch)"
        empty-type="noData"
        description="暂无数据"
      ></jy-empty>
    </div>
    <jy-pagination
      v-if="showPagination"
      :page-size="pageSize"
      layout="prev, simple, next"
      @current-change="paginationChange"
      :total="filteredData.length"
    >
    </jy-pagination>

    <p class="jy-transfer-panel__footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script>
import Jyscrollbar from 'GildataDesign/packages/scrollbar';
import JyPagination from 'GildataDesign/packages/pagination';
import JyCheckboxGroup from 'GildataDesign/packages/checkbox-group';
import JyEmpty from 'GildataDesign/packages/empty';
import JyCheckbox from 'GildataDesign/packages/checkbox';
import JyInput from 'GildataDesign/packages/input';
import Locale from 'GildataDesign/src/mixins/locale';

export default {
  mixins: [Locale],

  name: 'JyTransferPanel',

  componentName: 'JyTransferPanel',

  components: {
    Jyscrollbar,
    JyPagination,
    JyCheckboxGroup,
    JyCheckbox,
    JyInput,
    JyEmpty,
    OptionContent: {
      props: {
        option: Object,
        oneWay: Boolean,
        type: String
      },
      methods: {
        optionDel($event, instance, key) {
          $event.stopPropagation();
          $event.preventDefault();
          instance.handleDelete(key);
        }
      },
      render(h) {
        const getParent = (vm) => {
          if (vm.$options.componentName === 'JyTransferPanel') {
            return vm;
          } else if (vm.$parent) {
            return getParent(vm.$parent);
          } else {
            return vm;
          }
        };
        const panel = getParent(this);
        const transfer = panel.$parent || panel;
        // let delIcon = this.oneWay && this.type === 'right' ? <span onClick={ $event => this.optionDel($event, panel, this.option[panel.keyProp]) } class='jy-transfer-panel__del'><i class='Gildata-close'/></span> : '';
        return panel.renderContent ? (
          panel.renderContent(h, this.option)
        ) : transfer.$scopedSlots.default ? (
          transfer.$scopedSlots.default({ option: this.option })
        ) : (
          <span>
            {this.option[panel.labelProp] || this.option[panel.keyProp]}
          </span>
        );
      }
    }
  },

  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    renderContent: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    defaultChecked: Array,
    props: Object,
    type: String,
    showPagination: Boolean,
    oneWay: Boolean,
    pageSize: Number
  },

  data() {
    return {
      checked: [],
      allChecked: false,
      query: '',
      inputHover: false,
      checkChangeByUser: true,
      currentPage: 1, // 当前页
      pageList: [] // 当前页的数据
    };
  },

  watch: {
    // 当左右移动数据时
    filteredData: {
      deep: true,
      handler(val, old) {
        if (this.showPagination) {
          if (val.length === 0) {
            this.currentPage = 1;
          }
          // 当前页 数据在减少 并且减少之前只剩一条数据，且currentPage>1, 此时currentPage要减1
          if (
            old.length > val.length &&
            this.pageList.length === 1 &&
            this.currentPage > 1
          ) {
            this.currentPage -= 1;
          }
          this.handlePageList();
        }
      }
    },
    currentPage: {
      immediate: true,
      handler(val) {
        if (this.showPagination) {
          this.handlePageList();
        }
      }
    },
    checked(val, oldVal) {
      this.updateAllChecked();
      if (this.checkChangeByUser) {
        const movedKeys = val
          .concat(oldVal)
          .filter((v) => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
        this.$emit('checked-change', val, movedKeys);
      } else {
        this.$emit('checked-change', val);
        this.checkChangeByUser = true;
      }
    },

    data() {
      const checked = [];
      const filteredDataKeys = this.filteredData.map(
        (item) => item[this.keyProp]
      );
      this.checked.forEach((item) => {
        if (filteredDataKeys.indexOf(item) > -1) {
          checked.push(item);
        }
      });
      this.checkChangeByUser = false;
      this.checked = checked;
    },

    checkableData() {
      this.updateAllChecked();
    },

    defaultChecked: {
      immediate: true,
      handler(val, oldVal) {
        if (
          oldVal &&
          val.length === oldVal.length &&
          val.every((item) => oldVal.indexOf(item) > -1)
        ) {
          return;
        }
        const checked = [];
        const checkableDataKeys = this.checkableData.map(
          (item) => item[this.keyProp]
        );
        val.forEach((item) => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checkChangeByUser = false;
        this.checked = checked;
      }
    }
  },

  computed: {
    currentList() {
      // 有分页
      if (this.showPagination) {
        return this.pageList;
      } else {
        // 无分页
        return this.filteredData;
      }
    },
    filteredData() {
      return this.data.filter((item) => {
        if (typeof this.filterMethod === 'function') {
          return this.filterMethod(this.query, item);
        } else {
          const label = item[this.labelProp] || item[this.keyProp].toString();
          return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }
      });
    },

    checkableData() {
      return this.filteredData.filter((item) => !item[this.disabledProp]);
    },

    checkedSummary() {
      const checkedLength = this.checked.length;
      const dataLength = this.data.length;
      const { noChecked, hasChecked } = this.format;
      if (noChecked && hasChecked) {
        let showData = hasChecked
          .replace(/\${checked}/g, checkedLength)
          .replace(/\${total}/g, dataLength);
        return checkedLength > 0
          ? showData
          : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return `${checkedLength}/${dataLength}`;
      }
    },

    isIndeterminate() {
      const checkedLength = this.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    },

    hasNoMatch() {
      return this.query.length > 0 && this.filteredData.length === 0;
    },

    inputIcon() {
      return this.query.length > 0 && this.inputHover
        ? 'Gildata-clean'
        : 'Gildata-search1';
    },

    labelProp() {
      return this.props.label || 'label';
    },

    keyProp() {
      return this.props.key || 'key';
    },

    disabledProp() {
      return this.props.disabled || 'disabled';
    },

    hasFooter() {
      return !!this.$slots.default;
    }
  },

  methods: {
    handleDelete(type, key) {
      // 删除全部 传递全部的value值，删除单个 只传递选中的值
      this.$emit(
        'checked-change',
        type === 'all' ? this.$parent.value.slice() : [key]
      );
      this.$parent.addToLeft(); // 执行向左穿梭的方法
    },
    paginationChange(val) {
      this.currentPage = val;
    },
    handlePageList() {
      let val = this.currentPage;
      let num = val * this.pageSize;
      let pre = val > 1 ? (val - 1) * this.pageSize : 0; // 获取前一页的下标
      this.pageList = this.filteredData.slice(pre, num);
    },
    updateAllChecked() {
      const checkableDataKeys = this.checkableData.map(
        (item) => item[this.keyProp]
      );
      this.allChecked =
        checkableDataKeys.length > 0 &&
        checkableDataKeys.every((item) => this.checked.indexOf(item) > -1);
    },

    handleAllCheckedChange(value) {
      this.checked = value
        ? this.checkableData.map((item) => item[this.keyProp])
        : [];
    },

    clearQuery() {
      if (this.inputIcon === 'Gildata-clean') {
        this.query = '';
      }
    }
  }
};
</script>
