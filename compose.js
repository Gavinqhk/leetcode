
// compose的现象是：传入多个函数，函数从右往左执行，并把每次执行的结果传给左边一个当作参数。类似reduxRight。最终返回一个函数。

function compose() {
    let outArgs = arguments;
    let start = outArgs.length - 1;

    return function() {
        let context = this;
        let args =  arguments;
        let result = outArgs[start].apply(context, args);
        while(start > 0) {
            // 因为是单个参数result，所以使用call
            result = outArgs[--start].call(context, result);
        }
        return result;
    }
}