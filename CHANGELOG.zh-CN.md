## 更新日志

### 1.2.7

#### Bug 修复

- 修复组件库按需引入时报错的bug

### 1.2.6

#### 优化

- table 组件筛选，添加多选
- 表单隐藏星号异常; 选择器选中数据时未触发清空错误语句问题
- checkboxgroup 组件嵌套多选选择器时，选择器中的 checkbox 未选中问题
- 修改网站加载组件名称，将 Spin 改为 Loading

### 1.2.5

#### 优化

- tabs 组件当只有一个的时候，active 状态异常
- table 组件用 gj-checkbox，active 状态异常
- 页码标签去除 background 属性

### 1.2.4

#### 优化

- select 字母检索模式 bug（可点击字母跳转到相应数据）
- Rate 评分、TimePicker 时间选择器、DateTimePicker 日期时间选择器、Link 链接、Chart 图形组件样式修改
- 网站样式修改：input 组件、color 色彩
- chart 图形组件当 chartOptions 参数变化后重新渲染

### 1.2.3

_2022-10-14_

#### 新特性

- 级联选择框搜索功能支持大小写

#### 优化

- 优化表格组件右键菜单功能
- 日期快捷项样式修改
- 修改 select 远程搜索的 loading 文本
- 修改选择器和时间选择器的下拉选项的 margin-top
- 日期选择器禁用无边框样式
- tabs 标签页当前选项加阴影
- 优化图形组件样式

### 1.2.2

_2022-09-27_

#### 新特性

- 新增 affix 固钉组件
- select 组件添加新模式：带字母检索
- 新增国旗等图标

#### 优化

- 修改表格 UI
- 修改表格排序的默认触发方式

### 1.2.1

_2022-9-07_

#### 新特性

- 新增自定义主题

### 1.2

_2022-8-31_

#### 新特性

- 新增黑金主题

#### Bug 修复

- table
- 修复文档中的报错
- UI
- 修复 UI 团队提及的部分还原度问题

### 1.1.2

_2022-8.31_

#### 新特性

- autocomplete
  - 新增 autocomplete 组件
- DateTimePicker
  - 新增 DateTimePicker 组件
- Rate
  - 新增 Rate 组件
- Slider
  - 新增 Slider 组件
- Transfer
  - 新增 Transfer 组件
- Upload
  - 新增 Upload 组件
- TreeSelect
  - 新增 TreeSelect 组件
- Avatar
  - 新增 Avatar 组件
- Badge
  - 新增 Badge 组件
- Calendar
  - 新增 Calendar 组件
- Carousel
  - 新增 Carousel 组件
- Timeline
  - 新增 Timeline 组件
- Image
  - 新增 Image 组件
- Popover
  - 新增 Popover 组件
- Notification
  - 新增 Notification 组件
- Popconfirm
  - 新增 Popconfirm 组件
- Progress
  - 新增 Progress 组件
- Result
  - 新增 Result 组件
- Spin
  - 新增 Spin 组件
- Drawer
  - 新增 Drawer 组件
- Divider
  - 新增 Divider 组件
- Steps
  - 新增 Steps 组件
- PageHeader
  - 新增 PageHeader 组件
- NavMenu
  - 新增 NavMenu 组件
- Breadcrumb
  - 新增 Breadcrumb 组件
- chart

  - 修复新的入参 init 方式

#### Bug 修复

- Cascader
  - 修复 单选 模式下，一些情况报错
- UI
  - 修复 UI 团队提及的部分还原度问题

### 1.0.0

_2022-6-30_

#### 组件库发布

- 【Gildata Design 的诞生】
- Gildata Design 是一套符合 B 端金融类产品设计特征，结合基金、券商、金控、资管、银行等实际应用场景，投研产品的设计系统的简称。 Gildata Design 的目标，即通过通用的设计系统去解决金融类产品中的体验问题, 并为金融类产品设计提供指导原则解决业务问题。同时它能够促进设计部门和研发部门之间协作, 缩短设计和开发团队重复开发的时间，提升团队协作效率， 成为开发者之间沟通的语言。 Gildata Design 主要服务于聚源旗下端类金融产品的体验设计和技术实现，主要由 UED 设计和开发同学共同构建及维护。

- 【Gildata Design 的应用场景】
- 基于 Vue2.6+，囊括了布局、表单、导航、多种提示、图形、表格等丰富的组件，全方位覆盖 PC 端类金融场景。
  智能投研端视觉交互统一，降低桌面端多个产品互嵌成本，提升融合效率。
  满足不同客户差异化场景需求，定制主题，配色有券商蓝、国企红、财富金等。

####

<i><sup>\*</sup> 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此请在 `dangerouslyUseHTMLString` 打开的情况下，确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。</i>
