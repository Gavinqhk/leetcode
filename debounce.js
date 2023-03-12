function debounce(fn, time, imm) {
    let t1 = new Data().getTime();
    let called = false;
    return function() {
        let context = this;
        let t2 = new Data().getTime();
        if (imm) {
            if (called) {
                if(t2 - t1 >= time) {
                    fn.apply(context);
                }
            } else {
                called = true;
                fn.apply(context);
            }
        } else {
            if (t2 - t1 >= time) {
                fn.apply(context);
            }
        }
        t1 = t2;
    }
}

function debounce(fn, wait, imm) {
    let timer = null;
    let result = null;
    return function() {
        let context = this;
        if (timer) {
            clearTimeout(timer);
        }
        if (imm) {
            let called = timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            if(!called) {
                result = fn.apply(context);
            }
        } else {
            setTimeout(() => {
                fn.apply(context);
            }, wait)
        }
        return result;
    }
}