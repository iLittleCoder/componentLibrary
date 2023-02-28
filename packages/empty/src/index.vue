<!--修改点
1、增加emptyType 属性，该值noData(暂无数据，稍后再来) noPermission(您暂时无权限)
   noResult(无搜索结果) noCollect(您还没有收藏，快去收藏吧)
   noFreetime(系统繁忙，请稍后再试) noWifi(网络连接已断开，请稍后再试)
-->

<template>
  <div class="jy-empty">
    <div class="jy-empty__image" :style="imageStyle">
      <img ref="image" v-if="image" :src="image" ondragstart="return false" />
      <slot v-else name="image">
        <!--        <img-empty />-->
        <img
          :class="['image' + emptyType]"
          ref="image"
          v-if="imageUrl"
          :src="imageUrl"
          ondragstart="return false"
        />
      </slot>
    </div>
    <div
      class="jy-empty__description"
      :class="[!imageSize || imageSize <= 160 ? 'empty-mini' : '']"
    >
      <slot v-if="$slots.description" name="description"></slot>
      <div v-else>{{ emptyDescription }}</div>
    </div>
    <div v-if="$slots.default" class="jy-empty__bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ImgEmpty from './img-empty.vue';
const descriptionType = {
  noData: {
    text: '暂无数据，稍后再来',
    url: require('../img/no-data.png')
  },
  noPermission: {
    text: '您暂时无权限',
    url: require('../img/no-permission.png')
  },
  noResult: {
    text: '无搜索结果',
    url: require('../img/no-result.png')
  },
  noCollect: {
    text: '您还没有收藏，快去收藏吧',
    url: require('../img/no-collect.png')
  },
  noFreetime: {
    text: '系统繁忙，请稍后再试',
    url: require('../img/no-busy.png')
  },
  noWifi: {
    text: '网络连接已断开，请稍后再试',
    url: require('../img/no-wifi.png')
  },
  noSubscribe: {
    text: '您暂时无订阅',
    url: require('../img/no-subscribe.png')
  }
};
export default {
  name: 'JyEmpty',
  components: { [ImgEmpty.name]: ImgEmpty },
  data() {
    return {
      typeDescription: '',
      imageUrl: descriptionType.noData.url
    };
  },
  props: {
    emptyType: {
      type: String,
      default: 'noData'
    },
    image: {
      type: String,
      default: ''
    },
    imageSize: Number,
    description: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'White'
    }
  },
  computed: {
    emptyDescription() {
      this.emptyType && this.changeType();
      let data = '暂无数据，稍后再来';
      if (this.description) {
        data = this.description;
      } else {
        if (this.emptyType && descriptionType[this.emptyType]) {
          data = descriptionType[this.emptyType].text;
        }
      }
      return data;
      // return this.description
      //   ? this.description
      //   : this.emptyType && descriptionType[this.emptyType]
      //   ? descriptionType[this.emptyType].text
      //   : '暂无数据，稍后再来';
    },
    imageStyle() {
      return {
        width: this.imageSize ? `${this.imageSize}px` : ''
      };
    }
  },
  mounted() {
    this.changeType();
  },
  methods: {
    changeType() {
      if (this.emptyType && descriptionType[this.emptyType]) {
        this.imageUrl = descriptionType[this.emptyType].url;
      }
    }
  }
};
</script>
