"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.getIosHeight = getIosHeight;
// innerHeight 在 ios 下可能变化，比如导航条有时候收起、展开
var vp = window["visualViewport"];

function isSame(a, b) {
  return Math.abs(a - b) < 0.01;
}

var lastHeight = -1;

function _default(cbArr) {
  if (!vp) return;

  function emit() {
    var delta = getIosHeight();
    if (isSame(delta, lastHeight)) return;
    lastHeight = delta;
    cbArr.forEach(function (cb) {
      cb.call(null, lastHeight);
    });
  }

  vp.onscroll = function () {
    emit();
  };

  vp.onresize = function () {
    emit();
  };
}

function getIosHeight() {
  if (!vp) return 0;
  return document.documentElement.clientHeight - vp.height;
}