<template>
  <div>
    <h2>{{ $t('app.aside.nav.theme') }}</h2>
    <p class="tip">第一种方式：创建 scss 文件（<a class="link" href="https://github.com/x-extends/gj-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a>），并引入所有样式</p>
    <pre>
      <pre-code class="scss">
        // 修改样式变量
        $vxe-font-size: 14px;
        $vxe-font-color: #666;
        $vxe-primary-color: #409eff;
        $gj-table-font-color: $vxe-font-color;
        $gj-table-border-color: #e8eaec;
        $gj-table-border-radius: 4px;
        // ...

        @import 'gj-table/styles/index.scss';
      </pre-code>
    </pre>
    <p class="tip">第二种方式：创建 scss 文件（<a class="link" href="https://github.com/x-extends/gj-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a>），并引入所有样式</p>
    <pre>
      <pre-code class="scss">
        @import 'gj-table/styles/variable.scss';

        // 修改样式变量
        $vxe-font-size: 14px;
        $vxe-font-color: #666;
        $vxe-primary-color: #409eff;
        $gj-table-font-color: $vxe-font-color;
        $gj-table-border-color: #e8eaec;
        $gj-table-border-radius: 4px;
        // ...

        @import 'gj-table/styles/modules.scss';
      </pre-code>
    </pre>
    <p class="tip">第三种方式：创建 scss 文件（<a class="link" href="https://github.com/x-extends/gj-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a>），并按需引入模块样式（<a class="link" href="https://github.com/x-extends/gj-table/blob/master/styles/modules.scss" target="_blank">查看所有模块</a>）</p>
    <pre>
      <pre-code class="scss">
        @import 'gj-table/styles/variable.scss';

        // 修改样式变量
        $vxe-font-size: 14px;
        $vxe-font-color: #666;
        $vxe-primary-color: #409eff;
        $gj-table-font-color: $vxe-font-color;
        $gj-table-border-color: #e8eaec;
        $gj-table-border-radius: 4px;
        // ...

        @import 'gj-table/styles/icon.scss';
        @import 'gj-table/styles/table.scss';
        @import 'gj-table/styles/column.scss';
        @import 'gj-table/styles/header.scss';
        @import 'gj-table/styles/body.scss';
        @import 'gj-table/styles/footer.scss';
        @import 'gj-table/styles/filter.scss';
        // ...
      </pre-code>
    </pre>
  </div>
</template>
