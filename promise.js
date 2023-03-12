/**
 * 从现象上看，Promise的使用来推出实现原理。
 * 1、首先看new 操作  new Promise((resolve, reject) => {
 *      Promise 必须接受一个函数作为参数，该函数又有两个参数分别是resolve函数，reject函数。用来处理成功和失败。
 * })
 */

const PENDDING = "pendding";
const FULFILED = "fulfilled";
const REJECTED = "rejected";

function mPromise(fn) {
  // if(this.constrctor != mPromise) {
  //     console.error('must call by new')
  // }
  if (typeof fn !== "function") {
    console.error("the arguments for mPromise must be a function");
  }
  let _this = this; // 缓存当前promise实例
  _this.status = PENDDING; // promise的状态（三状态之一，且不可逆）
  _this.value = null; // 成功的值
  _this.error = null; // 错误信息
  // 因为同一个promise实例当.then是可以多次调用，且都会运行当。所有需要数据来做回调函数的缓存。
  _this.onFulfilledCbs = []; // 成功回调函数
  _this.onRejectedCbs = []; //失败回调函数

  /**
   * resolve，reject函数用来修改状态，和执行异步回调的地方。.then和.catch注册回调函数，只有当this.status改变之后才会去执行回调函数，
   * 而整个promise只有reject和resolve是可以改变状态的地方。
   */

  /**
   * resolve当fn函数处理成功之后调用，promise状态改为已完成状态，实例的value改为函数执行成功的返回值。
   *
   * @param {*} value
   * @returns
   */
  function resolve(value) {
    if (_this.status === PENDDING) {
      _this.status = FULFILED;
      _this.value = value;

      //当status状态改变时执行回调函数。
      _this.onFulfilledCbs.forEach((cb) => {
        cb(_this.value);
      });
    }
  }

  /**
   * reject当fn函数执行失败时调用，promise状态改为已失败状态，实例的error改为执行函数的错误信息。
   * @param {*} error
   * @returns
   */
  function reject(error) {
    if (_this.status === PENDDING) {
      _this.status = REJECTED;
      _this.error = error;
      _this.onRejectedCbs.forEach((cb) => {
        cb(_this.error);
      });
    }
  }

  // 执行new 操作传进来的函数，失败则执行reject方法。
  try {
    fn(resolve, reject); //执行传入的函数
  } catch (err) {
    reject(err);
  }
}

/**
 * promise = new Promise((resolve, reject) => {
 *  ......
 * });
 *
 * promise.then((res) => {
 *  console.log(res);
 * }, (err) => {
 *  console.log(err);
 * });
 *
 * .then函数接收两个函数作为参数，
 * 第一个是当status状态为已完成状态fulfilled时调用的函数，第二个是当status状态为已拒绝rejected时调用当函数。
 * 所以把他们添加到对应的回调函数数组中。
 *
 * .then函数返回值是可以继续.then这样链式调用的，所有需要返回一个promise实例。
 *
 * .then的链式调用的使用是需要return 一个东西出去，如果不return则会一直处于与第一个promise相同的状态。
 * return 一个非promise他会把这个值传递给下一个then。如果是promise则若这个promise是fulfilled状态则执行then，否则catch。
 *
 *
 *
 * @param {*} onFulfilled
 * @param {*} onRejected
 */
mPromise.prototype.then = function (onFulfilled, onRejected) {
  const _this = this;
  let promiseRes;
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (error) => {
          throw error;
        };
  if (_this.status === FULFILED) {
    return (promiseRes = new mPromise((resolve, reject) => {
      setTimeout(() => {
        let x = onFulfilled(_this.value);
        resolvePromise(promiseRes, x, resolve, reject);
      });
    }));
  } else if (_this.status === REJECTED) {
    return (promiseRes = new mPromise((resolve, reject) => {
      setTimeout(() => {
        let x = onRejected(_this.error);
        resolvePromise(promiseRes, x, resolve, reject);
      });
    }));
  } else {
    return (promiseRes = new mPromise((resolve, reject) => {
      setTimeout(() => {
        this.onRejectedCbs.push(() => {
          let x = onRejected(_this.error);
          resolvePromise(promiseRes, x, resolve, reject);
        });
        this.onFulfilledCbs.push(() => {
          let x = onFulfilled(_this.error);
          resolvePromise(promiseRes, x, resolve, reject);
        });
      });
    }));
  }
};

function resolvePromise(promise, x, resolve, reject) {
  if (x === promise) {
    reject(new TypeError("Chaining cycle"));
  }
  if ((x !== null && typeof x === "object") || typeof x === "function") {
    //函数或对象
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            resolve(y);
          },
          (r) => {
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      reject(error);
    }
  } else {
    //普通值
    console.log("XXX", x);
    resolve(x);
  }
}

//用来解析回调函数的返回值x，x可能是普通值也可能是个promise对象
// function resolvePromise(bridgePromise, x, resolve, reject) {
//     //如果x是一个promise
//      if (x instanceof mPromise) {
//          //如果这个promise是pending状态，就在它的then方法里继续执行resolvePromise解析它的结果，直到返回值不是一个pending状态的promise为止
//          if (x.status === PENDING) {
//              x.then(y => {
//                  resolvePromise(bridgePromise, y, resolve, reject);
//              }, error => {
//                  reject(error);
//              });
//          } else {
//              x.then(resolve, reject);
//          }
//          //如果x是一个普通值，就让bridgePromise的状态fulfilled，并把这个值传递下去
//      } else {
//         resolve(x);
//      }
//  }

mPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

mPromise.prototype.finally = function (fn) {
  return this.then(
    (res) => mPromise.resolve(fn()).then(() => res),
    (err) =>
      mPromise.resolve(fn()).then((err) => {
        throw err;
      })
  );
};

mPromise.resolve = function (value) {
  return new mPromise((resolve) => {
    resolve(value);
  });
};

mPromise.reject = function (error) {
  return new mPromise((resolve, reject) => {
    reject(error);
  });
};

mPromise.all = function (arr) {
  let res = [];
  let len = 0;
  return new mPromise((resolve, reject) => {
    for (let i = 0; index < arr.length; i++) {
      const p = array[i];
      p.then(
        (data) => {
          res.push(data);
          ++len === arr.length ? resolve(res) : "";
        },
        (err) => {
          reject(err);
        }
      );
    }
    resolve(res);
  });
};

mPromise.race = function (arr) {
  return new mPromise((resolve, reject) => {
    arr.forEach((p) => {
      p.then(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};

mPromise.any = function (arr) {
  let res = [];
  let len = 0;
  return new mPromise((reslove, reject) => {
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      p.then(
        (data) => {
          reslove(data);
        },
        (err) => {
          res.push(err);
          ++len === arr.length ? reject(res) : "";
        }
      );
    }
  });
};

//原生promise tes
const p1 = new Promise((resolve, reject) => {
  console.log("p1 new Promise");
  setTimeout(() => {
    resolve("promise reslove value");
  }, 100);
});

p1.then((data) => {
  console.log("p1 then " + data);
  return "111111";
}).then((data) => {
  console.log("p1 then2 " + data);
});

//自定义mPromise test
const p2 = new mPromise((resolve, reject) => {
  console.log("p2 new mPromise");
  resolve(" mpromise reslove value");
});

p2.then((data) => {
  console.log("p2 then " + data);
  return 11;
}).then((r) => {
  console.log(r);
});

const p = new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove("1111111");
  }, 5000);
});

const p01 = p.then((res) => {
  console.log("res:", res);
  return new Promise((reslove1, reject1) => {
    reslove1("inner");
  });
});

p01.then((res) => {
  console.log("p01 res:", res);
});
