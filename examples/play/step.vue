<template>
    <div>
        {{active}}
        <jy-steps :active="active" finish-status="success" >
            <jy-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
        </jy-steps>
        <jy-button style="margin: 12px;" @click="next">下一步</jy-button>
        <jy-steps :active="active"  align-center>
            <jy-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
        </jy-steps>
        <jy-button style="margin: 12px;" @click="next">下一步</jy-button>
        <div style="height: 300px;">
            <jy-steps :active="active" direction="vertical"  >
                <jy-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></jy-step>
                <jy-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></jy-step>
                <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
            </jy-steps>
        </div>
        <jy-button style="margin: 12px;" @click="next">下一步</jy-button>
        <jy-steps :active="active" finish-status="success" align-center simple >
            <jy-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
        </jy-steps>
        <jy-steps :active="active" finish-status="success" align-center nav>
            <jy-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
        </jy-steps>
        <jy-steps :active="active"  point>
            <jy-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
        </jy-steps>
        <div style="height: 300px;">
            <jy-steps :active="active" direction="vertical" point >
                <jy-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></jy-step>
                <jy-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></jy-step>
                <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
            </jy-steps>
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
