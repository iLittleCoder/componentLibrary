<template>
  <div
    class="gj-switch"
    :class="[
      size ? 'gj-switch--' + size : '',
      {
        'is-disabled': switchDisabled,
        'is-checked': checked
      }
    ]"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="switchDisabled"
    @click.prevent="switchValue"
  >
    <!--input的作用再研究-->
    <input
      class="gj-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @keydown.enter="switchValue"
    >
    <!--显示左边的文字标签-->
    <span
      :class="['gj-switch__label', 'gj-switch__label--left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
    <!--显示中间的switch框-->
    <span class="gj-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
    </span>
    <!--显示右边的文字标签-->
    <span
      :class="['gj-switch__label', 'gj-switch__label--right', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText">
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>
<script>
  import emitter from 'GildataDesign/src/mixins/emitter';
  import Focus from 'GildataDesign/src/mixins/focus';
  import Migrating from 'GildataDesign/src/mixins/migrating';

  export default {
    name: 'GjSwitch',
    // 注入emitter 进行表单验证，  Migrating 用于校验props参数
    mixins: [Focus('input'), Migrating, emitter],
    inject: {
      GjForm: {
        default: ''
      }
    },
    props: {
      // size: mini 默认为空
      size: String,
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 36
      },
      activeIconClass: {
        type: String,
        default: ''
      },
      inactiveIconClass: {
        type: String,
        default: ''
      },
      activeText: String,
      inactiveText: String,
      activeColor: {
        type: String,
        default: ''
      },
      inactiveColor: {
        type: String,
        default: ''
      },
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      },
      name: {
        type: String,
        default: ''
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      id: String
    },
    data() {
      return {
        coreWidth: this.width
      };
    },
    created() {
      // 如果用户传入的v-model的值既不是activeValue也不是inactiveValue时，将inactiveValue传递出去，开关处于关状态
      // ~代表按位非运算符 ~-1 === 0
      if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
        this.$emit('input', this.inactiveValue);
      }
    },
    computed: {
      // this.$emit('input', val) 后会触发checked
      checked() {
        return this.value === this.activeValue;
      },
      switchDisabled() {
        return this.disabled || (this.GjForm || {}).disabled;
      }
    },
    watch: {
      // 监听checked，修改input的checked值
      checked() {
        this.$refs.input.checked = this.checked;
        if (this.activeColor || this.inactiveColor) {
          this.setBackgroundColor();
        }
        // 触发表单的校验
        if (this.validateEvent) {
          this.dispatch('GjFormItem', 'el.form.change', [this.value]);
        }
      }
    },
    methods: {
      handleChange(event) {
        const val = this.checked ? this.inactiveValue : this.activeValue;
        // 修改v-model绑定的值
        this.$emit('input', val);
        this.$emit('change', val);
        this.$nextTick(() => {
          // set input's checked property
          // in case parent refuses to change component's value
          // 修改value值并不是立即生效，而且为了防止父组件未修改值，这里进行了重复赋值
          // https://www.cnblogs.com/fangnianqin/p/10033410.html
          if (this.$refs.input) {
            this.$refs.input.checked = this.checked;
          }
        });
      },
      setBackgroundColor() {
        let newColor = this.checked ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
      switchValue(event) {
        // 在不禁用的状态下才能点击
        !this.switchDisabled && this.handleChange();
      },
      getMigratingConfig() {
        return {
          props: {
            'on-color': 'on-color is renamed to active-color.',
            'off-color': 'off-color is renamed to inactive-color.',
            'on-text': 'on-text is renamed to active-text.',
            'off-text': 'off-text is renamed to inactive-text.',
            'on-value': 'on-value is renamed to active-value.',
            'off-value': 'off-value is renamed to inactive-value.',
            'on-icon-class': 'on-icon-class is renamed to active-icon-class.',
            'off-icon-class': 'off-icon-class is renamed to inactive-icon-class.'
          }
        };
      }
    },
    mounted() {
      /* istanbul ignore if */
      this.coreWidth = this.size === 'mini' ? 28 : (this.width ? this.width : 36);
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
    }
  };
</script>
