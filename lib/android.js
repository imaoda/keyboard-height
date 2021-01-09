"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.getAndroidHeight = getAndroidHeight;

/**
 * android 下用 innerHeight 对于新开 tab 会有问题，会把上面的导航条也算进去, toolbar 大约在 150 px 以内
 * 即便在 DCL 下获取，也是有问题的，我们尝试在 2s 内轮训获取真实的 innerHeight
 * 同时要避免 autoFocus 导致页面刚打开就谈键盘，引起计算 bug
 */
var initialHeight = innerHeight;
var realInnerHeight = innerHeight; // 键盘未弹起时的高度

var maxCheckTime = 20;
var toolbarMaxSize = 150;
var checkCnt = 0;

var callback = function callback() {};

var intval = setInterval(function () {
  checkCnt++;
  if (checkCnt > maxCheckTime) clearInterval(intval);else {
    var currentInnerHeight = innerHeight;
    if (initialHeight - currentInnerHeight > toolbarMaxSize) return; // 可能键盘已经弹起

    if (realInnerHeight === currentInnerHeight) return; // 无变化

    realInnerHeight = currentInnerHeight; // 通知

    callback();
  }
}, 100);

function isSame(a, b) {
  return Math.abs(a - b) < 0.01;
}

var lastHeight = -1;

function _default(cbArr) {
  callback = function callback() {
    var delta = getAndroidHeight();
    if (isSame(delta, lastHeight)) return;
    lastHeight = delta;
    cbArr.forEach(function (cb) {
      cb.call(null, lastHeight);
    });
  };

  window.addEventListener("resize", callback);
}

function getAndroidHeight() {
  return realInnerHeight - innerHeight;
}