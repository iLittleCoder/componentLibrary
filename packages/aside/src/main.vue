<template>
  <aside class="gj-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
  export default {
    name: 'GjAside',

    componentName: 'GjAside',

    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
