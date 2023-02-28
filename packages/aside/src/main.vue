<template>
  <aside class="jy-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
  export default {
    name: 'JyAside',

    componentName: 'JyAside',

    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
