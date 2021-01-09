/**
 * android 下用 innerHeight 对于新开 tab 会有问题，会把上面的导航条也算进去, toolbar 大约在 150 px 以内
 * 即便在 DCL 下获取，也是有问题的，我们尝试在 1s 内轮训获取真实的 innerHeight
 * 同时要避免 autoFocus 导致页面刚打开就谈键盘，引起计算 bug，同理，部分键盘上有刷新按钮，导致页面刚打开的 innerHeight 就不对
 */
let initialHeight = innerHeight;
let realInnerHeight = innerHeight; // 键盘未弹起时的高度
const maxCheckTime = 10;
const toolbarMaxSize = 150;
let checkCnt = 0;
let callback = function () {};
const intval = setInterval(() => {
  checkCnt++;
  if (checkCnt > maxCheckTime) clearInterval(intval);
  else {
    const currentInnerHeight = innerHeight;
    if (initialHeight - currentInnerHeight > toolbarMaxSize) return; // 可能键盘已经弹起
    if (realInnerHeight === currentInnerHeight) return; // 无变化
    realInnerHeight = currentInnerHeight;
    // 通知
    callback();
  }
}, 100);

function isSame(a, b) {
  return Math.abs(a - b) < 0.01;
}
let lastHeight = -1;
export default function (cbArr) {
  [];
  callback = () => {
    var delta = getAndroidHeight();
    if (isSame(delta, lastHeight)) return;
    lastHeight = delta;
    cbArr.forEach((cb) => {
      cb.call(null, lastHeight);
    });
  };
  window.addEventListener("resize", callback);
}

export function getAndroidHeight() {
  const currentInnerHeight = innerHeight;
  if (currentInnerHeight > realInnerHeight && checkCnt >= maxCheckTime)
    realInnerHeight = currentInnerHeight;
  return realInnerHeight - currentInnerHeight;
}
