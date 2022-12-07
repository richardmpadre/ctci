const coinTypes = [1, 5, 10, 25];
let n = 25;
let result = [];
coins(n, 0, [], 0, result);

console.log('result:', result);

function coins(n, sum, combo, minCoin, result) {
    for (let x = minCoin; x < coinTypes.length; x++){
        let coin = coinTypes[x];
        let tempSum = sum + coin;
        combo.push(coin);

        if (tempSum < n) {
            coins(n, tempSum, combo, x, result);
            combo.pop();
            continue;
        } else if (tempSum == n) {
            result.push([...combo]);
            combo.pop();
            return;
        } else {
            combo.pop();
            return;
        }
       
    }
}