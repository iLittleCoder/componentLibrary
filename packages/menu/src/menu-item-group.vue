<template>
  <li class="jy-menu-item-group">
    <div class="jy-menu-item-group__title" :style="{paddingLeft: levelPadding + 'px'}">
      <template v-if="!$slots.title">{{title}}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'JyMenuItemGroup',

    componentName: 'JyMenuItemGroup',

    inject: ['rootMenu'],
    props: {
      title: {
        type: String
      }
    },
    data() {
      return {
        paddingLeft: 20
      };
    },
    computed: {
      levelPadding() {
        let padding = 8;
        let parent = this.$parent;
        if (this.rootMenu.collapse) return 8;
        while (parent && parent.$options.componentName !== 'JyMenu') {
          if (parent.$options.componentName === 'JySubmenu') {
            padding += 24;
          }
          parent = parent.$parent;
        }
        return padding;
      }
    }
  };
</script>

