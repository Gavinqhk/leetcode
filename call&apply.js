/**
 *
 * @param {*} context 指向的this对象
 */
Function.prototype.mycall = function (context) {
  // 未指定this时只想全局对象
  const content = Object(context) || window;
  // 设置唯一值Symbol，确保不被覆盖
  const fn = Symbol();
  // this是调用call的函数（fn.call(thisArg, ...args)）将函数暂存在context
  content[fn] = this;
  // 获取到了函数，还需要获取到参数（入参）
  const args = [];
  for (let index = 1; index < arguments.length; index++) {
    // 这里需要使用字符串形式push进args，如果直接push(arguments[index])的话，
    // 如果参数是个对象，那后续eval的时候参数会变成conetxt[fn](..., [object object], ...)
    args.push("arguments[" + index + "]");
  }
  /**
   * 获取到参数，可以开始执行了，那应该如何执行呢？
   * call 是传入单个参数而不是数组，所以args不能当参数传入，而是应该将里面每一项传入函数当参数
   * 通过eval能做到这个操作
   * 若 args=[a,b,c,d]
   * 下列操作相当于 执行context[fn](a,b,c,d)
   */
  // 执行是还需思考有返回值的情况。
  const resp = eval("context[fn](" + args + ")");
  //执行完之后删除context的fn
  delete content[fn];

  return resp;
};

// apply 和 call 本质是一样的，只是参数传递不同
Function.prototype.myapply = function (context, arr) {
  const content = Object(context) || window;
  const fn = Symbol();
  content[fn] = this;
  let resp = null;
  if (!arr) {
    resp = content[fn]();
  } else {
    const args = [];
    for (let index = 0; index < arr.length; index++) {
      args.push("arr[" + index + "]");
    }
    resp = eval("content[fn](" + args + ")");
  }
  delete content[fn];
  return resp;
};

function fn(a, b) {
  console.log(a.a, b, a.a + b);
}
fn.myapply({}, [{ a: 1 }, 2]);
fn.apply({}, [{ a: 1 }, 2]);
