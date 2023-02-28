import VxeTableColumn from './column'

export default {
  name: 'JyColgroup',
  extends: VxeTableColumn,
  provide () {
    return {
      xecolgroup: this,
      $xegrid: null
    }
  }
}
