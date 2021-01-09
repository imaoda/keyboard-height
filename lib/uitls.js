"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAndroid = exports.isIos = void 0;
var ua = navigator.userAgent;

function has(str) {
  return ua.indexOf(str) !== -1;
}

var isIpod = has("iPod");
var isIpad = has("iPad");
var isIphone = has("iPhone") && !isIpad && !isIpod;
var isIos = isIpod || isIpad || isIphone;
exports.isIos = isIos;
var isAndroid = has("Android");
exports.isAndroid = isAndroid;