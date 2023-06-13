<template>
  <li class="gj-timeline-item" :class="[timeLeftOrRight ? 'gj-timeline-item__time-left-right' : '']">
    <div class="gj-timeline-item__tail" :class="[$parent.dashed ? 'gj-timeline-item__tail--dashed' : '']"></div>

    <div
      v-if="!$slots.dot"
      class="gj-timeline-item__node"
      :class="[
        `gj-timeline-item__node--${size || ''}`,
        `gj-timeline-item__node--${type || ''}`,
        icon ? 'gj-timeline-item__node--has-icon' : ''
      ]"
      :style="{
        backgroundColor: !!bgColor ? bgColor : color,
        color: color
      }"
    >
      <i v-if="icon" class="gj-timeline-item__icon" :class="icon"></i>
    </div>
    <div v-if="$slots.dot" class="gj-timeline-item__dot">
      <slot name="dot"></slot>
    </div>
    <div class="gj-timeline-item__wrapper" ref="current-item" v-show="!timeLeftOrRight">
      <div>
        <div class="gj-timeline-item__content">
          <slot></slot>
        </div>
        <div v-if="!hideTimestamp" class="gj-timeline-item__timestamp " :class="[`is-${placement}`]">
          {{ timestamp }}
        </div>
      </div>
    </div>

    <template v-if="timeLeftOrRight">
      <div class="gj-timeline-item__content" :class="[`is-${placement}`]">
        <slot></slot>
      </div>
      <div class="gj-timeline-item__content-div" :class="[`is-${placement}`]">
        <slot></slot>
      </div>

      <div v-if="!hideTimestamp && placement === 'left'" class="gj-timeline-item__timestamp  is-left ">
        {{ timestamp }}
      </div>

      <div v-if="!hideTimestamp && placement === 'right'" class="gj-timeline-item__timestamp is-right">
        {{ timestamp }}
      </div>

      <div v-if="!hideTimestamp && placement === 'turn'" class="gj-timeline-item__timestamp is-turn">
        {{ timestamp }}
      </div>
    </template>
  </li>
</template>

<script>
export default {
  name: 'GjTimelineItem',

  inject: ['timeline'],

  props: {
    timestamp: String,

    hideTimestamp: {
      type: Boolean,
      default: false
    },

    placement: {
      type: String,
      default: 'bottom'
    },

    type: String,

    color: String,

    size: {
      type: String,
      default: 'normal'
    },

    icon: String,
    bgColor: String
  },
  computed: {
    timeLeftOrRight() {
      return (
        (this.timeline.direction === 'left' || this.timeline.direction === 'right') &&
        (this.placement === 'left' || this.placement === 'right' || this.placement === 'turn')
      );
    }
  }
};
</script>
