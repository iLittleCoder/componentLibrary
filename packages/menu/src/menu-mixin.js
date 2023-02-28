export default {
  inject: ['rootMenu'],
  computed: {
    indexPath() {
      const path = [this.index];
      let parent = this.$parent;
      while (parent.$options.componentName !== 'JyMenu') {
        if (parent.index) {
          path.unshift(parent.index);
        }
        parent = parent.$parent;
      }
      return path;
    },
    parentMenu() {
      let parent = this.$parent;
      while (
        parent &&
        ['JyMenu', 'JySubmenu'].indexOf(parent.$options.componentName) === -1
      ) {
        parent = parent.$parent;
      }
      return parent;
    },
    paddingStyle() {
      if (this.rootMenu.mode !== 'vertical') return {};

      let padding = 8;
      let index = 0;
      let parent = this.$parent;

      if (this.rootMenu.collapse) { // 折叠导航
        padding = 8;
      } else {
        while (parent && parent.$options.componentName !== 'JyMenu') {
          if (parent.$options.componentName === 'JySubmenu') {
            if (index === 0) {
              padding += 24;
            } else {
              padding += 12;
            }
          }
          parent = parent.$parent;
          index++;
        }
      }
      return {paddingLeft: padding + 'px'};
    }
  }
};
