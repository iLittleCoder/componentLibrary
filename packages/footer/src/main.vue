<template>
  <footer class="jy-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
  export default {
    name: 'JyFooter',

    componentName: 'JyFooter',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
