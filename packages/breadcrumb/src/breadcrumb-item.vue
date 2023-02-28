<template>
  <span class="jy-breadcrumb__item">
    <span :class="['jy-breadcrumb__inner', actived ? 'is-link' : '', disabled ? 'is-disabled' : '']" ref="link" role="link"><slot></slot> </span>
    <i v-if="separatorClass" class="jy-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="jy-breadcrumb__separator" :class="[disabled ? 'is-disabled' : '']" role="presentation">{{ separator }}</span>
  </span>
</template>
<script>
export default {
  name: 'JyBreadcrumbItem',
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

  inject: ['jyBreadcrumb'],

  mounted() {
    this.separator = this.jyBreadcrumb.separator;
    this.separatorClass = this.jyBreadcrumb.separatorClass;
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
