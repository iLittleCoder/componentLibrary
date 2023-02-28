<!--
新增button-group-type: no-border
-->

<template>
  <div class="jy-button-group" :class="{'jy-button-group-no-border' : buttonGroupType === 'no-border' }">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'JyButtonGroup',

    props: {
      buttonGroupType: {
        type: String,
        default: ''
      }
    }
  };
</script>
