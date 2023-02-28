<template>
  <div>
    <h2>{{ $t('app.aside.nav.theme') }}</h2>
    <p class="tip">第一种方式：创建 scss 文件（<a class="link" href="https://github.com/x-extends/jy-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a>），并引入所有样式</p>
    <pre>
      <pre-code class="scss">
        // 修改样式变量
        $vxe-font-size: 14px;
        $vxe-font-color: #666;
        $vxe-primary-color: #409eff;
        $jy-table-font-color: $vxe-font-color;
        $jy-table-border-color: #e8eaec;
        $jy-table-border-radius: 4px;
        // ...

        @import 'jy-table/styles/index.scss';
      </pre-code>
    </pre>
    <p class="tip">第二种方式：创建 scss 文件（<a class="link" href="https://github.com/x-extends/jy-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a>），并引入所有样式</p>
    <pre>
      <pre-code class="scss">
        @import 'jy-table/styles/variable.scss';

        // 修改样式变量
        $vxe-font-size: 14px;
        $vxe-font-color: #666;
        $vxe-primary-color: #409eff;
        $jy-table-font-color: $vxe-font-color;
        $jy-table-border-color: #e8eaec;
        $jy-table-border-radius: 4px;
        // ...

        @import 'jy-table/styles/modules.scss';
      </pre-code>
    </pre>
    <p class="tip">第三种方式：创建 scss 文件（<a class="link" href="https://github.com/x-extends/jy-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a>），并按需引入模块样式（<a class="link" href="https://github.com/x-extends/jy-table/blob/master/styles/modules.scss" target="_blank">查看所有模块</a>）</p>
    <pre>
      <pre-code class="scss">
        @import 'jy-table/styles/variable.scss';

        // 修改样式变量
        $vxe-font-size: 14px;
        $vxe-font-color: #666;
        $vxe-primary-color: #409eff;
        $jy-table-font-color: $vxe-font-color;
        $jy-table-border-color: #e8eaec;
        $jy-table-border-radius: 4px;
        // ...

        @import 'jy-table/styles/icon.scss';
        @import 'jy-table/styles/table.scss';
        @import 'jy-table/styles/column.scss';
        @import 'jy-table/styles/header.scss';
        @import 'jy-table/styles/body.scss';
        @import 'jy-table/styles/footer.scss';
        @import 'jy-table/styles/filter.scss';
        // ...
      </pre-code>
    </pre>
  </div>
</template>
