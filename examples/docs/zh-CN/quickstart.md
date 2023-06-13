## 安装

本节将介绍如何在项目中使用 component-library-gj, <font class='a-in-componet-primary-color' >支持 vue 版本为 2.6+</font>

### npm 安装

输入安装命令

```shell
npm i component-library-gj -S
```

### 引入 component-library-gj

你可以引入整个 component-library-gj，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 component-library-gj。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import componentLibraryGj from 'component-library-gj';
import 'component-library-gj/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(componentLibraryGj);

new Vue({
  el: '#app',
  render: (h) => h(App)
});
```

以上代码便完成了 component-library-gj 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

借助 babel-plugin-componentLibraryGj，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-componentLibraryGj：

```bash
npm install babel-plugin-componentLibraryGj -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": ["@vue/app"],
  "plugins": [
    [
      "component-library-gj",
      {
        "libraryName": "component-library-gj",
        "libDir": "lib",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { Button, Select, Table } from 'component-library-gj';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.use(Table); // 注意：引入table只能用Vue.use()方法
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: (h) => h(App)
});
```

完整组件列表和引入方式（完整组件列表以 [components.json] 为准）

```javascript
import Vue from 'vue';
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification,
  Table
} from 'component-library-gj';

Vue.use(Pagination);
Vue.use(Table);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Calendar);
Vue.use(Backtop);
Vue.use(PageHeader);
Vue.use(CascaderPanel);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
```

### 全局配置

在引入 component-library-gj 时，可以传入一个全局配置对象。该对象目前支持 `size` 与 `zIndex` 字段。`size` 用于改变组件的默认尺寸，`zIndex` 设置弹框的初始 z-index（默认值：2000）。按照引入 component-library-gj 的方式，具体操作如下：

完整引入 component-library-gj：

```js
import Vue from 'vue';
import component-library-gj from 'component-library-gj';
Vue.use(component-library-gj, { size: 'small', zIndex: 3000 });
```

按需引入 component-library-gj：

```js
import Vue from 'vue';
import { Button } from 'component-library-gj';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button);
```

按照以上设置，项目中所有拥有 `size` 属性的组件的默认尺寸均为 'small'，弹框的初始 z-index 为 3000。

### 一键换肤

GildataDesignUI 组件提供了两种主题`Black`和`White` 时，默认是白色。

```javascript
import Vue from 'vue';
import App from './App.vue';

import component-library-gj from 'component-library-gj';
import 'component-library-gj/lib/theme-chalk/index.css';
// 引入jyChangeTheme方法
import { jyChangeTheme } from 'component-library-gj/lib/utils/change-theme.js';
// 切换黑色主题
jyChangeTheme('Black');
// 切换白色主题
jyChangeTheme('White');

new Vue({
  el: '#app',
  render: (h) => h(App)
});
```

### 自定义主题

打开主题页面，该页面展示组件库中可以换肤的颜色变量

颜色变量修改好后，点击右侧的“下载”按钮，下载对应的 theme.json 文件

```javascript
import Vue from 'vue';
import App from './App.vue';

import component-library-gj from 'component-library-gj';
import 'component-library-gj/lib/theme-chalk/index.css';
// 引入jyChangeTheme方法
import { jyChangeTheme } from 'component-library-gj/lib/utils/change-theme.js';
// 导入下载好的json文件
import themeJson from './theme.json';
// 注册新的主题
jyChangeTheme('主题名', themeJson);

new Vue({
  el: '#app',
  render: (h) => h(App)
});
```

### 开始使用

至此，一个基于 Vue 和 component-library-gj 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
