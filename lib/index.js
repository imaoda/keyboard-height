"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _uitls = require("./uitls");

var _ios = _interopRequireWildcard(require("./ios"));

var _android = _interopRequireWildcard(require("./android"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var KeyboardObserver = /*#__PURE__*/ (function() {
  function KeyboardObserver() {
    _classCallCheck(this, KeyboardObserver);

    this.cbArr_ = [];
    if (_uitls.isAndroid) (0, _android.default)(this.cbArr_);
    else if (_uitls.isIos) (0, _ios.default)(this.cbArr_);
  }

  _createClass(KeyboardObserver, [
    {
      key: "on",
      value: function on(cb) {
        if (this.cbArr_.indexOf(cb) === -1 && typeof cb === "function") {
          this.cbArr_.push(cb);
        }

        return this;
      },
    },
    {
      key: "off",
      value: function off(cb) {
        var index = this.cbArr_.indexOf(cb);

        if (index !== -1) {
          this.cbArr_.splice(index, 1);
        }

        return this;
      },
    },
    {
      key: "getHeight",
      value: function getHeight() {
        if (_uitls.isAndroid) return (0, _android.getAndroidHeight)();
        else if (_uitls.isIos) return (0, _ios.getIosHeight)();
        return 0;
      },
    },
  ]);

  return KeyboardObserver;
})();

var _default = new KeyboardObserver();
exports.default = _default;
