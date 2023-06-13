<script>
  import { mix, tintColor, hex2rgb } from '../../color.js';
  const original = {
    White: {
      primary: '#256DFF',
      success: '#35B55F',
      warning: '#FFAA0E',
      danger: '#EE5640',
      info: '#202020',
      white: '#FFFFFF',
      black: '#000000',
      textPrimary: '#202020',
      textRegular: hex2rgb('#202020', 0.65),
      textSecondary: hex2rgb('#202020', 0.45),
      textPlaceholder: hex2rgb('#202020', 0.3),
      borderBase: hex2rgb('#202020', 0.12),
      borderLight: hex2rgb('#202020', 0.07),
      borderLighter: hex2rgb('#202020', 0.04),
      mixList: ['#FFFFFF', '#000000'],
      mixPercent: 88
    },
    Black: {
     primary: '#F5BA63',
     success: '#35B55F',
     warning: '#FFAA0E',
     danger: '#EE5640',
     info: '#E6E6E6',
     white: '#FFFFFF',
     black: '#000000',
     textPrimary: '#E6E6E6',
     textRegular: hex2rgb('#E6E6E6', 0.65),
     textSecondary: hex2rgb('#E6E6E6', 0.45),
     textPlaceholder: hex2rgb('#E6E6E6', 0.3),
     borderBase: hex2rgb('#E6E6E6', 0.12),
     borderLight: hex2rgb('#E6E6E6', 0.07),
     borderLighter: hex2rgb('#E6E6E6', 0.04),
     mixList: ['#FFFFFF', '#000000'],
     mixPercent: 88
   }
  };
  export default {
    created() {},
    mounted() {
      this.setColor();
      Bus.$on('changeTheme', val => {
       this.theme = val;
       this.setColor();
      });
    },
    methods: {
      mix: mix,
      tintColor(color, tint) {
        return tintColor(color, tint);
      },
      setColor() {
       Object.keys(original[this.theme]).forEach((o) => {
          this[o] = original[this.theme][o];
       });
      }
    },
    data() {
      return {
        theme: localStorage.getItem('theme') || 'White',
        primary: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
        white: '',
        black: '',
        textPrimary: '',
        textRegular: '',
        textSecondary: '',
        textPlaceholder: '',
        borderBase: '',
        borderLight: '',
        borderLighter: '',
        mixList: [],
        chartList: ['#81ADFF', '#FCCA6A', '#FF9E9E', '#54D5F0', '#FFB980', '#78E1CD', '#F2A8BD', '#9FE5EF', '#DDCFF8', '#F5E8C8'],
        tagList: {
          White:['#256DFF', '#FF8C00', '#EE5640', '#FFAA0E', '#A25BE6', '#29ABE3', '#7B69FF', '#D69E4B', '#35B55F', '#202020'],
          Black:['#256DFF', '#FF8C00', '#EE5640', '#FFAA0E', '#A25BE6', '#29ABE3', '#7B69FF', '#D69E4B', '#35B55F', '#E6E6E6'],
          bgLast:{
            White:'rgba(32,32,32,0.65)',
            Black:'rgba(230,230,230,0.65)',
          }
        },
        textMap: {
          White: [
           { color: '#202020', text: '主要'},
           { color: hex2rgb('#202020', 0.65), text: '次要'},  
           { color: hex2rgb('#202020', 0.45), text: '提示'},  
          //  { color: '#6E6E6E', text: '标签灰'},  
           { color: hex2rgb('#202020', 0.3), text: '禁用'},
           { color: '#256DFF', text: '链接色'}  
         ],
         Black: [
            { color: '#E6E6E6', text: '主要'},
            { color: hex2rgb('#E6E6E6', 0.65), text: '次要'},  
            { color: hex2rgb('#E6E6E6', 0.45), text: '提示'},  
            // { color: '#6E6E6E', text: '标签灰'},  
            { color: hex2rgb('#E6E6E6', 0.3), text: '禁用'},
            { color: '#F5BA63', text: '链接色'}  
          ]
        },  
        bgMap: {
          White: [
            { color: '#FFFFFF', text: '整体'},
           { color: '#F7F7F7', text: '默认'},
           { color: '#F7F9FC', text: '斑马'},
          //  { color: hex2rgb('#6E6E6E', 0.18), text: '标签'},  
           { color: hex2rgb('#202020', 0.04), text: '禁用'},
           { color: '#202020', text: '提示'}
         ], 
         Black: [
           { color: '#15181A', text: '整体'},
           { color: '#252525', text: '默认'},
           { color: '#1B1D1F', text: '斑马'},
          //  { color: hex2rgb('#6E6E6E', 0.18), text: '标签'},  
           { color: hex2rgb('#E6E6E6', 0.04), text: '禁用'},
           { color: '#E6E6E6', text: '提示'}
         ]
        },
        borderMap: {
          White: [
           { color: hex2rgb('#202020', 0.04), text: '禁用边框'},
          //  { color: hex2rgb('#202020', 0.07), text: '较长线'},
          //  { color: hex2rgb('#202020', 0.12), text: '小边框'},  
           { color: '#EFEFEF', text: '表格边框线'}
         ],
          Black: [
           { color: hex2rgb('#E6E6E6', 0.04), text: '禁用边框'},
          //  { color: hex2rgb('#E6E6E6', 0.07), text: '较长线'},
          //  { color: hex2rgb('#E6E6E6', 0.12), text: '小边框'},  
           { color: '#252525', text: '表格边框线'}
         ]
        }
      }
    }
  }
</script>

## Color 色彩

Gildata Design 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

### 主色

Gildata Design 主要品牌颜色是鲜艳、友好的蓝色。

<gj-row :gutter="12">
  <gj-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box" :style="{ background: primary }">主色
      <div class="value">{{ theme === 'White' ? '#256DFF' : '#F5BA63' }}</div>
      <div class="bg-color-sub">
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in mixList"
          :key="key"
          :style="{ background: mix(primary, item, mixPercent)}">
          {{ key === 0 ? '鼠标悬浮色' : '鼠标按下色' }}
          </div>
      </div>
    </div>
  </gj-col>
</gj-row>

### 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

<gj-row :gutter="12">
  <gj-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: success }"
    >Success<div class="value">#35B55F</div>
      <div class="bg-color-sub">
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in mixList"
          :key="key"
          :style="{ background: mix(success, item, mixPercent)}">
        {{ key === 0 ? '鼠标悬浮色' : '鼠标按下色' }}
      </div>
      </div>
    </div>
  </gj-col>
  <gj-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: warning }"
    >Warning<div class="value">#FFAA0E</div>
      <div class="bg-color-sub">
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in mixList"
          :key="key"
          :style="{ background: mix(warning, item, mixPercent)}">
          {{ key === 0 ? '鼠标悬浮色' : '鼠标按下色' }}
        </div>
      </div>
    </div>
  </gj-col>
  <gj-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: danger }"
    >Danger<div class="value">#EE5640</div>
      <div class="bg-color-sub">
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in mixList"
          :key="key"
          :style="{ background: mix(danger, item, mixPercent)}">
          {{ key === 0 ? '鼠标悬浮色' : '鼠标按下色' }}
        </div>
      </div>
    </div>
  </gj-col>
  <gj-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: info }"
    >Info<div class="value">{{ theme === 'White' ? '#202020' : '#E6E6E6' }}</div>
      <div class="bg-color-sub">
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in mixList"
          :key="key"
          :style="{ background: mix(info, item, mixPercent)}">
          {{ key === 0 ? '鼠标悬浮色' : '鼠标按下色' }}
        </div>
      </div>
    </div>
  </gj-col>
</gj-row>

### 文字色

<gj-row :gutter="12">
  <template v-for="(item, key) in textMap[theme]">
    <gj-col :span="4" :xs="{span: 4}">
      <div class="demo-color-list-box" :class="[ theme === 'Black' && key === 0 && 'demo-black-color', theme === 'Black' && 'demo-dark-color' ]" :style="{ background: item.color }">
        <div>{{item.text}}</div>
        <div>{{item.color}}</div>
      </div>
    </gj-col>
  </template>
</gj-row>

### 背景色

<gj-row :gutter="12">
  <template v-for="(item, key) in bgMap[theme]">
    <gj-col :span="4" :xs="{span: 4}">
      <div class="demo-color-list-box demo-dark-color" :class="[ theme === 'Black' && key === 4 && 'demo-black-color', theme === 'White' && key === 4 && 'demo-white-color' ]" :style="{ background: item.color }">
        <div>{{item.text}}</div>
        <div>{{item.color}}</div>
      </div>
    </gj-col>
  </template>
</gj-row>

### 边框线条色

<gj-row :gutter="12">
  <template v-for="(item, key) in borderMap[theme]">
    <gj-col :span="4" :xs="{span: 4}">
      <div class="demo-color-list-box demo-dark-color" :class="[ theme === 'Black' && key === 3 && 'demo-white-color' ]" :style="{ background: item.color }">
        <div>{{item.text}}</div>
        <div>{{item.color}}</div>
      </div>
    </gj-col>
  </template>
</gj-row>

### Other

中性悬浮、中性按下、滚动条颜色

<gj-row :gutter="12">
  <gj-col :span="4" :xs="{span: 4}">
    <div class="demo-color-list-box demo-dark-color" :style="{ background: theme === 'Black' ? 'rgba(230, 230, 230, 0.12)' : '#F0F0F0'}">
      <div>中性悬浮</div>
      <div>{{theme === 'Black' ? 'rgba(230, 230, 230, 0.12)' : '#F0F0F0'}}</div>
    </div>
  </gj-col>
  <gj-col :span="4" :xs="{span: 4}">
    <div class="demo-color-list-box demo-dark-color" :style="{background: theme === 'Black' ? 'rgba(230, 230, 230, 0.06)' : '#E1E1E1'}">
      <div>中性按下</div>
      <div>{{theme === 'Black' ? 'rgba(230, 230, 230, 0.06)' : '#E1E1E1'}}</div>
    </div>
  </gj-col>
  <gj-col :span="4" :xs="{span: 4}">
     <div class="demo-color-list-box demo-dark-color" :style="{background: theme === 'Black' ? 'rgba(230, 230, 230, 0.3)' : 'rgba(32, 32, 32, 0.5)'}">
       <div>滚动条色</div>
       <div>{{ theme === 'Black' ? 'rgba(230, 230, 230, 0.3)' : 'rgba(32, 32, 32, 0.5)'}}</div>
     </div>
  </gj-col>
</gj-row>

### 图表色

用于各种图表颜色

<gj-row :gutter="12">
  <template v-for="(item, key) in chartList">
    <gj-col :span="2" :xs="{span: 4}">
      <div class="demo-color-list-box" :style="{ background: item }">
        <div>图表{{key+1}}</div>
        <div>{{item}}</div>
      </div>
    </gj-col>
  </template>
</gj-row>

### 标签色

用于各种标签颜色

<gj-row :gutter="12">
  <template v-for="(item, key) in tagList[theme]">
    <gj-col :span="2" :xs="{span: 4}">
      <div class="demo-color-list-box" :style="{ background: tagList[theme].length - 1 === key ? tagList.bgLast[theme] : item}">
        <div>字/线</div>
        <div>{{item}}</div>
      </div>
    </gj-col>
  </template>
</gj-row>
