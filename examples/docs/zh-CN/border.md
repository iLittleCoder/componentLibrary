<script>
  import bus from '../../bus';
  import { ACTION_USER_CONFIG_UPDATE } from '../../components/theme/constant.js';
  const varMap = {
    '$--box-shadow-light': 'boxShadowLight',
    '$--box-shadow-base': 'boxShadowBase',
    '$--border-radius-base': 'borderRadiusBase',
    '$--border-radius-small': 'borderRadiusSmall'
  };
  const original = {
    boxShadowLight: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    boxShadowBase: '0px 1px 5px 0px rgba(0,0,0,0.1)',
    borderRadiusBase: '4px',
    borderRadiusSmall: '2px'
  };
  export default {
    created() {
      bus.$on(ACTION_USER_CONFIG_UPDATE, this.setGlobal);
    },
    mounted() {
      Bus.$on('changeTheme', val => {
        this.transparent = val === 'White' ? '10%' : '50%';
      }),
      this.setGlobal();
    },
    methods: {
      setGlobal() {
        if (window.userThemeConfig) {
          this.global = window.userThemeConfig.global;
        }
      }
    },
    data() {
      return {
        global: {},
        boxShadowLight: '',
        boxShadowBase: '',
        borderRadiusBase: '',
        borderRadiusSmall: '',
        transparent: localStorage.getItem('theme') ? (localStorage.getItem('theme') === 'White' ? '10%' : '60%') : '10%'
      }
    },
    watch: {
      global: {
        immediate: true,
        handler(value) {
          Object.keys(varMap).forEach((c) => {
            if (value[c]) {
              this[varMap[c]] = value[c]
            } else {
              this[varMap[c]] = original[varMap[c]]
            }
          });
        }
      }
    }
  }
</script>

## Border 边框
<div class="border-cut"></div>
<div class="demo-border-title">
   <div class="demo-term-title">分割线</div>
   <div class="demo-term-title">圆角</div>
</div>
<div class="demo-border-box">
  <table class="demo-border">
    <tbody>
      <tr>
        <td class="text">名称</td>
        <td class="text">粗细</td>
        <td class="line">举例</td>
      </tr>
      <tr>
        <td class="text">实线</td>
        <td class="text">1px</td>
        <td class="line">
          <div class="table-border"></div>
        </td>
      </tr>
      <tr>
        <td class="text">虚线</td>
        <td class="text">1px</td>
        <td class="line">
          <div class="normal-border"></div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="demo-radius">
    <div class="demo-border-none">
      <div class="demo-border-box"></div>
      <div class="demo-border-tip">无圆角</div>
      <div class="demo-border-tip">border-radius: 0px</div>
    </div>
    <div class="demo-border-small">
      <div class="demo-border-box"></div>
      <div class="demo-border-tip">小圆角</div>
      <div class="demo-border-tip">border-radius: 2px</div>
    </div>
    <div class="demo-border-large">
      <div class="demo-border-box"></div>
      <div class="demo-border-tip">大圆角</div>
      <div class="demo-border-tip">border-radius: 4px</div>
    </div>
  </div>
</div>


### 投影
<div class="demo-border">
<table >
    <tbody>
      <tr>
        <td class="text1">类别</td>
        <td class="text1">颜色</td>
        <td class="text1">方向 (x,y)</td>
        <td class="text1">模糊</td>
        <td class="text1">透明度</td>
        <td class="line">适用于场景</td>
      </tr>
      <tr>
        <td class="text1">
          <div class="text-shadow1"></div>
        </td>
        <td class="text1">#000000</td>
        <td class="text1">0，1</td>
        <td class="text1">5</td>
        <td class="text1">{{transparent}}</td>
        <td class="line1">图表浮窗、一级二级菜单、导航等</td>
      </tr>
      <tr>
        <td class="text1">
          <div class="text-shadow2"></div>
        </td>
        <td class="text1">#000000</td>
        <td class="text1">0，8</td>
        <td class="text1">20</td>
        <td class="text1">{{transparent}}</td>
        <td class="line1">适用于各种提示框、通知框、确认框、气泡卡</td>
      </tr>
    </tbody>
  </table>
</div>
  

