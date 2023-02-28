<style scoped>
  .feedback-container {
    margin-top: 60px;
    width: 100%;
    height: calc(100% - 60px);
    box-sizing: border-box;
  }
  .feedback-box {
    box-sizing: border-box;
    background-size: cover;
    background-repeat: no-repeat;
    height: 172px;
    width: 100%;
    padding: 50px 0 0 33px;
    overflow: hidden;
  }
  .feedback-title {
    font-size: 30px;
    font-weight: 600;
    color: #202020;
    line-height: 35px;
    margin-bottom: 20px;
  }
  .feedback-des {
    font-size: 12px;
    font-weight: 400;
    color: rgba(32, 32, 32, 0.65);
    line-height: 17px;
  }
  .feedback-item-list {
    padding-left: 33px;
  }
  .feedback-item-title {
    font-size: 13px;
    font-weight: 600;
    color: #202020;
    line-height: 18px;
    margin: 33px 0 20px 0;
  }
  .feedback-item-box, .feedback-item-person {
    display: flex;
    align-items: center;
  }
  .feedback-item-person {
    margin-right: 33px;
    width: 220px;
    padding: 13px 0 13px 13px;
    background: #F7F9FC;
    border-radius: 3px;
    box-sizing: border-box;
  }
  .feedback-icon {
    width: 35px;
    height: 35px;
    margin-right: 13px;
  }
  .feedback-name {
    font-size: 12px;
    font-weight: 400;
    color: #256DFF;
    line-height: 17px;
  }
  .feedback-email {
    font-size: 12px;
    font-weight: 400;
    color: #202020;
    line-height: 18px;
  }
</style>
<template>
  <div class="feedback-container">
    <div class="feedback-box">
      <div class="feedback-title">反馈</div>
      <div class="feedback-des">Hi，如果遇到问题？欢迎留下您的建议和反馈，帮助我们持续改进 Gildata Design，感谢支持。</div>
    </div>
    <div class="feedback-item-list" v-for="(item, key) in personList" :key="key">
      <div class="feedback-item-title">{{item.type}}</div>
      <div class="feedback-item-box">
        <div class="feedback-item-person" v-for="vals in item.list">
          <img class="feedback-icon" src="~examples/assets/images/ddlogo.svg" alt="">
          <div>
            <div class="feedback-name">{{vals.name}}</div>
            <div class="feedback-email">{{vals.email}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        personList: [{
          type: '开发部',
          list: [
            { name: '王响', email: 'wangxiang@gildata.com' },
            { name: '马新原', email: 'maxinyuan@gildata.com' },
            { name: '江燕', email: 'jiangy@gildata.com' }
          ]
        }, {
          type: '设计部',
          list: [
            { name: '谢丽', email: 'xiel@gildata.com' },
            { name: '王宏亮', email: 'wanghongliang@gildata.com' },
            { name: '朱俊豪', email: 'zhujh17617@hundsun.com' }
          ]
        }
        ]
      };
    }
  };
</script>
