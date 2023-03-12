
// 立即执行，停止触发后不再执行
function throttle(fn, time) {
    let context = null;
    let args = null;
    let prov = 0;
    return function() {
        let now = new Data().getTime();
        context = this;
        args = arguments;
        if (now - prov >= time) {
            fn.apply(context, args);
            prov = now;
        }
    }
}

// time时间后执行，停止触发后再执行一次。
function throttle(fn, time) {
    let context = null;
    let args = null;
    let timer = null;
    return function() {
        context = this;
        args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(context, args);
            }, time)
        }
    }
}
