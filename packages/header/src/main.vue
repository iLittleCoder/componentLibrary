<template>
  <header class="jy-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'JyHeader',

    componentName: 'JyHeader',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
