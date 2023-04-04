
export function animation(obj, target, fn1) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var step = (target - obj.scrollTop) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.scrollTop >= target) {
      clearInterval(obj.timer);
      if (fn1) {
        fn1();
      }
    } else {
      obj.scrollTop = obj.scrollTop + step;
    }
  }, 10);
}