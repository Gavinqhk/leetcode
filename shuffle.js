/**
 * 乱序数组/洗牌算法
 * 获取不超过长度的随机数与最后一位数字交换，并且长度-1。长度后面的数据就是乱序之后的结果。
 * 
 * @param {*} arr 数组参数
 * @returns 新数组
 */

function shuffle(arr) {
    let argArr = [...arr];
    let len = argArr.length;
    while(len > 0) {
        // 通过位运算符向下取整
        // let randomIndex = (Math.random() * len--) >> 0;
        let randomIndex = Math.floor(Math.random() * len--);
        [argArr[randomIndex], argArr[len]] = [argArr[len], argArr[randomIndex]];
    }
    return argArr;
}

let a = [1,2,3,4,5]
let res = shuffle(a)
console.log(a);
console.log(res);


/**
 * 
 * @param {*} arr 数组
 * @param {*} count 获取的个数
 * @param {*} 返回获取的数组成的数组
 */
function getRandomArrElement(arr, count) {
    let argArr = [...arr],
        len = argArr.length,
        i = len - count;
    while(len > i) {
        let randomIndex = (Math.random() * len--) >> 0;
        [argArr[randomIndex], argArr[len]] = [argArr[len], argArr[randomIndex]];
    }
    return argArr.slice(i);
}

const arr = [6,5,4,3,2,1]

const res2 = getRandomArrElement(arr, 3);
console.log(arr);
console.log(res2);

/**
 * 获取min-max范围内的随机数
 * 
 * @param {*} max 
 * @param {*} min 
 * @returns 
 */
function randomNum(max, min) {
    let n = max - min;
    if (n == 0) {
        return max
    } else if(n < 0) {
        [max, min] = [min, max]
        n = Math.abs(n)
    }
    return Math.floor(Math.random() * n) + min;
}
