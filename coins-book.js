let result = makeChange(100);
console.log('result', result);

function makeChange(n) {
    let denoms = [25, 10, 5, 1];
    return makeChangeHelper(n, denoms, 0);
}

function makeChangeHelper(n, denoms, index) {
    if (index >= denoms.length - 1) return 1;

    let denom = denoms[index];
    let ways = 0;

    for (let x = 0; x * denom <= n; x++) {
        let amountRemaining = n - (x * denom);
        ways += makeChangeHelper(amountRemaining, denoms, index+1);
    }

    return ways;
}


function makeChangeOptimized(n, )