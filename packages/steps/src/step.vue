<template>
    <div
            class="jy-step"
            :style="style"
            :class="[
      !isSimple && `is-${$parent.direction}`,
      isSimple && 'is-simple',
      isPoint && 'is-point',
      isNav && 'is-nav',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center',
      'is-' + currentStatus
     ]">

        <!-- icon & line -->
        <div
                class="jy-step__head"
                :class="`is-${currentStatus}`"
        >
            <div
                    class="jy-step__line"
                    :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }"
                    v-if="!isNav"
            >
                <i class="jy-step__line-inner" :style="lineStyle"></i>
            </div>
            <div v-if="isNav" class="Gildata-rightarrow" :class="['is-' + currentStatus]"
                 :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }"></div>
            <div class="jy-step__icon" :class="`is-${icon ? 'icon' : 'text'}`" v-if="!(isSimple)">
                <slot
                        v-if="currentStatus !== 'success' && currentStatus !== 'error'"
                        name="icon">
                    <i v-if="icon" class="jy-step__icon-inner" :class="[icon]"></i>
                    <div class="jy-step__icon-inner" v-if="!icon && !(isSimple)">
                        <template v-if="!isPoint">
                            {{ index + 1 }}
                        </template>
                    </div>
                </slot>
                <i
                        v-else
                        :class="['Gildata-' + (currentStatus === 'success' ? 'correct3' : 'close')]"
                        class="jy-step__icon-inner is-status"
                >
                </i>
                <div class="jy-step__title" v-if="!(isCenter||isVertical)">{{title}}</div>

            </div>
        </div>
        <!-- title & description -->
        <div class="jy-step__main">
            <div
                    v-if="isCenter||isVertical"
                    class="jy-step__title"
                    ref="title"
                    :class="['is-' + currentStatus]">
                <slot name="title">
                  <div class="simple-title">
                     {{ title }}
                  </div>

                </slot>
                <div class="jy-step__description" v-if="isSimple">
                    <slot name="description">{{ description }}</slot>
                </div>
            </div>

            <div v-if="isSimple" class="jy-step__arrow" :class="['is-' + currentStatus]"></div>

            <!--
                  <div v-if="isNav" class="jy-step__arrow"  :class="['is-' + currentStatus]"></div>
            -->
            <div
                    v-if="!(isSimple)"
                    class="jy-step__description"
                    :class="['is-' + currentStatus]">
                <div v-show="!description" style="color: transparent;height: 1px">占位专用</div>
                <slot name="description">{{ description }}</slot>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'JyStep',

    props: {
      title: String,
      icon: String,
      description: String,
      status: String
    },

    data() {
      return {
        index: -1,
        lineStyle: {},
        internalStatus: ''
      };
    },

    beforeCreate() {
      this.$parent.steps.push(this);
    },

    beforeDestroy() {
      const steps = this.$parent.steps;
      const index = steps.indexOf(this);
      if (index >= 0) {
        steps.splice(index, 1);
      }
    },

    computed: {
      currentStatus() {
        return this.status || this.internalStatus;
      },
      prevStatus() {
        const prevStep = this.$parent.steps[this.index - 1];
        return prevStep ? prevStep.currentStatus : 'wait';
      },
      isCenter() {
        return this.$parent.alignCenter || this.isSimple || this.isNav;
      },
      isVertical() {
        return this.$parent.direction === 'vertical';
      },
      isSimple() {
        return this.$parent.simple;
      },
      isNav() {
        return this.$parent.nav;
      },
      isPoint() {
        return this.$parent.point;
      },
      isLast() {
        const parent = this.$parent;
        return parent.steps[parent.steps.length - 1] === this;
      },
      stepsCount() {
        return this.$parent.steps.length;
      },
      space() {
        const {isSimple, $parent: {space}} = this;
        return isSimple ? '' : space;
      },
      style: function() {
        const style = {};
        const parent = this.$parent;
        const len = parent.steps.length;

        const space = (typeof this.space === 'number'
          ? this.space + 'px'
          : this.space
            ? this.space
            : 100 / (len - (this.isCenter ? 0 : 1)) + '%');
        style.flexBasis = space;
        if (this.isVertical) return style;
        if (this.isLast) {
          style.maxWidth = 100 / this.stepsCount + '%';
        } else {
          // style.marginRight = -this.$parent.stepOffset + 'px';
        }

        return style;
      }
    },

    methods: {
      updateStatus(val) {
        const prevChild = this.$parent.$children[this.index - 1];

        if (val > this.index) {
          this.internalStatus = this.$parent.finishStatus;
        } else if (val === this.index && this.prevStatus !== 'error') {
          this.internalStatus = this.$parent.processStatus;
        } else {
          this.internalStatus = 'wait';
        }

        if (prevChild) prevChild.calcProgress(this.internalStatus);
      },

      calcProgress(status) {
        let step = 100;
        const style = {};

        style.transitionDelay = 150 * this.index + 'ms';
        if (status === this.$parent.processStatus) {
          step = this.currentStatus !== 'error' ? 0 : 0;
        } else if (status === 'wait') {
          step = 0;
          style.transitionDelay = (-150 * this.index) + 'ms';
        }

        style.borderWidth = step && !(this.isSimple) ? '1px' : 0;
        this.$parent.direction === 'vertical' ? style.height = 0 + '%' : style.width = 0 + '%';

        this.lineStyle = style;
      }
    },

    mounted() {
      const unwatch = this.$watch('index', val => {
        this.$watch('$parent.active', this.updateStatus, {immediate: true});
        this.$watch('$parent.processStatus', () => {
          const activeIndex = this.$parent.active;
          this.updateStatus(activeIndex);
        }, {immediate: true});
        unwatch();
      });
    }
  };
</script>
