## Image 图片
图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等

### 基础用法

:::demo 可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。
```html
<div class="demo-image">
  <div class="block" v-for="fit in fits" :key="fit">
    <span class="demonstration">{{ fit }}</span>
    <jy-image
      style="width: 100px; height: 100px"
      :src="url"
      :fit="fit"></jy-image>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: require('../../assets/images/img-demo.jpg')
      }
    }
  }
</script>
```
:::

### 加载中

:::demo 可通过`slot = placeholder`可自定义加载中，以下示例中的加载中均为手动模拟，仅是为了展示效果
```html
<div class="demo-image__placeholder">
  <div class="block">
    <span class="demonstration">默认</span>
    <jy-image ref="jyImage" @load="load" :src="src"></jy-image>
  </div>
  <div class="block">
    <span class="demonstration">自定义</span>
    <jy-image ref="jyImage1" @load="load" :src="src">
      <div slot="placeholder"  class="image-slot">
        <i class="Gildata-loading"></i>
        <span>加载中</span>
      </div>
    </jy-image>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        src: require('../../assets/images/img-demo.jpg')
      }
    },
    methods: {
      load () {
        // 模拟图片加载中
        this.$refs.jyImage.loading = true
        this.$refs.jyImage1.loading = true
      }   
    } 
  }
</script>
```
:::

### 加载失败

:::demo 可通过`slot = error`可自定义加载失败内容
```html
<div class="demo-image__error">
  <div class="block">
    <span class="demonstration">默认</span>
    <jy-image></jy-image>
  </div>
  <div class="block">
    <span class="demonstration">自定义</span>
    <jy-image>
      <div slot="error" class="image-slot">
        <i class="Gildata-p-loadfailed"></i>
        <span>加载失败</span>
      </div>
    </jy-image>
  </div>
</div>
```
:::

### 懒加载

:::demo 可通过`lazy`开启懒加载功能，当图片滚动到可视范围内才会加载。可通过`scroll-container`来设置滚动容器，若未定义，则为最近一个`overflow`值为`auto`或`scroll`的父元素。
```html
<jy-scrollbar style="height: 400px">
  <jy-image v-for="(url, key) in urls" :key="key" :src="url" lazy></jy-image>
</jy-scrollbar>

<script>
  export default {
    data() {
      return {
        urls: [
          require('../../assets/images/img-demo.jpg'),
          require('../../assets/images/img-demo.jpg'),
          require('../../assets/images/img-demo.jpg')
        ]
      }
    }
  }
</script>
```
:::

### 大图预览

:::demo 可通过 `previewSrcList` 开启预览大图的功能。
```html
<div class="demo-image__preview">
  <jy-image 
    style="width: 100px; height: 100px"
    :src="url" 
    :preview-src-list="srcList">
  </jy-image>
</div>

<script>
  export default {
    data() {
      return {
        url: require('../../assets/images/img-demo.jpg'),
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
        ]
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| src | 图片源，同原生 | string | — | - |
| fit | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string | fill / contain / cover / none / scale-down | - |
| alt | 原生 alt | string | - | - |
| referrer-policy | 原生 referrerPolicy | string | - | - |
| lazy | 是否开启懒加载 | boolean | — | false |
| scroll-container | 开启懒加载后，监听 scroll 事件的容器 | string / HTMLElement | — | 最近一个 overflow 值为 auto 或 scroll 的父元素 |
| preview-src-list | 开启图片预览功能 | Array | — | - |
| z-index | 设置图片预览的 z-index | Number | — | 2000 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |

### Slots
| 名称    | 说明         |
|---------|-------------|
| placeholder | 图片未加载的占位内容 |
| error | 加载失败的内容 |


