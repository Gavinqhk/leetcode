function myMap(cbfn, thisArg) {
    // 处理异常情况
    if(this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // 处理cbfn异常
    if (typeof cbfn !== 'function') {
        throw new TypeError(callbackfn + ' is not a function');
    }

    let O = Object(this)
    let T = thisArg

    
}