<template>
  <div class="gj-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`gj-collapse-content-${id}`"
      :aria-describedby ="`gj-collapse-content-${id}`"
    >
      <div
        class="gj-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`gj-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <i
          class="gj-collapse-item__arrow Gildata-s-rightarrow"
          :class="{'is-active': isActive}">
        </i>
        <slot name="title">{{title}}</slot>
        <i @click.stop="handleRightIcon" v-if="rightIcon" :class="[ 'gj-collapse-item__right', rightIcon || '']" />
      </div>
    </div>
    <gj-collapse-transition>
      <div
        class="gj-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`gj-collapse-head-${id}`"
        :id="`gj-collapse-content-${id}`"
      >
        <div class="gj-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </gj-collapse-transition>
  </div>
</template>
<script>
  import GjCollapseTransition from 'GildataDesign/src/transitions/collapse-transition';
  import Emitter from 'GildataDesign/src/mixins/emitter';
  import { generateId } from 'GildataDesign/src/utils/util';

  export default {
    name: 'GjCollapseItem',

    componentName: 'GjCollapseItem',

    mixins: [Emitter],

    components: { GjCollapseTransition },

    data() {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0,
        focusing: false,
        isClick: false,
        id: generateId()
      };
    },

    inject: ['collapse'],

    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      },
      disabled: Boolean,
      rightIcon: String
    },

    computed: {
      isActive() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      }
    },

    methods: {
      handleRightIcon() {
        this.dispatch('GjCollapse', 'rightIcon-click', this);
      },
      handleFocus() {
        setTimeout(() => {
          if (!this.isClick) {
            this.focusing = true;
          } else {
            this.isClick = false;
          }
        }, 50);
      },
      handleHeaderClick() {
        if (this.disabled) return;
        this.dispatch('GjCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
      handleEnterClick() {
        this.dispatch('GjCollapse', 'item-click', this);
      }
    }
  };
</script>
