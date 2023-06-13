<!--修改点
1、shadow默认值为never 去掉卡片的阴影
2、增加headerStyle 设置header的样式
3、蓝湖设计稿上的全局卡片需要用户自己开发（组件无法控制body的内容）
-->
<template>
  <div class="gj-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="gj-card__header" :style="headerStyle" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="gj-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GjCard',
    props: {
      header: {},
      bodyStyle: {},
      headerStyle: {},
      shadow: {
        type: String,
        default: 'never'
      }
    }
  };
</script>
