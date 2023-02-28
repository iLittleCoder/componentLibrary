<style lang="scss">
.component-preview {
  padding-right: 10px;
  &:last-of-type {
    padding-bottom: 20px;
  }
  h4 {
    font-size: 20px;
    margin: 40px 0 20px;
    color: #909399;
  }
  .demo-item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .demo-line {
    margin: 15px 0;
  }
  .jy-carousel__item {
    .small {
      text-align: center;
      line-height: 90px;
      margin-bottom: 30px;
      color: var(--color-white);
    }
  }
  .jy-carousel__item:nth-child(2n) {
    background-color: var(--color-primary-hover);
  }

  .jy-carousel__item:nth-child(2n + 1) {
    background-color: var(--color-primary-pressed);
  }

  .jy-avatar:not(:last-child) {
    margin-right: 20px;
  }

  .avatar-demo {
    display: flex;
    align-items: center;
  }
  .jy-notification {
    border: none;
  }
}
</style>
<template>
  <div class="component-preview">
    <h4>Button</h4>
    <jy-row class="demo-line">
      <jy-button>Default</jy-button>
      <jy-button type="primary">Primary</jy-button>
      <jy-button type="success">Success</jy-button>
      <jy-button type="warning">Warning</jy-button>
      <jy-button type="danger">Danger</jy-button>
    </jy-row>
    <jy-row class="demo-line">
      <jy-button plain>Plain</jy-button>
      <jy-button type="primary" plain>Primary</jy-button>
      <jy-button type="success" plain>Success</jy-button>
      <jy-button type="warning" plain>Warning</jy-button>
      <jy-button type="danger" plain>Danger</jy-button>
    </jy-row>
    <jy-row class="demo-line">
      <jy-button round>Round</jy-button>
      <jy-button type="primary" round>Primary</jy-button>
      <jy-button type="success" round>Success</jy-button>
      <jy-button type="warning" round>Warning</jy-button>
      <jy-button type="danger" round>Danger</jy-button>
    </jy-row>
    <jy-row class="demo-line">
      <jy-button icon="Gildata-search1" circle></jy-button>
      <jy-button type="primary" icon="Gildata-edit" circle></jy-button>
      <jy-button type="success" icon="Gildata-tick" circle></jy-button>
      <jy-button type="warning" icon="Gildata-star1" circle></jy-button>
      <jy-button type="danger" icon="Gildata-delete" circle></jy-button>
    </jy-row>
    <jy-row class="demo-line">
      <jy-button>Default</jy-button>
      <jy-button size="large">Large</jy-button>
      <jy-button size="medium">Medium</jy-button>
      <jy-button size="mini">Mini</jy-button>
    </jy-row>
    <h4>Radio</h4>
    <jy-row class="demo-line">
      <jy-radio v-model="radio" label="1">Option A</jy-radio>
      <jy-radio v-model="radio" label="2">Option B</jy-radio>
    </jy-row>
    <jy-row class="demo-line">
      <jy-radio-group v-model="radio1">
        <jy-radio-button label="New York"></jy-radio-button>
        <jy-radio-button label="Washington"></jy-radio-button>
        <jy-radio-button label="Los Angeles"></jy-radio-button>
        <jy-radio-button label="Chicago"></jy-radio-button>
      </jy-radio-group>
    </jy-row>
    <jy-row class="demo-line">
      <jy-radio v-model="radio2" label="1" border>Option A</jy-radio>
      <jy-radio v-model="radio2" label="2" border>Option B</jy-radio>
    </jy-row>
    <h4>Checkbox</h4>
    <jy-row class="demo-line">
      <jy-checkbox v-model="checked">Option</jy-checkbox>
    </jy-row>
    <jy-row class="demo-line">
      <jy-checkbox-group v-model="checked1">
        <jy-checkbox-button
          v-for="city in ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']"
          :label="city"
          :key="city"
          >{{ city }}</jy-checkbox-button
        >
      </jy-checkbox-group>
    </jy-row>
    <jy-row class="demo-line">
      <jy-checkbox v-model="checked2" label="Option1" border></jy-checkbox>
    </jy-row>
    <h4>Input</h4>
    <jy-row style="width: 180px">
      <jy-input placeholder="Please input" v-model="input"></jy-input>
    </jy-row>
    <h4>InputNumber</h4>
    <jy-row>
      <jy-input-number v-model="inputNumber" :min="1" :max="10"></jy-input-number>
    </jy-row>
    <h4>Select</h4>
    <jy-row>
      <jy-select border v-model="selectValue" placeholder="Select" style="width:220px">
        <jy-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"></jy-option>
      </jy-select>
    </jy-row>
    <h4>Cascader</h4>
    <jy-row>
      <jy-cascader :options="cascadeOptions" v-model="cascaderValue"></jy-cascader>
    </jy-row>
    <h4>Switch</h4>
    <jy-row>
      <jy-switch v-model="switchValue"></jy-switch>
      <jy-switch style="margin-left: 40px" v-model="switchValue" active-text="Pay by month" inactive-text="Pay by year">
      </jy-switch>
    </jy-row>
    <h4>Slider</h4>
    <jy-row style="width: 380px">
      <jy-slider v-model="slider"></jy-slider>
    </jy-row>
    <h4>DatePicker</h4>
    <jy-row>
      <jy-date-picker border v-model="datePicker" type="date" placeholder="请选择日期"></jy-date-picker>
    </jy-row>
    <h4>Rate</h4>
    <jy-row>
      <jy-rate class="demo-line" v-model="rate"></jy-rate>
      <jy-rate class="demo-line" v-model="rate" show-score text-color="#ff9900" score-template="{value} points">
      </jy-rate>
    </jy-row>
    <h4>Transfer</h4>
    <jy-row>
      <jy-transfer v-model="transfer" filterable :data="transferData">
        <jy-button class="transfer-footer" slot="left-footer" size="mini">Operation</jy-button>
        <jy-button class="transfer-footer" slot="right-footer" size="mini">Operation</jy-button>
      </jy-transfer>
    </jy-row>
    <h4>Table</h4>
    <jy-row>
      <jy-table :data="tableData" style="width: 70%">
        <jy-column field="date" title="Date" width="180"></jy-column>
        <jy-column field="name" title="Name" width="180"></jy-column>
        <jy-column field="address" title="Address"></jy-column>
      </jy-table>
    </jy-row>
    <h4>Tag</h4>
    <jy-row>
      <jy-tag class="demo-item" closable>Tag One</jy-tag>
      <jy-tag class="demo-item" closable type="success">Tag Two</jy-tag>
      <jy-tag class="demo-item" closable type="info">Tag Three</jy-tag>
      <jy-tag class="demo-item" closable type="warning">Tag Four</jy-tag>
      <jy-tag class="demo-item" closable type="danger">Tag Five</jy-tag>
    </jy-row>
    <h4>Progress</h4>
    <jy-row style="width: 380px">
      <jy-progress :percentage="20"></jy-progress>
      <jy-progress :percentage="60" status="exception"></jy-progress>
      <jy-progress :percentage="100" status="success"></jy-progress>
    </jy-row>
    <h4>Tree</h4>
    <jy-row style="width: 380px">
      <jy-tree :data="treeData" :props="defaultTreeProps"></jy-tree>
    </jy-row>
    <h4>Pagination</h4>
    <jy-row>
      <jy-pagination layout="prev, pager, next" :total="1000"></jy-pagination>
    </jy-row>
    <h4>Badge</h4>
    <jy-row>
      <jy-badge :value="12" class="demo-item">
        <jy-button size="small">comments</jy-button>
      </jy-badge>
      <jy-badge :value="3" class="demo-item">
        <jy-button size="small">replies</jy-button>
      </jy-badge>
      <jy-badge :value="1" class="demo-item" type="primary">
        <jy-button size="small">comments</jy-button>
      </jy-badge>
      <jy-badge :value="2" class="demo-item" type="warning">
        <jy-button size="small">replies</jy-button>
      </jy-badge>
    </jy-row>
    <h4>Alert</h4>
    <jy-row style="width: 380px;">
      <jy-alert class="demo-item" title="success alert" type="success" show-icon></jy-alert>
      <jy-alert class="demo-item" title="info alert" type="primary" close-text="Gotcha" show-icon></jy-alert>
      <jy-alert class="demo-item" title="warning alert" type="warning" show-icon></jy-alert>
      <jy-alert class="demo-item" title="error alert" type="error" description="more text description" show-icon>
      </jy-alert>
    </jy-row>
    <h4>Loading</h4>
    <jy-row>
      <jy-table :data="tableData" style="width: 90%" v-loading="true">
        <jy-column field="date" title="Date" width="180"></jy-column>
        <jy-column field="name" title="Name" width="180"></jy-column>
        <jy-column field="address" title="Address"></jy-column>
      </jy-table>
    </jy-row>
    <h4>Message</h4>
    <jy-row>
      <div
        role="alert"
        class="demo-item jy-message jy-message--success jy-message-fade-leave-active jy-message-fade-leave-to"
        style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"
      >
        <jy-icon name="Gildata-color-correct2"></jy-icon>
        <p class="jy-message__content">Congrats, this is a success message.</p>
        <!---->
      </div>
      <div
        role="alert"
        class="demo-item jy-message jy-message--warning jy-message-fade-leave-active jy-message-fade-leave-to"
        style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"
      >
        <jy-icon name="Gildata-color-warning2"></jy-icon>
        <p class="jy-message__content">Warning, this is a warning message.</p>
        <!---->
      </div>
      <div
        role="alert"
        class="demo-item jy-message jy-message--info jy-message-fade-leave-active jy-message-fade-leave-to"
        style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"
      >
        <jy-icon name="Gildata-color-notes2"></jy-icon>
        <p class="jy-message__content">This is a message.</p>
        <!---->
      </div>
      <div
        role="alert"
        class="demo-item jy-message jy-message--error is-closable jy-message-fade-leave-active jy-message-fade-leave-to"
        style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"
      >
        <jy-icon name="Gildata-color-error2"></jy-icon>
        <p class="jy-message__content">Oops, this is a error message.</p>
        <i class="jy-message__closeBtn Gildata-close"></i>
      </div>
    </jy-row>
    <h4>MessageBox</h4>
    <jy-row>
      <div class="jy-message-box">
        <div class="jy-message-box__header">
          <div class="jy-message-box__title"><!----><span>Warning</span></div>
          <button type="button" aria-label="Close" class="jy-message-box__headerbtn">
            <i class="jy-message-box__close Gildata-close"></i>
          </button>
        </div>
        <div class="jy-message-box__content">
          <div class="jy-message-box__status ">
            <jy-icon name="Gildata-color-warning2"></jy-icon>
          </div>
          <div class="jy-message-box__message"><p>This will permanently delete the file. Continue?</p></div>
          <div class="jy-message-box__input" style="display: none;">
            <div class="jy-input">
              <!----><input
                type="text"
                autocomplete="off"
                placeholder=""
                class="jy-input__inner"
              /><!----><!----><!---->
            </div>
            <div class="jy-message-box__errormsg" style="visibility: hidden;"></div>
          </div>
        </div>
        <div class="jy-message-box__btns">
          <button type="button" class="jy-button jy-button--default jy-button--small">
            <!----><!----><span>
              Cancel
            </span></button
          ><button type="button" class="jy-button jy-button--default jy-button--small jy-button--primary ">
            <!----><!----><span>
              OK
            </span>
          </button>
        </div>
      </div>
    </jy-row>
    <h4>Notification</h4>
    <jy-row>
      <div role="alert" class="jy-notification right" style="position: relative; left: 0;">
        <!---->
        <div class="jy-notification__group">
          <span class="jy-notification__title">Notification</span>
          <div class="jy-notification__content"><div>This is a message</div></div>
          <div class="jy-notification__closeBtn Gildata-close"></div>
        </div>
      </div>
    </jy-row>
    <h4>Menu</h4>
    <jy-row>
      <jy-menu :default-active="menu" class="jy-menu-demo" mode="horizontal">
        <jy-menu-item index="1">Processing Center</jy-menu-item>
        <jy-submenu index="2">
          <template slot="title"
            >Workspace</template
          >
          <jy-menu-item index="2-1">item one</jy-menu-item>
          <jy-menu-item index="2-2">item two</jy-menu-item>
          <jy-menu-item index="2-3">item three</jy-menu-item>
          <jy-submenu index="2-4">
            <template slot="title"
              >item four</template
            >
            <jy-menu-item index="2-4-1">item one</jy-menu-item>
            <jy-menu-item index="2-4-2">item two</jy-menu-item>
            <jy-menu-item index="2-4-3">item three</jy-menu-item>
          </jy-submenu>
        </jy-submenu>
        <jy-menu-item index="3" disabled>Info</jy-menu-item>
        <jy-menu-item index="4">
          <a href="http://10.106.1.122/gildataDesign" target="_blank">Orders</a>
        </jy-menu-item>
      </jy-menu>
      <jy-menu default-active="2" class="demo-line">
        <jy-submenu index="1">
          <template slot="title">
            <jy-icon name="Gildata-place"></jy-icon>
            <span>Navigator One</span>
          </template>
          <jy-menu-item-group title="Group One">
            <jy-menu-item index="1-1">item one</jy-menu-item>
            <jy-menu-item index="1-2">item one</jy-menu-item>
          </jy-menu-item-group>
          <jy-menu-item-group title="Group Two">
            <jy-menu-item index="1-3">item three</jy-menu-item>
          </jy-menu-item-group>
          <jy-submenu index="1-4">
            <template slot="title"
              >item four</template
            >
            <jy-menu-item index="1-4-1">item one</jy-menu-item>
          </jy-submenu>
        </jy-submenu>
        <jy-menu-item index="2">
          <i class="Gildata-all"></i>
          <span>Navigator Two</span>
        </jy-menu-item>
        <jy-menu-item index="3" disabled>
          <i class="Gildata-zm-judgmentdocuments"></i>
          <span>Navigator Three</span>
        </jy-menu-item>
        <jy-menu-item index="4">
          <i class="Gildata-zm-misappropriationofassetsfinancialab"></i>
          <span>Navigator Four</span>
        </jy-menu-item>
      </jy-menu>
    </jy-row>
    <h4>Tabs</h4>
    <jy-row>
      <jy-tabs v-model="tab" class="demo-item">
        <jy-tab-pane label="User" name="first">User</jy-tab-pane>
        <jy-tab-pane label="Config" name="second">Config</jy-tab-pane>
        <jy-tab-pane label="Role" name="third">Role</jy-tab-pane>
        <jy-tab-pane label="Task" name="fourth">Task</jy-tab-pane>
      </jy-tabs>
      <jy-tabs type="card" class="demo-item">
        <jy-tab-pane label="User">User</jy-tab-pane>
        <jy-tab-pane label="Config">Config</jy-tab-pane>
        <jy-tab-pane label="Role">Role</jy-tab-pane>
        <jy-tab-pane label="Task">Task</jy-tab-pane>
      </jy-tabs>
    </jy-row>
    <h4>Dialog</h4>
    <jy-row>
      <div role="dialog" aria-modal="true" aria-label="Tips" class="jy-dialog" style="margin: 0">
        <div class="jy-dialog__header">
          <span class="jy-dialog__title">Tips</span
          ><button type="button" aria-label="Close" class="jy-dialog__headerbtn">
            <i class="jy-dialog__close el-icon Gildata-close"></i>
          </button>
        </div>
        <div class="jy-dialog__body"><span>This is a message</span></div>
        <div class="jy-dialog__footer">
          <span class="dialog-footer">
            <jy-button>Cancel</jy-button>
            <jy-button type="primary">Confirm</jy-button>
          </span>
        </div>
      </div>
    </jy-row>
    <h4>Tooltip</h4>
    <jy-row>
      <div
        role="tooltip"
        x-placement="top"
        class="jy-tooltip__popper is-dark"
        style="position: relative; width: 40px;text-align: center;"
      >
        Dark
        <div x-arrow="" class="popper__arrow"></div>
      </div>
      <!-- <div
        role="tooltip"
        x-placement="top"
        class="jy-tooltip__popper is-light"
        style="margin-top: 10px;position: relative; width: 40px;text-align: center;"
      >
        Light
        <div x-arrow="" class="popper__arrow"></div>
      </div> -->
    </jy-row>
    <h4>Popover</h4>
    <jy-row>
      <div
        role="tooltip"
        x-placement="top"
        id="jy-popover-2936"
        aria-hidden="true"
        class="jy-popover el-popper jy-popover--plain"
        tabindex="0"
        style="width: 200px; position: relative; "
      >
        <div class="jy-popover__title">Title</div>
        this is content, this is content, this is content
        <div x-arrow="" class="popper__arrow"></div>
      </div>
    </jy-row>
    <h4>Card</h4>
    <jy-row>
      <jy-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Card name</span>
        </div>
      </jy-card>
    </jy-row>
    <h4>Carousel</h4>
    <jy-row>
      <jy-carousel height="150px">
        <jy-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </jy-carousel-item>
      </jy-carousel>
    </jy-row>
    <h4>Collapse</h4>
    <jy-row>
      <jy-collapse v-model="collapse">
        <jy-collapse-item title="Consistent" name="1">
          <div>
            Consistent with real life: in line with the process and logic of real life, and comply with languages and
            habits that the users are used to;
          </div>
        </jy-collapse-item>
        <jy-collapse-item title="Feedback" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their operations by style updates and interactive
            effects;
          </div>
        </jy-collapse-item>
      </jy-collapse>
    </jy-row>
    <h4>Avatar</h4>
    <jy-row class="demo-line avatar-demo">
      <jy-avatar icon="Gildata-user" />
      <jy-avatar> avatar </jy-avatar>
      <jy-avatar shape="square" fit="contain" :src="avatarData.url"></jy-avatar>
      <jy-avatar size="large"> large </jy-avatar>
      <jy-avatar size="medium"> medium </jy-avatar>
      <jy-avatar size="small"> small </jy-avatar>
    </jy-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1',
      radio1: 'Washington',
      radio2: '1',
      checked: true,
      checked1: ['Shanghai'],
      checked2: true,
      input: 'Element',
      inputNumber: 1,
      selectOptions: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      selectValue: '',
      cascadeOptions: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency'
                },
                {
                  value: 'feedback',
                  label: 'Feedback'
                }
              ]
            }
          ]
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'docs',
              label: 'Design Documentation'
            }
          ]
        }
      ],
      cascaderValue: [],
      switchValue: true,
      slider: 28,
      datePicker: '',
      rate: null,
      transferData: (() => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i % 4 === 0
          });
        }
        return data;
      })(),
      transfer: [1, 4],
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ],
      menu: '1',
      tab: 'first',
      collapse: ['1'],
      treeData: [
        {
          label: 'Level one 1',
          children: [
            {
              label: 'Level two 1-1',
              children: [
                {
                  label: 'Level three 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 2',
          children: [
            {
              label: 'Level two 2-1',
              children: [
                {
                  label: 'Level three 2-1-1'
                }
              ]
            },
            {
              label: 'Level two 2-2',
              children: [
                {
                  label: 'Level three 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 3',
          children: [
            {
              label: 'Level two 3-1',
              children: [
                {
                  label: 'Level three 3-1-1'
                }
              ]
            },
            {
              label: 'Level two 3-2',
              children: [
                {
                  label: 'Level three 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultTreeProps: {
        children: 'children',
        label: 'label'
      },
      avatarData: {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    };
  }
};
</script>
