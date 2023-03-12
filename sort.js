function checkArray(array) {
  if (!(array instanceof Array)) return;
}

function swap(array, l, r) {
  let temp = array[l];
  array[l] = array[r];
  array[r] = temp;
}

/**
 * 冒泡排序
 * @param { array } arr 待排序数组
 */
function bubbleSort(arr) {
  checkArray(arr);
}

/**
 * 快速排序
 * @param {array} arr
 */
function quickSort(arr) {}

/**
 * 选择排序
 * @param {array} arr
 */
function selectSort(arr) {}

bubbleSort([3, 1, 5, 2, 6, 8, 0, 11]);
