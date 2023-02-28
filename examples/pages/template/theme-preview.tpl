<style lang="scss">
.page-container.page-theme-preview {
  padding-top: 60px;
  height: 100vh;
  width: 1140px;
  margin: 0 auto;
  .display {
    width: 75%;
    display: inline-block;
    vertical-align: top;
    padding-bottom: 100px;
    h3 {
      font-size: 28px;
      margin: 30px 0 0 0;
    }
  }
  .side {
    display: inline-block;
    width: 25%;
    .editor {
      overflow: hidden;
      background: transparent;
      border: 1px solid var(--border-color-base);
      border-radius: 5px;
      margin-bottom: 20px;
      &.fixed {
        position: fixed;
        width: 285px;
        box-sizing: border-box;
      }
    }
    &-right {
      text-align: right;
      padding: 10px 10px;
      border: 1px solid var(--border-color-base);
      background: var(--color-neutral);
    }
  }
}
</style>
<template>
  <jy-scrollbar>
    <div class="page-container page-theme-preview" ref="themePreview">
      <section class="display">
        <basic-tokens-preview> </basic-tokens-preview>
        <components-preview> </components-preview>
      </section>
      <aside class="side">
        <section
          class="editor"
          :style="{ top: `${editorTop}px`, height: `${editorHeight}px` }"
          :class="{ fixed: isFixed }"
        >
          <div class="side-right">
            <jy-button round @click="onReset">重置</jy-button>
            <jy-button round type="primary" @click="onDownload">下载</jy-button>
          </div>
          <jy-scrollbar>
            <main-panel
              :style="{ height: `${editorHeight - 90}px` }"
              v-if="defaultConfig"
              :currentConfig="currentConfig"
              :defaultConfig="defaultConfig"
              :userConfig="userConfig"
              :globalValue="globalValue"
              @onChange="userConfigChange"
            ></main-panel>
          </jy-scrollbar>
        </section>
      </aside>
    </div>
  </jy-scrollbar>
</template>
<script>
import ThemeConfigurator from '../../components/theme-configurator';
import mainPanel from '../../components/theme-configurator/main';
import ComponentsPreview from '../../components/theme/components-preview';
import BasicTokensPreview from '../../components/theme/basic-tokens-preview';
import { filterGlobalValue, filterConfigType } from '../../components/theme-configurator/utils/utils.js';

import bus from '../../bus.js';

import { ACTION_USER_CONFIG_UPDATE } from '../../components/theme/constant.js';
// import themeLoader from '../../components/theme/loader';

import { jyChangeTheme } from '../../../src/utils/change-theme';
import { getTheme } from '../../../src/utils/theme';

export default {
  components: {
    ThemeConfigurator,
    mainPanel,
    BasicTokensPreview,
    ComponentsPreview
  },
  // mixins: [themeLoader],
  data() {
    return {
      previewConfig: {},
      themeConfig: {},
      userTheme: [],
      editorTop: 80,
      editorHeight: 1000,
      isFixed: false,
      defaultConfig: [
        {
          name: 'color',
          config: [
            { type: 'color', name: '1', key: '$--color-primary', value: '#256DFF', category: 'Brand Color', order: 0 },
            {
              type: 'color',
              name: '1',
              key: '$--color-white',
              value: '#FFFFFF',
              category: 'Background Color',
              order: 4
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-black',
              value: '#000000',
              category: 'Background Color',
              order: 4
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-success',
              value: '#35B55F',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-warning',
              value: '#FFAA0E',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-danger',
              value: '#EE5640',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-info',
              value: '#202020',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-neutral',
              value: '#FFFFFF',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-tip',
              value: '#FFFFFF',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-special',
              value: '#FFFFFF',
              category: 'Functional Color',
              order: 1
            }
            // {
            //   type: 'color',
            //   name: '1',
            //   key: '$--color-text-primary',
            //   value: '#303133',
            //   category: 'Font Color',
            //   order: 2
            // },
            // {
            //   type: 'color',
            //   name: '1',
            //   key: '$--color-text-regular',
            //   value: '#606266',
            //   category: 'Font Color',
            //   order: 2
            // },
            // {
            //   type: 'color',
            //   name: '1',
            //   key: '$--color-text-secondary',
            //   value: '#202020',
            //   category: 'Font Color',
            //   order: 2
            // },
            // {
            //   type: 'color',
            //   name: '1',
            //   key: '$--color-text-placeholder',
            //   value: '#C0C4CC',
            //   category: 'Font Color',
            //   order: 2
            // },
            // {
            //   type: 'color',
            //   name: '1',
            //   key: '$--border-color-base',
            //   value: '#DCDFE6',
            //   category: 'Border Color',
            //   order: 3
            // },
            // {
            //   type: 'color',
            //   name: '1',
            //   key: '$--border-color-light',
            //   value: '#E4E7ED',
            //   category: 'Border Color',
            //   order: 3
            // },
            // {
            //   type: 'color',
            //   name: '1',
            //   key: '$--border-color-lighter',
            //   value: '#EBEEF5',
            //   category: 'Border Color',
            //   order: 3
            // },
            // {
            //   type: 'color',
            //   name: '1',
            //   key: '$--border-color-extra-light',
            //   value: '#F2F6FC',
            //   category: 'Border Color',
            //   order: 3
            // },
            // {
            //   type: 'color',
            //   name: '1',
            //   key: '$--background-color-base',
            //   value: '#F5F7FA',
            //   category: 'Background Color',
            //   order: 4
            // }
          ]
        },
        {
          name: 'border',
          config: []
        },
        {
          name: 'typography',
          config: []
        }
      ],
      currentConfig: null,
      userConfig: {
        global: {},
        local: {}
      },
      theme: localStorage.getItem('theme') || 'White'
    };
  },
  computed: {
    globalValue() {
      return filterGlobalValue(this.defaultConfig, this.userConfig);
    },
    defaultConfigOrigin() {
      return [
        {
          name: 'color',
          config: [
            {
              type: 'color',
              name: '1',
              key: '$--color-primary',
              value: this.theme === 'White' ? '#256DFF' : '#f5ba63',
              category: 'Brand Color',
              order: 0
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-white',
              value: '#FFFFFF',
              category: 'Background Color',
              order: 4
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-black',
              value: '#000000',
              category: 'Background Color',
              order: 4
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-success',
              value: '#35B55F',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-warning',
              value: '#FFAA0E',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-danger',
              value: '#EE5640',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-info',
              value: this.theme === 'White' ? '#202020' : '#e6e6e6',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-neutral',
              value: this.theme === 'White' ? '#FFFFFF' : '#15181a',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-tip',
              value: this.theme === 'White' ? '#FFFFFF' : '#2b2b2c',
              category: 'Functional Color',
              order: 1
            },
            {
              type: 'color',
              name: '1',
              key: '$--color-special',
              value: this.theme === 'White' ? '#FFFFFF' : '#202020',
              category: 'Functional Color',
              order: 1
            }
          ]
        },
        {
          name: 'border',
          config: []
        },
        {
          name: 'typography',
          config: []
        }
      ];
    }
  },
  watch: {},
  created() {
    bus.$on('changeTheme', (val) => {
      this.theme = val;
      this.onReset();
    });
    this.initData();
  },
  mounted() {
    this.editorHeight = window.innerHeight - 100;
    this.isFixed = true;
  },
  methods: {
    initData() {
      this.defaultConfig = this.defaultConfigOrigin;
      this.currentConfig = this.defaultConfigOrigin.find((config) => {
        return config.name === 'color';
      });
      this.onAction();
      jyChangeTheme(this.theme);
    },
    onReset() {
      this.userConfig = {
        global: {},
        local: {}
      };
      this.defaultConfig = this.defaultConfigOrigin;
      this.currentConfig = this.defaultConfigOrigin.find((config) => {
        return config.name === 'color';
      });
      this.onAction();
      jyChangeTheme(this.theme);
    },
    userConfigChange(e) {
      this.$set(this.userConfig[filterConfigType(this.currentConfig.name)], e.key, e.value);

      jyChangeTheme(this.theme, {
        [e.key.split('$')[1]]: e.value
      });
      this.onAction();
    },
    onAction() {
      window.userThemeConfig = JSON.parse(JSON.stringify(this.userConfig));
      bus.$emit(ACTION_USER_CONFIG_UPDATE, this.userConfig);
    },
    onDownload() {
      let params = getTheme(this.theme, this.userConfig.global);
      console.log('pram', params);
      this.downloadBlob(params);
    },
    downloadBlob(data) {
      let handleDownload = function(content, name) {
        // 下载保存json文件
        var eleLink = document.createElement('a');
        eleLink.download = name + '.json';
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var data = JSON.stringify(content, undefined, 4);
        var blob = new Blob([data], { type: 'text/json' });
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      };
      handleDownload(data, 'theme');
    }
  }
};
</script>
