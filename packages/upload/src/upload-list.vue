<template>
  <transition-group
    tag="ul"
    :class="[
      'jy-upload-list',
      'jy-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="jy-list"
  >
    <li
      v-for="file in files"
      :class="[
        'jy-upload-list__item',
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
          class="jy-upload-list__item-thumbnail"
          v-if="['picture-card', 'picture'].indexOf(listType) > -1"
          :src="file.url"
          alt=""
        />
        <a
          class="jy-upload-list__item-name"
          :class="[
            file.status === 'uploading'
              ? 'jy-upload-list__item-name--uploading'
              : ''
          ]"
          @click="handleClick(file)"
        >
          <div
            class="jy-upload-list__item-name jy-upload-list__item-name--content"
          >
            <i
              class="Gildata-folder"
              v-if="['picture-card', 'picture'].indexOf(listType) === -1"
            ></i>
            <span class="jy-upload-list__item-file-name ">
              {{ file.name }}</span
            >
          </div>
        </a>
        <label class="jy-upload-list__item-status-label">
          <jy-icon
            v-if="
              listType === 'text' ||
                ['picture-card', 'picture'].indexOf(listType) > -1
            "
            name="Gildata-color-correct1"
          ></jy-icon>
        </label>

        <jy-tooltip
          placement="top"
          ref="tooltip"
          v-if="!disabled && file.status && file.status !== 'uploading'"
        >
          <span slot="content">{{ t('el.upload.deleteTip') }} </span>
          <i class="Gildata-delete" @click="$emit('remove', file)"></i>
        </jy-tooltip>

        <!-- <i
          class="Gildata-delete"
          v-if="!disabled"
          @click="$emit('remove', file)"
        ></i>
        <i class="jy-icon-close-tip" v-if="!disabled">{{
          t('el.upload.deleteTip')
        }}</i> -->
        <!--  -->
        <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
        <jy-progress
          v-if="file.status === 'uploading'"
          :width="listType === 'picture-card' ? 60 : 120"
          :percentage="parsePercentage(file.percentage)"
        >
        </jy-progress>

        <span
          class="jy-upload-list__item-actions"
          v-if="listType === 'picture-card'"
        >
          <span
            class="jy-upload-list__item-preview"
            v-if="handlePreview && listType === 'picture-card'"
            @click="handlePreview(file)"
          >
            <i class="Gildata-enlarged"></i>
          </span>

          <span
            v-if="!disabled"
            class="jy-upload-list__item-delete"
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
import JyProgress from 'GildataDesign/packages/progress';
import JyTooltip from 'GildataDesign/packages/tooltip';
export default {
  name: 'JyUploadList',

  mixins: [Locale],

  data() {
    return {
      focusing: false
    };
  },
  components: { JyProgress, JyTooltip },

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
