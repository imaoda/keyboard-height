// innerHeight 在 ios 下可能变化，比如导航条有时候收起、展开
const vp = window["visualViewport"];
function isSame(a, b) {
  return Math.abs(a - b) < 0.01;
}
let lastHeight = -1;
export default function(cbArr) {
  if (!vp) return;
  function emit() {
    var delta = getIosHeight();
    if (isSame(delta, lastHeight)) return;
    lastHeight = delta;
    cbArr.forEach((cb) => {
      cb.call(null, lastHeight);
    });
  }
  vp.onscroll = function() {
    emit();
  };
  vp.onresize = function() {
    emit();
  };
}
export function getIosHeight() {
  if (!vp) return 0;
  return document.documentElement.clientHeight - vp.height;
}
