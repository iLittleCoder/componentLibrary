  /** 该文件存放组件demo */
<template>
  <div style="margin: 20px;">
    <div style="display:flex; align-items: center">
      <p>assist按钮组</p>
      <gj-button-group>
        <gj-button size="large" assist type="success" >上一页</gj-button>
        <gj-button size="large" assist type="success" >中间</gj-button>
        <gj-button size="large" type="success" assist>下一页</gj-button>
      </gj-button-group>
    </div>
    <div style="display: flex; align-items: center">
      <p>type按钮组</p>
      <gj-button-group>
        <gj-button size="large" type="success" >上一页</gj-button>
        <gj-button size="large" type="success" >中间</gj-button>
        <gj-button size="large" type="success">下一页</gj-button>
      </gj-button-group>
    </div>
    <div style="display: flex; align-items: center">
      <p>type按钮组disabled</p>
      <gj-button-group>
        <gj-button size="large" type="success" disabled>上一页</gj-button>
        <gj-button size="large" type="success" disabled>中间</gj-button>
        <gj-button size="large" type="success" disabled>下一页</gj-button>
      </gj-button-group>
    </div>

    <i class="Gildata-fixed2"></i>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Hello Element UI!',
        abc:null
      };
    }
  };
</script>
