const ua = navigator.userAgent;
function has(str) {
  return ua.indexOf(str) !== -1;
}
const isIpod = has("iPod");
const isIpad = has("iPad");
const isIphone = has("iPhone") && !isIpad && !isIpod;
export const isIos = isIpod || isIpad || isIphone;
export const isAndroid = has("Android");
