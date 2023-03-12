//在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

function curry(fn, args) {
    let len = fn.length; //保存fn参数的长度
    args = args || [];

    return function() {
        let innerArgs = [].slice.call(arguments, 0);
        for (let i = 0; i < innerArgs.length; i++) {
            args.push(innerArgs[i]);
        }
        if (args.length < len) {
            return curry.call(this, fn, args);
        } else {
            return fn.apply(this, args);
        }
    }
}

function add(x, y, z) {
    return x + y + z
}
let fn = curry(add);
let res = fn(1)(2,3);

console.log(res);


// 偏函数，就是固定一些参数。局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。
