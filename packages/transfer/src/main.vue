<template>
  <div class="gj-transfer">
    <transfer-panel
      v-bind="$props"
      ref="leftPanel"
      type="left"
      :showPagination="showPagination"
      :pageSize="pageSize"
      :data="sourceData"
      :title="titles[0] || t('el.transfer.titles.0')"
      :default-checked="leftDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checked-change="onSourceCheckedChange"
    >
      <slot name="left-footer"></slot>
    </transfer-panel>
    <div class="gj-transfer__buttons">
      <gj-button
        v-if="!oneWay"
        type="primary"
        :class="['gj-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToLeft"
        :disabled="rightChecked.length === 0"
      >
        <i class="Gildata-leftarrow"></i>
        <span
          class=" gj-transfer__direction-mr gj-transfer__left "
          v-if="buttonTexts[0] !== undefined"
          >{{ buttonTexts[0] }}</span
        >
      </gj-button>
      <gj-button
        type="primary"
        :class="['gj-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
        :disabled="leftChecked.length === 0"
      >
        <span
          class="gj-transfer__direction-ml gj-transfer__right "
          v-if="buttonTexts[1] !== undefined"
          >{{ buttonTexts[1] }}</span
        >
        <i class="Gildata-rightarrow gj-transfer__direction-icon-ml"></i>
      </gj-button>
    </div>
    <transfer-panel
      v-bind="$props"
      ref="rightPanel"
      type="right"
      :showPagination="showPagination"
      :oneWay="oneWay"
      :pageSize="pageSize"
      :data="targetData"
      :title="titles[1] || t('el.transfer.titles.1')"
      :default-checked="rightDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checked-change="onTargetCheckedChange"
    >
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script>
import GjButton from 'GildataDesign/packages/button';
import Message from 'GildataDesign/packages/message';
import Emitter from 'GildataDesign/src/mixins/emitter';
import Locale from 'GildataDesign/src/mixins/locale';
import TransferPanel from './transfer-panel.vue';
import Migrating from 'GildataDesign/src/mixins/migrating';

export default {
  name: 'GjTransfer',

  mixins: [Emitter, Locale, Migrating],

  components: {
    TransferPanel,
    GjButton
  },

  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    titles: {
      type: Array,
      default() {
        return [];
      }
    },
    buttonTexts: {
      type: Array,
      default() {
        return [];
      }
    },
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    rightDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    renderContent: Function,
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    format: {
      type: Object,
      default() {
        return {};
      }
    },
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          key: 'key',
          disabled: 'disabled'
        };
      }
    },
    targetOrder: {
      type: String,
      default: 'original'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showPagination: Boolean,
    oneWay: Boolean, // 单向页面
    maxLength: Number, // 右侧最大选择个数
    waringText: { // 超过最大个数的提示
      type: String,
      default: '选择个数不能超过最大限制'
    }
  },

  data() {
    return {
      leftChecked: [],
      rightChecked: []
    };
  },

  computed: {
    dataObj() {
      const key = this.props.key;
      return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {});
    },

    sourceData() {
      return this.data.filter(
        (item) => this.value.indexOf(item[this.props.key]) === -1
      );
    },

    targetData() {
      if (this.targetOrder === 'original') {
        return this.data.filter(
          (item) => this.value.indexOf(item[this.props.key]) > -1
        );
      } else {
        return this.value.reduce((arr, cur) => {
          const val = this.dataObj[cur];
          if (val) {
            arr.push(val);
          }
          return arr;
        }, []);
      }
    },

    hasButtonTexts() {
      return this.buttonTexts.length === 2;
    }
  },

  watch: {
    value(val) {
      this.dispatch('GjFormItem', 'el.form.change', val);
    }
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'footer-format': 'footer-format is renamed to format.'
        }
      };
    },

    onSourceCheckedChange(val, movedKeys) {
      this.leftChecked = val;
      if (movedKeys === undefined) return;
      this.$emit('left-check-change', val, movedKeys);
    },

    onTargetCheckedChange(val, movedKeys) {
      this.rightChecked = val;
      if (movedKeys === undefined) return;
      this.$emit('right-check-change', val, movedKeys);
    },

    addToLeft() {
      let currentValue = this.value.slice();
      this.rightChecked.forEach((item) => {
        const index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'left', this.rightChecked);
    },

    addToRight() {
      // 设置了最大值 且 已选项 > 最大值
      if (this.maxLength) {
        let length = this.leftChecked.length + this.value.length;
        if (length > this.maxLength) {
          return Message({
            message: this.waringText,
            type: 'warning'
          });
        }
      }
      let currentValue = this.value.slice();
      const itemsToBeMoved = [];
      const key = this.props.key;
      this.data.forEach((item) => {
        const itemKey = item[key];
        if (
          this.leftChecked.indexOf(itemKey) > -1 &&
          this.value.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey);
        }
      });
      currentValue =
        this.targetOrder === 'unshift'
          ? itemsToBeMoved.concat(currentValue)
          : currentValue.concat(itemsToBeMoved);
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'right', this.leftChecked);
    },

    clearQuery(which) {
      if (which === 'left') {
        this.$refs.leftPanel.query = '';
      } else if (which === 'right') {
        this.$refs.rightPanel.query = '';
      }
    }
  }
};
</script>
