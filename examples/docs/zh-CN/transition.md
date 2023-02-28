## 内置过渡动画

组件库内应用在部分组件的过渡动画，你也可以直接使用。在使用之前请阅读<font class='a-in-componet-primary-color' >[transition 组件文档](https://cn.vuejs.org/v2/api/#transition) </font> 。

### fade 淡入淡出

:::demo 提供 `jy-fade-in-linear` 和 `jy-fade-in` 两种效果。

```html
<template>
  <div>
    <jy-button @click="show = !show">Click Me</jy-button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="jy-fade-in-linear">
        <div v-show="show" class="transition-box">.jy-fade-in-linear</div>
      </transition>
      <transition name="jy-fade-in">
        <div v-show="show" class="transition-box">.jy-fade-in</div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      show: true
    })
  };
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #256dff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::

### zoom 缩放

:::demo 提供 `jy-zoom-in-center`，`jy-zoom-in-top` 和 `jy-zoom-in-bottom` 三种效果。

```html
<template>
  <div>
    <jy-button @click="show2 = !show2">Click Me</jy-button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="jy-zoom-in-center">
        <div v-show="show2" class="transition-box">.jy-zoom-in-center</div>
      </transition>

      <transition name="jy-zoom-in-top">
        <div v-show="show2" class="transition-box">.jy-zoom-in-top</div>
      </transition>

      <transition name="jy-zoom-in-bottom">
        <div v-show="show2" class="transition-box">.jy-zoom-in-bottom</div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      show2: true
    })
  };
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #256dff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::

### collapse 展开折叠

使用 `jy-collapse-transition` 组件实现折叠展开效果。

:::demo

```html
<template>
  <div>
    <jy-button @click="show3 = !show3">Click Me</jy-button>

    <div style="margin-top: 20px; height: 200px;">
      <jy-collapse-transition>
        <div v-show="show3">
          <div class="transition-box">jy-collapse-transition</div>
          <div class="transition-box">jy-collapse-transition</div>
        </div>
      </jy-collapse-transition>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      show3: true
    })
  };
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #256dff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::

### 按需引入

```js
// fade/zoom 等
import 'GildataDesign/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'GildataDesign/lib/transitions/collapse-transition';
import Vue from 'vue';

Vue.component(CollapseTransition.name, CollapseTransition);
```
