let arr = [3, 2, 1, 4]

console.log('input: ', arr);
selectionSort(arr);
console.log('output: ', arr);

function selectionSort(arr) {

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1])             {
                swap(arr, j, j+1);
            }
        }
        
    }
}

function swap(arr, s, t) {
    let temp = arr[t];
    arr[t] = arr[s];
    arr[s] = temp;
}