<!--
新增button-group-type: no-border
-->

<template>
  <div class="gj-button-group" :class="{'gj-button-group-no-border' : buttonGroupType === 'no-border' }">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'GjButtonGroup',

    props: {
      buttonGroupType: {
        type: String,
        default: ''
      }
    }
  };
</script>
