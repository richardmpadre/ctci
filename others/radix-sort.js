let input = [170,45,75,90,802,24,2,66];
console.log('input', input);
let output = radixSort(input);
console.log('output', output);

function radixSort(arr) {
    const base = 10;
    let divider =  1;
    let maxVal = Number.NEGATIVE_INFINITY;

    while (divider === 1 || divider <= maxVal) {
        const buckets = [...Array(10)].map(() => []);
        for (const val of arr) {
            buckets[Math.floor((val/divider) % base)].push(val);
            maxVal = val > maxVal ? val: maxVal;
        }

        arr = [].concat(...buckets);
        divider *= base;
    };

    return arr;
}

function getMax(arr) {
    let maxNum = Math.max(arr);
    return maxNum.toString().length;

}