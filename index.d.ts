declare const keyboardHeight: {
  on: (fn: (height:number) => void) => void
  off: (fn: Function) => void;
  getHeight: () => number;
}

export default keyboardHeight;