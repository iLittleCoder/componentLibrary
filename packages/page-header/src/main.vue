<template>
  <div class="jy-page-header">
    <div class="jy-page-header__left" @click="$emit('back')">
      <i class="Gildata-leftarrow"></i>
      <div class="jy-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="jy-page-header__subtitle">
        <slot name="title">{{ subtitle }}</slot>
      </div>
    </div>
    <div class="jy-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import { t } from 'GildataDesign/src/locale';
export default {
  name: 'JyPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return t('el.pageHeader.title');
      }
    },
    subtitle: String,
    content: String
  }
};
</script>
