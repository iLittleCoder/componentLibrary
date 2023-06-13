<template>
  <footer class="gj-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
  export default {
    name: 'GjFooter',

    componentName: 'GjFooter',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
