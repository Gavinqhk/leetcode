let arr = [1, [2, [3, [4, 5]]], 6,'77','straa',{a:1}, function f(){}]
const arr2 = [1, [2, [3, [4, 5]]], 6,]

const flattend = []
function flatArr(arr) {
    if (!(arr instanceof Array)) {
        console.error('参数须为Array')
        return "参数须为Array"
    }
    arr.forEach(element => {
        if (element instanceof Array) {
            flatArr(element)
        } else {
            flattend.push(element)
        }
    });
    return flattend
}

function flat_reduce(arr) {
    return arr.reduce((pre,cur) => {
        return pre.concat(Array.isArray(cur) ? flat_reduce(cur) : cur)
    }, [])
}

console.log(flat_reduce(arr2))