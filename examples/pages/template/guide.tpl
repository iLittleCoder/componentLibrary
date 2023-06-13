<style>
  .page-component__scroll {
    height: calc(100% - 60px);
    margin-top: 60px;

    > .gj-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .page-guide {
    padding: 0;
    box-sizing: border-box;


  .page-component__nav {
    width: 250px;
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 60px;
    transition: padding-top .3s;

  > .gj-scrollbar__wrap {
    height: 100%;
    overflow-x: auto;
  }

  &.is-extended {
     padding-top: 0;
   }
  }
    .content {
      margin-left: 250px;
      padding-left: 60px;
      padding-bottom: 60px;
      border-left: 1px solid rgba( 20, 20,20, 0.07);
      h2 {
        margin-bottom: 10px;
      }

      h3 {
        font-size: 22px;
        font-weight: normal;
        margin: 0 0 30px;
        color: #1f2d3d;
      }
      p {
        line-height: 1.6;
        font-size: 14px;
        color: #5e6d82;
      }
      ul {
        margin-bottom: 50px;
        padding-left: 0;
      }
      li {
        font-size: 14px;
        margin-bottom: 10px;
        color: #99a9bf;
        list-style: none;

        &:before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          vertical-align: middle;
          background-color: #5e6d82;
          margin-right: 5px;
        }

        strong {
          color: #5e6d82;
          font-weight: 400;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .page-guide {
      .content {
        padding-left: 0;
      }
    }
  }
</style>
<template>
  <gj-scrollbar class="page-component__scroll" ref="componentScrollBar">
  <div class="page-container page-guide">
    <gj-scrollbar class="page-component__nav">
      <side-nav :data="navsData" :base="`/${ lang }/guide`"></side-nav>
    </gj-scrollbar>
    <router-view class="content"></router-view>
  </div>
  </gj-scrollbar>
</template>
<script>
  export default {
    data() {
      return {
        lang: this.$route.meta.lang,
        navsData: [
          {
            path: '/design',
            name: 'GildataDesign 简介'
          },
          {
            path: '/nav',
            name: '设计价值观'
          }
        ]
      };
    }
  };
</script>
