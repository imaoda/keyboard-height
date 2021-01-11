"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = _default;
exports.getAndroidHeight = getAndroidHeight;

var initialHeight = innerHeight;
var realInnerHeight = innerHeight;

var maxCheckTime = 20;
var toolbarMaxSize = 150;
var checkCnt = 0;

var callback = function callback() {};

var intval = setInterval(function() {
  checkCnt++;
  if (checkCnt > maxCheckTime) clearInterval(intval);
  else {
    var currentInnerHeight = innerHeight;
    if (initialHeight - currentInnerHeight > toolbarMaxSize) return;

    if (realInnerHeight === currentInnerHeight) return;

    realInnerHeight = currentInnerHeight;

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
    cbArr.forEach(function(cb) {
      cb.call(null, lastHeight);
    });
  };

  window.addEventListener("resize", callback);
}

function getAndroidHeight() {
  return realInnerHeight - innerHeight;
}
