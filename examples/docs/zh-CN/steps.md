## Steps 步骤条
引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法

简单的步骤条。

:::demo 设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始。需要定宽的步骤条时，设置`space`属性即可，它接受`Number`，单位为`px`，如果不设置，则为自适应。设置`finish-status`属性可以改变已经完成的步骤的状态。
```html
<jy-steps :active="active" finish-status="success">
  <jy-step title="步骤 1"></jy-step>
  <jy-step title="步骤 2"></jy-step>
  <jy-step title="步骤 3"></jy-step>
</jy-steps>

<jy-button style="margin-top: 12px;" @click="next">下一步</jy-button>

<script>
  export default {
    data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
  }
</script>
```
:::

### 含状态步骤条

每一步骤显示出该步骤的状态。

:::demo 也可以使用`title`具名分发，可以用`slot`的方式来取代属性的设置，在本文档最后的列表中有所有的 slot name 可供参考。
```html
<jy-steps :space="200" :active="1" finish-status="success">
  <jy-step title="已完成"></jy-step>
  <jy-step title="进行中"></jy-step>
  <jy-step title="步骤 3"></jy-step>
</jy-steps>

<script>
    export default {
        data() {
            return {
                active: 0
            };
        },
    }

</script>
```
:::

### 有描述的步骤条

每个步骤有其对应的步骤状态描述。

:::demo
```html
<jy-steps :active="1">
  <jy-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></jy-step>
  <jy-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></jy-step>
  <jy-step title="步骤 3" description="这段就没那么长了"></jy-step>
</jy-steps>

<script>
    export default {
        data() {
            return {
                active: 0
            };
        },
    }

</script>
```
:::

### 居中的步骤条

标题和描述都将居中。

:::demo
```html
<jy-steps :active="2" align-center>
  <jy-step title="步骤1" description="这是一段很长很长很长的描述性文字"></jy-step>
  <jy-step title="步骤2" description="这是一段很长很长很长的描述性文字"></jy-step>
  <jy-step title="步骤3" description="这是一段很长很长很长的描述性文字"></jy-step>
  <jy-step title="步骤4" description="这是一段很长很长很长的描述性文字"></jy-step>
</jy-steps>

<script>
    export default {
        data() {
            return {
                active: 0
            };
        },
    }

</script>
```
:::

### 带图标的步骤条
步骤条内可以启用各种自定义的图标。

:::demo 通过`icon`属性来设置图标，图标的类型可以参考 Icon 组件的文档，除此以外，还能通过具名`slot`来使用自定义的图标。
```html

<jy-steps :active="1">
  <jy-step title="步骤 1" icon="Gildata-popup"></jy-step>
  <jy-step title="步骤 2" icon="Gildata-dj-Launchscreen"></jy-step>
  <jy-step title="步骤 3" icon="Gildata-dj-screen1"></jy-step>
</jy-steps>

<script>
    export default {
        data() {
            return {
                active: 0
            };
        },
    }

</script>
```
:::

### 带图标的步骤条（居中）
步骤条内可以启用各种自定义的图标。

:::demo 通过`icon`属性来设置图标，图标的类型可以参考 Icon 组件的文档，除此以外，还能通过具名`slot`来使用自定义的图标。
```html

<jy-steps :active="1" align-center>
  <jy-step title="步骤 1"  icon="Gildata-popup"></jy-step>
    <jy-step title="步骤 2" icon="Gildata-dj-Launchscreen"></jy-step>
    <jy-step title="步骤 3" icon="Gildata-dj-screen1"></jy-step>
</jy-steps>

<script>
    export default {
        data() {
            return {
                active: 0
            };
        },
    }

</script>
```
:::

### 竖式步骤条

竖直方向的步骤条。

:::demo 只需要在`el-steps`元素中设置`direction`属性为`vertical`即可。
```html
<div style="height: 300px">
  <jy-steps direction="vertical" :active="1">
    <jy-step title="步骤 1"></jy-step>
    <jy-step title="步骤 2"></jy-step>
    <jy-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></jy-step>
  </jy-steps>
</div>

<script>
    export default {
        data() {
            return {
                active: 0
            };
        },
    }

</script>
```
:::

### 点状步骤条

竖直方向的步骤条。

:::demo 只需要在`el-steps`元素中设置`point`属性为`true`即可。
```html
 <jy-steps :active="active"  point align-center>
            <jy-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></jy-step>
            <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
        </jy-steps>
        <div style="height: 300px; margin-top: 30px">
            <jy-steps :active="active" direction="vertical" point >
                <jy-step title="步骤 1"  description="这是一段很长很长很长的描述性文字"></jy-step>
                <jy-step title="步骤 2"  description="这是一段很长很长很长的描述性文字"></jy-step>
                <jy-step title="步骤 3"  description="这是一段很长很长很长的描述性文字"></jy-step>
            </jy-steps>
        </div>


<script>
    export default {
        data() {
            return {
                active: 0
            };
        },
    }

</script>
```
:::

### 箭头步骤条
设置 `simple` 可应用简洁风格，该条件下  `direction` / `space` 都将失效,`align-center`是必要的设置。

:::demo
```html

<jy-steps :active="1" simple align-center >
  <jy-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></jy-step>
  <jy-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></jy-step>
  <jy-step title="步骤 3" ></jy-step>
</jy-steps>


<script>
    export default {
        data() {
            return {
                active: 0
            };
        },
    }

</script>

```
:::

### 导航步骤条
设置 `nav` 可应用导航步骤条，`align-center`是无效的设置。

:::demo
```html

<jy-steps :active="1" nav align-center >
  <jy-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></jy-step>
  <jy-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></jy-step>
  <jy-step title="步骤 3" ></jy-step>
</jy-steps>
<div style="margin-top: 40px">
    <jy-steps :active="1" nav  >
        <jy-step title="步骤 1" icon="Gildata-popup"></jy-step>
        <jy-step title="步骤 2" icon="Gildata-dj-Launchscreen"></jy-step>
        <jy-step title="步骤 3" icon="Gildata-dj-screen1" description="这是一段很长很长很长的描述性文字"></jy-step>
    </jy-steps>
</div>

<script>
    export default {
        data() {
            return {
                active: 0
            };
        },
    }

</script>
```
:::

### Steps Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| space | 每个 step 的间距，不填写将自适应间距。支持百分比。 | number / string | — | — |
| direction | 显示方向 | string | vertical/horizontal | horizontal |
| active | 设置当前激活步骤  | number | — | 0 |
| process-status | 设置当前步骤的状态 | string | wait / process / finish  / success | process |
| finish-status | 设置结束步骤的状态 | string | wait / process / finish  / success | finish |
| align-center | 进行居中对齐 | boolean | - | false |
| simple | 是否应用箭头 | boolean | - | false |
| nav | 是否应用导航 | boolean | - | false |

### Step Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 标题 | string | — | — |
| description | 描述性文字 | string | — | — |
| icon | 图标 | 传入 icon 的 class 全名来自定义 icon，也支持 slot 方式写入 | string | — |
| status | 设置当前步骤的状态，不设置则根据 steps 确定状态 | wait / process / finish  / success | - |

### Step Slot
| name | 说明  |
|----|----|
| icon | 自定义图标 |
| title | 自定义标题 |
| description | 自定义描述性文字 |
