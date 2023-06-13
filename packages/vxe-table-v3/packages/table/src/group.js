import VxeTableColumn from './column'

export default {
  name: 'GjColgroup',
  extends: VxeTableColumn,
  provide () {
    return {
      xecolgroup: this,
      $xegrid: null
    }
  }
}
