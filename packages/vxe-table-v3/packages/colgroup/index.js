import VxeTableColgroup from '../table/src/group'

export const Colgroup = Object.assign(VxeTableColgroup, {
  install (Vue) {
    Vue.component(VxeTableColgroup.name, VxeTableColgroup)
    // 兼容旧用法
    Vue.component('GjColgroup', VxeTableColgroup)
  }
})

export default Colgroup
