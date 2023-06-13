export default {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.gj-dialog__header');
    const dragDom = el.querySelector('.gj-dialog');
    // dialogHeaderEl.style.cursor = 'move';
    if(!dialogHeaderEl) return;
    dialogHeaderEl.style.cssText += ';cursor:move;';
    dragDom.style.cssText += ';top:0px;';

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr];
      }
    })();

    dialogHeaderEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      const screenWidth = document.body.clientWidth; // body当前宽度
      const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
      const marginTop = window.getComputedStyle(dragDom)['margin-top'].replace('px', '') // 获取margin
      const marginLeft = window.getComputedStyle(dragDom)['margin-left'].replace('px', '') // 获取margin
      const minDragDomLeft = -marginLeft;
      const maxDragDomLeft = screenWidth - dragDomWidth - marginLeft - 7;
      const minDragDomTop = -marginTop;

      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left');
      let styT = sty(dragDom, 'top');
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        // eslint-disable-next-line no-useless-escape
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
        // eslint-disable-next-line no-useless-escape
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
      } else {
        styL = +styL.replace(/\px/g, '');
        styT = +styT.replace(/\px/g, '');
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        let leftStyle = left + styL;
        let topStyle = top + styT;
        // 边界处理
        if (leftStyle <= minDragDomLeft) {
          leftStyle = minDragDomLeft;
        } else if (leftStyle >= maxDragDomLeft) {
          leftStyle = maxDragDomLeft;
        }
        if (topStyle <= minDragDomTop) {
          topStyle = minDragDomTop;
        }
        // 移动当前元素
        dragDom.style.cssText += `;left:${leftStyle}px;top:${topStyle}px;`;
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false;
    };
  }
};
