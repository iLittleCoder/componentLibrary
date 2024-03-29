import { getFuncText } from '../../tools/utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import { browse } from '../../tools/dom'

export default {
  name: 'VxeSwitch',
  mixins: [vSize],
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean,
    className: String,
    size: { type: String, default: () => GlobalConfig.switch.size || GlobalConfig.size },
    openLabel: String,
    closeLabel: String,
    openValue: { type: [String, Number, Boolean], default: true },
    closeValue: { type: [String, Number, Boolean], default: false },
    openIcon: String,
    closeIcon: String
  },
  inject: {
    $xeform: {
      default: null
    },
    $xeformiteminfo: {
      default: null
    }
  },
  data () {
    return {
      isActivated: false,
      hasAnimat: false,
      offsetLeft: 0
    }
  },
  computed: {
    isChecked () {
      return this.value === this.openValue
    },
    onShowLabel () {
      return getFuncText(this.openLabel)
    },
    offShowLabel () {
      return getFuncText(this.closeLabel)
    },
    styles () {
      return browse.msie && this.isChecked ? {
        left: `${this.offsetLeft}px`
      } : null
    }
  },
  created () {
    if (browse.msie) {
      this.$nextTick(() => this.updateStyle())
    }
  },
  render (h) {
    const { isChecked, vSize, className, disabled, openIcon, closeIcon } = this
    return h('div', {
      class: ['jy-table-switch', className, isChecked ? 'is--on' : 'is--off', {
        [`size--${vSize}`]: vSize,
        'is--disabled': disabled,
        'is--animat': this.hasAnimat
      }]
    }, [
      h('button', {
        ref: 'btn',
        class: 'jy-table-switch--button',
        attrs: {
          type: 'button',
          disabled: disabled
        },
        on: {
          click: this.clickEvent,
          focus: this.focusEvent,
          blur: this.blurEvent
        }
      }, [
        h('span', {
          class: 'jy-table-switch--label jy-table-switch--label-on'
        }, [
          openIcon ? h('i', {
            class: ['jy-table-switch--label-icon', openIcon]
          }) : null,
          this.onShowLabel
        ]),
        h('span', {
          class: 'jy-table-switch--label jy-table-switch--label-off'
        }, [
          closeIcon ? h('i', {
            class: ['jy-table-switch--label-icon', closeIcon]
          }) : null,
          this.offShowLabel
        ]),
        h('span', {
          class: 'jy-table-switch--icon',
          style: this.styles
        })
      ])
    ])
  },
  methods: {
    updateStyle () {
      // 兼容 IE
      this.hasAnimat = true
      this.offsetLeft = this.$refs.btn.offsetWidth
    },
    clickEvent (evnt) {
      if (!this.disabled) {
        clearTimeout(this.activeTimeout)
        const value = this.isChecked ? this.closeValue : this.openValue
        this.hasAnimat = true
        if (browse.msie) {
          this.updateStyle()
        }
        this.$emit('input', value)
        this.$emit('change', { value, $event: evnt })
        // 自动更新校验状态
        if (this.$xeform && this.$xeformiteminfo) {
          this.$xeform.triggerItemEvent(evnt, this.$xeformiteminfo.itemConfig.field, value)
        }
        this.activeTimeout = setTimeout(() => {
          this.hasAnimat = false
        }, 400)
      }
    },
    focusEvent (evnt) {
      this.isActivated = true
      this.$emit('focus', { value: this.value, $event: evnt })
    },
    blurEvent (evnt) {
      this.isActivated = false
      this.$emit('blur', { value: this.value, $event: evnt })
    }
  }
}
