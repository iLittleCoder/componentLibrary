<template>
    <div>
        {{active}}
        <gj-steps :active="active" finish-status="success" >
            <gj-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></gj-step>
        </gj-steps>
        <gj-button style="margin: 12px;" @click="next">下一步</gj-button>
        <gj-steps :active="active"  align-center>
            <gj-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></gj-step>
        </gj-steps>
        <gj-button style="margin: 12px;" @click="next">下一步</gj-button>
        <div style="height: 300px;">
            <gj-steps :active="active" direction="vertical"  >
                <gj-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></gj-step>
                <gj-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></gj-step>
                <gj-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></gj-step>
            </gj-steps>
        </div>
        <gj-button style="margin: 12px;" @click="next">下一步</gj-button>
        <gj-steps :active="active" finish-status="success" align-center simple >
            <gj-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></gj-step>
        </gj-steps>
        <gj-steps :active="active" finish-status="success" align-center nav>
            <gj-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></gj-step>
        </gj-steps>
        <gj-steps :active="active"  point>
            <gj-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></gj-step>
            <gj-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></gj-step>
        </gj-steps>
        <div style="height: 300px;">
            <gj-steps :active="active" direction="vertical" point >
                <gj-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></gj-step>
                <gj-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></gj-step>
                <gj-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></gj-step>
            </gj-steps>
        </div>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 1
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
  }
</script>
