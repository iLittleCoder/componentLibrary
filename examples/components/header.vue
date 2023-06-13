<template>
  <div class="headerWrapper">
    <!--    <div id="idText">测试颜色</div>-->
    <!--    <div id="v3-banner" v-if="isHome">-->
    <!--      <template v-if="lang === 'zh-CN'">-->
    <!--        您正在浏览基于 Vue 2.x 的 Element UI 文档;-->
    <!--        <a href="https://element-plus.org/#/zh-CN">点击这里</a> 查看 Vue 3.x 的升级版本-->
    <!--      </template>-->
    <!--      <template v-else>-->
    <!--        You’re browsing the documentation of Element UI for Vue 2.x version.-->
    <!--        <a href="https://element-plus.org">Click here</a> for Vue 3.x version-->
    <!--      </template>-->
    <!--    </div>-->
    <header class="header" ref="header">
      <div class="container">
        <h1>
          <router-link :to="`/zh-CN/guide/design`">
            <!-- logo -->
            <slot>
              <div class="logo-box">
                <img src="../assets/images/gildata-logo.svg" alt="Gildata-logo" class="nav-logo" />
                <span class="logo-name">Gildata Design</span>
              </div>
            </slot>
          </router-link>
        </h1>
        <!-- nav -->
        <ul class="nav">
          <li class="nav-item nav-algolia-search" v-show="isComponentPage">
            <algolia-search></algolia-search>
          </li>
          <div class="nav-item-box">
            <li class="nav-item">
              <gj-button secondary type="primary" @click="changeTheme">换肤</gj-button>
            </li>
            <li class="nav-item">
              <router-link active-class="active" :to="`/${lang}/guide`">{{ langConfig.guide }} </router-link>
            </li>
            <li class="nav-item">
              <router-link active-class="active" :to="`/${lang}/component`">{{ langConfig.components }} </router-link>
            </li>
            <li class="nav-item">
              <router-link active-class="active" :to="`/${lang}/feedback`" exact>反馈 </router-link>
            </li>
            <li class="nav-item">
              <router-link active-class="active" :to="`/${lang}/theme/preview`" exact>主题 </router-link>
            </li>
            <!--             版本选择器 -->
            <li class="nav-item">
              <gj-dropdown trigger="click" class="nav-dropdown" :class="{ 'is-active': verDropdownVisible }">
                <div class="nav-version">
                  <span>{{ version }}</span> <i class="Gildata-downarrow el-icon--right" />
                </div>
                <gj-dropdown-menu slot="dropdown" class="nav-dropdown-list" @input="handleVerDropdownToggle">
                  <gj-dropdown-item
                    v-for="item in Object.keys(versions)"
                    :key="item"
                    @click.native="switchVersion(item)"
                  >
                    {{ item }}
                  </gj-dropdown-item>
                </gj-dropdown-menu>
              </gj-dropdown>
            </li>
          </div>

          <!--          <li -->
          <!--            class="nav-item nav-item-theme"-->
          <!--          >-->
          <!--            <router-link-->
          <!--              active-class="active"-->
          <!--              :to="`/${ lang }/theme`">{{ langConfig.theme }}-->
          <!--            </router-link>-->
          <!--          </li>-->

          <!--          <li class="nav-item">-->
          <!--            <router-link-->
          <!--              active-class="active"-->
          <!--              :to="`/${ lang }/resource`"-->
          <!--              exact>{{ langConfig.resource }}-->
          <!--            </router-link>-->
          <!--          </li>-->
          <!-- gap -->
          <!--          <li class="nav-item" v-show="isComponentPage">-->
          <!--            <div class="nav-gap"></div>-->
          <!--          </li>-->

          <!-- 语言选择器 -->
          <!--          <li class="nav-item lang-item">-->
          <!--            <gj-dropdown-->
          <!--              trigger="click"-->
          <!--              class="nav-dropdown nav-lang"-->
          <!--              :class="{ 'is-active': langDropdownVisible }">-->
          <!--              <span>-->
          <!--                {{ displayedLang }}-->
          <!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--              </span>-->
          <!--              <gj-dropdown-menu-->
          <!--                slot="dropdown"-->
          <!--                class="nav-dropdown-list"-->
          <!--                @input="handleLangDropdownToggle">-->
          <!--                <gj-dropdown-item-->
          <!--                  v-for="(value, key) in langs"-->
          <!--                  :key="key"-->
          <!--                  @click.native="switchLang(key)">-->
          <!--                  {{ value }}-->
          <!--                </gj-dropdown-item>-->
          <!--              </gj-dropdown-menu>-->
          <!--            </gj-dropdown>-->
          <!--          </li>-->
        </ul>
      </div>
    </header>
  </div>
</template>
<style lang="scss" scoped>
#idText {
  background-color: mix(#000000, #256dff, 12%);
}

.headerWrapper {
  height: 60px;
}

#v3-banner {
  background-color: #256dff;
  min-height: 30px;
  padding: 5px 60px;
  z-index: 19;
  box-sizing: border-box;
  text-align: center;
  color: #eee;
}

#v3-banner a {
  color: #fff;
  font-weight: bold;
}

.header {
  height: 60px;
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  position: relative;

  .container {
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(32, 32, 32, 0.07);
  }

  .nav-lang-spe {
    color: #888;
  }

  h1 {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: normal;

    a {
      color: #333;
      text-decoration: none;
      display: block;
    }

    span {
      font-size: 12px;
      display: inline-block;
      width: 34px;
      height: 18px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      text-align: center;
      line-height: 18px;
      vertical-align: middle;
      margin-left: 10px;
      border-radius: 3px;
    }
  }

  .nav {
    height: 100%;
    background: transparent;
    padding: 0;
    margin: 0;
    &::before,
    &::after {
      display: table;
      content: '';
    }
    &::after {
      clear: both;
    }
  }

  .nav-gap {
    position: relative;
    width: 1px;
    height: 60px;
    padding: 0 20px;

    &::before {
      content: '';
      position: absolute;
      top: calc(50% - 8px);
      width: 1px;
      height: 16px;
      background: #ebebeb;
    }
  }

  .logo-box {
    display: flex;
    align-items: center;
    height: 60px;
    margin-left: 40px;
    .nav-logo {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
    .logo-name {
      margin-left: 0;
      font-size: 20px;
      font-weight: 600;
      color: #202020;
      width: fit-content;
      font-family: PingFangSC-Regular, sans-serif;
    }
  }

  .nav-logo,
  .nav-logo-small {
    vertical-align: sub;
  }

  .nav-logo-small {
    display: none;
  }

  .nav-item-box {
    float: right;
    display: flex;
    align-items: center;
    font-weight: 600;
    margin-top: 16px;
    margin-right: 40px;
  }

  .nav-item {
    margin: 0;
    list-style: none;
    position: relative;
    cursor: pointer;
    margin-left: 40px;

    &.nav-algolia-search {
      cursor: default;
      margin-left: 60px;
      margin-top: 16px;
      float: left;
    }

    .nav-version {
      display: flex;
      align-items: center;
      height: 28px;
    }

    &.lang-item,
    &:last-child {
      cursor: default;

      .nav-lang {
        cursor: pointer;
        display: inline-block;
        height: 100%;
        color: #888;

        &:hover {
          color: #256dff;
        }
        &.active {
          font-weight: bold;
          color: #256dff;
        }
      }
    }

    a {
      font-size: 14px;
      text-decoration: none;
      color: #202020;
      display: block;
      padding: 0 8px;
      height: 28px;
      line-height: 28px;

      &:hover {
        background: #f0f0f0;
        border-radius: 4px;
      }

      &.active {
        color: #256dff;
      }

      &.active::after {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: -16px;
        left: 8px;
        width: calc(100% - 16px);
        height: 2px;
        background: #256dff;
      }
    }
  }
}

.nav-dropdown {
  width: 100%;

  span {
    display: block;
    width: 100%;
    font-size: 14px;
    color: #202020;
    line-height: 28px;
    transition: 0.2s;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    transition: 0.2s;
    font-size: 16px;
    color: rgba(20, 20, 20, 0.65);
  }

  .is-active {
    span,
    i {
      color: #256dff;
    }
    i {
      transform: rotateZ(180deg) translateY(3px);
    }
  }

  &:hover {
    span,
    i {
      color: #256dff;
    }
  }
}

.nav-dropdown-list {
  width: auto;
}
</style>

<script>
import ThemePicker from './theme-picker.vue';
import AlgoliaSearch from './search.vue';
import compoLang from '../i18n/component.json';
import Element from 'main/index.js';
import themeLoader from './theme/loader';
import bus from '../bus';
import { jyChangeTheme } from '../../src/utils/change-theme';
import { ACTION_USER_CONFIG_UPDATE } from './theme/constant.js';

const { version } = Element;

export default {
  data() {
    return {
      active: '',
      versions: [],
      version,
      verDropdownVisible: true,
      langDropdownVisible: true,
      langs: {
        'zh-CN': '中文',
        'en-US': 'English',
        es: 'Español',
        'fr-FR': 'Français'
      },
      theme: localStorage.getItem('theme')
    };
  },

  mixins: [themeLoader],

  components: {
    ThemePicker,
    AlgoliaSearch
  },

  computed: {
    lang() {
      return this.$route.path.split('/')[1] || 'zh-CN';
    },
    displayedLang() {
      return this.langs[this.lang] || '中文';
    },
    langConfig() {
      return compoLang.filter((config) => config.lang === this.lang)[0]['header'];
    },
    isComponentPage() {
      return /^component/.test(this.$route.name);
    },
    isHome() {
      return /^home/.test(this.$route.name);
    }
  },
  mounted() {
    jyChangeTheme(this.theme);
    // const testInnerImg = new Image();
    // testInnerImg.onload = () => {
    //   this.$isEle = true;
    //   ga('send', 'event', 'DocView', 'Ali', 'Inner');
    // };
    // testInnerImg.onerror = (err) => {
    //   ga('send', 'event', 'DocView', 'Ali', 'Outer');
    //   console.error(err);
    // };
    // testInnerImg.src = `https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/rmsportal/VmvVUItLdPNqKlNGuRHi.png?t=${Date.now()}`;
  },
  methods: {
    changeTheme() {
      // 去掉旧类型
      document.body.classList.remove(`${this.theme}Theme`);
      this.theme = this.theme === 'Black' ? 'White' : 'Black';
      localStorage.setItem('theme', this.theme);
      window.Bus.$emit('changeTheme', this.theme);
      // 添加旧类型
      document.body.classList.add(`${this.theme}Theme`);

      jyChangeTheme(this.theme);
    },
    switchVersion(version) {
      if (version === this.version) return;
      // 本地开发环境
      if (!location.href.includes('gildataDesign')) return;
      // 跳转到对应的版本
      location.href = location.href.replace('/gildataDesign/', `/gildataDesign${version}/`);
    },

    switchLang(targetLang) {
      if (this.lang === targetLang) return;
      localStorage.setItem('ELEMENT_LANGUAGE', targetLang);
      this.$router.push(this.$route.path.replace(this.lang, targetLang));
    },

    handleVerDropdownToggle(visible) {
      this.verDropdownVisible = visible;
    },

    handleLangDropdownToggle(visible) {
      this.langDropdownVisible = visible;
    }
  },

  created() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (_) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const versions = JSON.parse(xhr.responseText);
        this.versions = Object.keys(versions).reduce((prev, next) => {
          prev[next] = versions[next];
          return prev;
        }, {});
        console.log(this.versions, 'this.versions');
      }
    };
    xhr.open('GET', './versions.json');
    xhr.send();

    let primaryLast = '#256DFF';
    bus.$on(ACTION_USER_CONFIG_UPDATE, (val) => {
      let primaryColor = val.global['$--color-primary'];
      if (!primaryColor) primaryColor = '#256DFF';
      const base64svg = 'data:image/svg+xml;base64,';
      const imgSet = document.querySelectorAll('h1 img');
      imgSet.forEach((img) => {
        img.src = `${base64svg}${window.btoa(
          window.atob(img.src.replace(base64svg, '')).replace(primaryLast, primaryColor)
        )}`;
      });
      primaryLast = primaryColor;
    });
  }
};
</script>
