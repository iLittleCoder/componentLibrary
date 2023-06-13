import GjDialog from './src/component';
import DialogDrag from './src/dialogDrag';

/* istanbul ignore next */
GjDialog.install = function(Vue) {
  Vue.component(GjDialog.name, GjDialog);
  Vue.directive('dialogDrag', DialogDrag);
};

export default GjDialog;
