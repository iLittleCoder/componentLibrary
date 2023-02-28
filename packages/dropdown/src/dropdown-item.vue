<template>
  <li
    class="jy-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'jy-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from 'GildataDesign/src/mixins/emitter';

  export default {
    name: 'JyDropdownItem',

    mixins: [Emitter],

    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean,
      icon: String
    },

    methods: {
      handleClick(e) {
        this.dispatch('JyDropdown', 'menu-item-click', [this.command, this]);
      }
    }
  };
</script>
