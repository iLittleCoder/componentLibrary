<template>
  <transition-group
    tag="ul"
    :class="[
      'gj-upload-list',
      'gj-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="gj-list"
  >
    <li
      v-for="file in files"
      :class="[
        'gj-upload-list__item',
        'is-' + file.status,
        focusing ? 'focusing' : ''
      ]"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <img
          class="gj-upload-list__item-thumbnail"
          v-if="['picture-card', 'picture'].indexOf(listType) > -1"
          :src="file.url"
          alt=""
        />
        <a
          class="gj-upload-list__item-name"
          :class="[
            file.status === 'uploading'
              ? 'gj-upload-list__item-name--uploading'
              : ''
          ]"
          @click="handleClick(file)"
        >
          <div
            class="gj-upload-list__item-name gj-upload-list__item-name--content"
          >
            <i
              class="Gildata-folder"
              v-if="['picture-card', 'picture'].indexOf(listType) === -1"
            ></i>
            <span class="gj-upload-list__item-file-name ">
              {{ file.name }}</span
            >
          </div>
        </a>
        <label class="gj-upload-list__item-status-label">
          <gj-icon
            v-if="
              listType === 'text' ||
                ['picture-card', 'picture'].indexOf(listType) > -1
            "
            name="Gildata-color-correct1"
          ></gj-icon>
        </label>

        <gj-tooltip
          placement="top"
          ref="tooltip"
          v-if="!disabled && file.status && file.status !== 'uploading'"
        >
          <span slot="content">{{ t('el.upload.deleteTip') }} </span>
          <i class="Gildata-delete" @click="$emit('remove', file)"></i>
        </gj-tooltip>

        <!-- <i
          class="Gildata-delete"
          v-if="!disabled"
          @click="$emit('remove', file)"
        ></i>
        <i class="gj-icon-close-tip" v-if="!disabled">{{
          t('el.upload.deleteTip')
        }}</i> -->
        <!--  -->
        <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
        <gj-progress
          v-if="file.status === 'uploading'"
          :width="listType === 'picture-card' ? 60 : 120"
          :percentage="parsePercentage(file.percentage)"
        >
        </gj-progress>

        <span
          class="gj-upload-list__item-actions"
          v-if="listType === 'picture-card'"
        >
          <span
            class="gj-upload-list__item-preview"
            v-if="handlePreview && listType === 'picture-card'"
            @click="handlePreview(file)"
          >
            <i class="Gildata-enlarged"></i>
          </span>

          <span
            v-if="!disabled"
            class="gj-upload-list__item-delete"
            @click="$emit('remove', file)"
          >
            <i class="Gildata-delete"></i>
          </span>
        </span>
      </slot>
    </li>
  </transition-group>
</template>
<script>
import Locale from 'GildataDesign/src/mixins/locale';
import GjProgress from 'GildataDesign/packages/progress';
import GjTooltip from 'GildataDesign/packages/tooltip';
export default {
  name: 'GjUploadList',

  mixins: [Locale],

  data() {
    return {
      focusing: false
    };
  },
  components: { GjProgress, GjTooltip },

  props: {
    files: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    listType: String
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10);
    },
    handleClick(file) {
      this.handlePreview && this.handlePreview(file);
    }
  }
};
</script>
