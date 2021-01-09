# keyboard-height

## introduction

calaculate the height of soft keyboard in mobile phone and emit on changes

计算软键盘高度，并支持监听键盘的高度变化 (比如切换键盘类型、或者弹出收起键盘引起的)

## usage

```js
import keyboardObserver from "keyboard-height";

// get current height of soft keyboard
// 获取当前键盘高度
keyboardObserver.getHeight(); // 400

// listen soft keyboard height changes
// 监听键盘高度变化
keyboardObserver.on((newHeight) => {});
```
