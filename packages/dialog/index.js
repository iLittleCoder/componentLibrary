import JyDialog from './src/component';
import DialogDrag from './src/dialogDrag';

/* istanbul ignore next */
JyDialog.install = function(Vue) {
  Vue.component(JyDialog.name, JyDialog);
  Vue.directive('dialogDrag', DialogDrag);
};

export default JyDialog;
