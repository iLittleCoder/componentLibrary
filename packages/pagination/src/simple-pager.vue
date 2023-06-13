<template>
  <span class="gj-simple-pager" ref="simplePager">
    <gj-select
      v-if="pageList.length > 1"
      :popper-append-to-body="false"
      popper-class="simple-pager-select"
      :disabled="disabled"
      @change="onPageChange"
      v-model="pageValue"
      placeholder="请选择"
    >
      <gj-option
        v-for="item in pageList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span
          ><i
            class="Gildata-tick optionChecked"
            v-show="pageValue === item.value"
          ></i
          >{{ item.option }}</span
        >
      </gj-option>
    </gj-select>
    <span class="gj-simple-one-pager" v-else>1/1</span>
  </span>
</template>
<script type="text/babel">
export default {
  name: 'GjSimplePager',
  data() {
    return {
      pageList: [],
      pageValue: '1/1',
      pageNumber: 0 // 当前所在页码
    };
  },
  props: {
    currentPage: Number, // 当前所在页码

    pageCount: Number, // 总页数

    disabled: Boolean
  },
  watch: {
    pageCount: {
      immediate: true,
      handler(value) {
        let page = Math.max(1, Number(value));
        this.pageList = [];
        for (let i = 0; i < page; i++) {
          this.pageList.push({
            option: `第${i + 1}页`,
            value: `${i + 1}/${page}`,
            label: `${i + 1}/${page}`
          });
        }
        this.pageValue = `${this.currentPage}/${page}`;
        this.pageNumber = Number(this.pageValue);
      }
    },
    // 前后值不相等
    currentPage: {
      handler(val) {
        if (Number(val) !== this.pageNumber) {
          this.pageValue = `${val}/${Math.max(1, Number(this.pageCount))}`;
          this.pageNumber = Number(val);
        }
      }
    }
  },
  methods: {
    onPageChange(val) {
      let reg = /([^]*)\//;
      let value = val.match(reg)[1];
      this.pageNumber = Number(value);
      this.$emit('change', this.pageNumber);

      // 动态设置输入框的宽度
      // 当长度超过4
      this.$nextTick(() => {
        if (val.length > 4) {
          this.$refs.simplePager.style.width =
            Math.ceil(val.length * 10.5) + 'px';
        } else {
          this.$refs.simplePager.style.width = '44px'; // 默认44px
        }
      });
    }
  }
};
</script>
