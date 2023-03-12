// bind.js
Function.prototype.bind2 = function (context) {
  // 一定一定要做错误判断，一定一定要做参数校验
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  context = context || window;
  const originFn = this;
  // const args = [].slice.call(arguments, 1);
  const args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  const fn = function () {
    //这里的arguments是bind之后的函数参数。需要参数合并
    const innerArgs = Array.prototype.slice.call(arguments);
    // 为什么return 是因为原函数可能有返回值,如果是通过new操作，context参数的this指向失效
    return originFn.apply(
      this instanceof temp ? this : context,
      args.concat(innerArgs)
    );
  };

  // bind绑定后的函数new时候是将原函数当作构造函数，并且bind时参数当作构造函数参数传入。
  /*
   * 可以直接使用fn.prototype = orginFn.prototype改变原型指向，
   * 但是如果修改了orignFn.prototype时fn.prototype也会随之修改。
   * 所以通过一个空函数来做转换，切断引用类型的联系
   */
  const temp = function () {};
  temp.prototype = originFn.prototype;
  fn.prototype = new temp();

  return fn;
};
