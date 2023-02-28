/*
import ElTable from './src/table';

/!* istanbul ignore next *!/
ElTable.install = function(Vue) {
  Vue.component(ElTable.name, ElTable);
};

export default ElTable;
*/

import * as VXETableExport from '../vxe-table-v3/packages/all';
export * from '../vxe-table-v3/packages/all';
export default VXETableExport;
