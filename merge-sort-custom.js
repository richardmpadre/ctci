let input = [5, 3, 1, 8, 2, 10, 4];

console.log('input', input);
mergeSort(input);
console.log('output', input);

function mergeSort(arr) {
    let temp = new Array(arr.length);
    mergeSortUtil(arr, temp, 0, arr.length - 1);
}

function mergeSortUtil(arr, temp, start, end) {
    if (start < end) {
        let middle = Math.floor((start + end) / 2);
        mergeSortUtil(arr, temp, start, middle);
        mergeSortUtil(arr, temp, middle + 1, end);
        mergeSides(arr, temp, start, middle, end);
    }
}

function mergeSides(arr, temp, low, middle, high) {
    for (let i = low; i <= high; i++) {
        temp[i] = arr[i];        
    }

    let helperLeft = low;
    let helperRight = middle + 1;
    let current = low;

    while (helperLeft <= middle && helperRight <= high) {
        if (temp[helperLeft] < temp[helperRight]) {
            arr[current] = temp[helperLeft];
            helperLeft++;
        } else {
            arr[current] = temp[helperRight];
            helperRight++;
        }
        current++;
    }

    let remaining = middle - helperLeft;
    for (let i = 0; i <= remaining; i++) {
        arr[current + i] = temp[helperLeft + i];
    }
}