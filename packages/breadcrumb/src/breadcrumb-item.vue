<template>
  <span class="gj-breadcrumb__item">
    <span :class="['gj-breadcrumb__inner', actived ? 'is-link' : '', disabled ? 'is-disabled' : '']" ref="link" role="link"><slot></slot> </span>
    <i v-if="separatorClass" class="gj-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="gj-breadcrumb__separator" :class="[disabled ? 'is-disabled' : '']" role="presentation">{{ separator }}</span>
  </span>
</template>
<script>
export default {
  name: 'GjBreadcrumbItem',
  props: {
    actived: Boolean,
    to: {},
    replace: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      separator: '',
      separatorClass: ''
    };
  },

  inject: ['GjBreadcrumb'],

  mounted() {
    this.separator = this.GjBreadcrumb.separator;
    this.separatorClass = this.GjBreadcrumb.separatorClass;
    const link = this.$refs.link;
    link.setAttribute('role', 'link');
    link.addEventListener('click', (_) => {
      const { to, $router } = this;
      if (!to || !$router) return;
      this.replace ? $router.replace(to) : $router.push(to);
    });
  }
};
</script>
