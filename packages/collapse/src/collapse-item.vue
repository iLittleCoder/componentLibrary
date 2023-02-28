<template>
  <div class="jy-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`jy-collapse-content-${id}`"
      :aria-describedby ="`jy-collapse-content-${id}`"
    >
      <div
        class="jy-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`jy-collapse-head-${id}`"
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
          class="jy-collapse-item__arrow Gildata-s-rightarrow"
          :class="{'is-active': isActive}">
        </i>
        <slot name="title">{{title}}</slot>
        <i @click.stop="handleRightIcon" v-if="rightIcon" :class="[ 'jy-collapse-item__right', rightIcon || '']" />
      </div>
    </div>
    <jy-collapse-transition>
      <div
        class="jy-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`jy-collapse-head-${id}`"
        :id="`jy-collapse-content-${id}`"
      >
        <div class="jy-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </jy-collapse-transition>
  </div>
</template>
<script>
  import JyCollapseTransition from 'GildataDesign/src/transitions/collapse-transition';
  import Emitter from 'GildataDesign/src/mixins/emitter';
  import { generateId } from 'GildataDesign/src/utils/util';

  export default {
    name: 'JyCollapseItem',

    componentName: 'JyCollapseItem',

    mixins: [Emitter],

    components: { JyCollapseTransition },

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
        this.dispatch('JyCollapse', 'rightIcon-click', this);
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
        this.dispatch('JyCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
      handleEnterClick() {
        this.dispatch('JyCollapse', 'item-click', this);
      }
    }
  };
</script>
