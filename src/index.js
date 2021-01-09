import { isAndroid, isIos } from "./uitls";
import initIos, { getIosHeight } from "./ios";
import initAndroid, { getAndroidHeight } from "./android";
class KeyboardObserver {
  constructor() {
    this.cbArr_ = [];
    if (isAndroid) initAndroid(this.cbArr_);
    else if (isIos) initIos(this.cbArr_);
  }
  on(cb) {
    if (this.cbArr_.indexOf(cb) === -1 && typeof cb === "function") {
      this.cbArr_.push(cb);
    }
    return this;
  }
  off(cb) {
    var index = this.cbArr_.indexOf(cb);
    if (index !== -1) {
      this.cbArr_.splice(index, 1);
    }
    return this;
  }
  getHeight() {
    if (isAndroid) return getAndroidHeight();
    else if (isIos) return getIosHeight();
    return 0;
  }
}

export default new KeyboardObserver();
