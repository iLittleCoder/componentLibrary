<template>
  <header class="gj-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'GjHeader',

    componentName: 'GjHeader',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
