let arr = [5, 3, 1, 8, 2, 10, 4];

console.log('input: ', arr);
mergeSort(arr);
console.log('output: ', arr);

function mergeSort(arr) {
    let helper = new Array(arr.length);
    mergeSortHelper(arr, helper, 0, arr.length - 1);
}

function mergeSortHelper(arr, helper, low, high) {
    if (low < high) {
        let middle = Math.floor((low + high) / 2);
        mergeSortHelper(arr, helper, low, middle);
        mergeSortHelper(arr, helper, middle + 1, high);
        merge(arr, helper, low, middle, high);
    }
}

function merge(arr, helper, low, middle, high) {
    for (let i = low; i <= high; i++) {
        helper[i] = arr[i];
    }

    let helperLeft = low;
    let helperRight = middle + 1;
    let current = low;

    while (helperLeft <= middle && helperRight <= high) {
        if (helper[helperLeft] <= helper[helperRight]) {
            arr[current] = helper[helperLeft];
            helperLeft++;
        } else {
            arr[current] = helper[helperRight];
            helperRight++;
        }

        current++;
    }

    let remaining = middle - helperLeft;
    for (let i = 0; i <= remaining; i++) {
        arr[current + i] = helper[helperLeft + i];        
    }
}