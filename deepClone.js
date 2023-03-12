function deepClone(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {}
        for (const key in target) {
            cloneTarget[key] = deepClone(target[key]);
        }
    } else {
        return target
    }
}

// 解决循环引用

function deepClone(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        let isArray = Array.isArray(target)
        let cloneTarget = isArray ? [] : {}
        if (map.get(target)) {
            return target
        }
        map.set(target, cloneTarget)
        let keys = isArray ? undefined : Object.keys(target)
        if (keys) {
            console.log(keys)
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                cloneTarget[key] = deepClone(target[key], map)
            }
            return cloneTarget
        }
    } else {
        return target
    }
}

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};

target.target = target;
console.time();
const result2 = deepClone(target);
console.timeEnd();