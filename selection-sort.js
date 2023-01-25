let arr = [3, 2, 1, 4]

console.log('input: ', arr);
selectionSort(arr);
console.log('output: ', arr);

function selectionSort(arr) {

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i+1; j < arr.length - 1; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        swap(arr, i, minIndex);                
    }
}

function swap(arr, s, t) {
    let temp = arr[t];
    arr[t] = arr[s];
    arr[s] = temp;
}