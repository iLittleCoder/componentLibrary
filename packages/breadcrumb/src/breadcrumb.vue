<script>
  import GjDropdown from 'GildataDesign/packages/dropdown';
  import GjButton from 'GildataDesign/packages/button';
  import GjDropdownItem from 'GildataDesign/packages/dropdown-item';
  import GjDropdownMenu from 'GildataDesign/packages/dropdown-menu';

  export default {
    name: 'GjBreadcrumb',

    props: {
      separator: {
        type: String,
        default: '/'
      },
      separatorClass: {
        type: String,
        default: ''
      },
      collapseNumber: { // 超过几项开始折叠
        type: Number,
        default: 5
      },
      collapse: { // 是否开启折叠
        type: Boolean,
        default: false
      },
      trigger: { // 触发下拉的行为
        type: String,
        default: 'hover'
      }
    },
    components: {
      GjDropdown,
      GjDropdownItem,
      GjDropdownMenu,
      GjButton
    },

    provide() {
      return {
        GjBreadcrumb: this
      };
    },

    mounted() {
      const items = this.$el.querySelectorAll('.gj-breadcrumb__item');
      if (items.length) {
        items[items.length - 1].setAttribute('aria-current', 'page');
      }
    },

    render() {
      const slots = this.$slots.default;
      if (!slots) return null;
      // GjBreadcrumbItem 超过collapseNumber个数
      if (this.collapse && (slots.filter(item => item.tag && item.tag.includes('GjBreadcrumbItem')).length > this.collapseNumber)) {
        let pre = [];
        let middle = [];
        let next = [];
        let items = slots.filter(item => item.tag);
        pre = items.slice(0, 2); // 截取前两个
        middle = items.slice(2, -1); // 截取第三个至倒数第二个
        next = items.slice(-1); // 获取最后一个

        // 定义分隔符
        let separatorDom = this.separatorClass ? <i class={['gj-breadcrumb__separator', this.separatorClass]} /> : <span class='gj-breadcrumb__separator' role='presentation'>{ this.separator }</span>;
        // 定义下拉框
        let list = middle.map(item => <gj-dropdown-item class='gj-breadcrumb__dropdown'>{item}</gj-dropdown-item>);
        let dropdown = <gj-dropdown trigger={this.trigger}><span><i class='Gildata-more'/>{separatorDom}</span><gj-dropdown-menu slot="dropdown"> {list} </gj-dropdown-menu> </gj-dropdown>;
        return (
          <div class='gj-breadcrumb' aria-label='Breadcrumb' role='navigation'>{pre}{dropdown}{next}</div>
        );
      } else {
        return (<div class='gj-breadcrumb' aria-label='Breadcrumb' role='navigation'>{slots}</div>);
      }
    }
  };
</script>
