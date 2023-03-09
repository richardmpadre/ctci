let input = [2,0,1,5,8,7,3,6];
console.log('input', input);
quickSort(input, 0, input.length -1);
console.log('output', input);

function quickSort(arr, left, right) {
    let index = partition(arr, left, right);
    if (left < index - 1) {
        quickSort(arr, left, index - 1);
    }

    if (index < right) {
        quickSort(arr, index, right);
    }
}

function partition(arr, left, right) {
    let pivotIndex = Math.floor((left + right) / 2);
    let pivot = arr[pivotIndex];

    while (left <= right) {

        while (arr[left] < pivot) left++;
        while (arr[right] > pivot) right--;

        if (left <= right) {
            swap(arr, left, right);
            left++;
            right--;
        }
    }

    return left;
}

function swap(arr, left, right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
}