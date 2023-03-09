let input = "1^0|0|1";
let result = countEval(input, false);
console.log('result', result);

function countEval(str, result) {
    if (str.length == 0) return 0;
    if (str.length == 1) return stringToBool(str) == result ? 1 : 0;

    let ways = 0;
    for (let i = 1; i < str.length; i+= 2) {
        let c = str[i];
        let left = str.substring(0, i);
        let right = str.substring(i + 1, str.length);

        let leftTrue = countEval(left, true);
        let leftFalse = countEval(left, false);
        let rightTrue = countEval(right, true);
        let rightFalse = countEval(right, false);
        let total = (leftTrue + leftFalse) * (rightTrue + rightFalse);

        let totalTrue = 0;
        if (c == "^") {
            totalTrue = leftTrue * rightFalse + leftFalse * rightTrue;
        } else if (c== "&") {
            totalTrue = leftTrue * rightTrue;
        } else if (c == "|") {
            totalTrue = leftTrue * rightTrue + leftFalse * rightTrue + leftTrue * rightFalse;
        }

        let subWays = result ? totalTrue : total - totalTrue;
        ways += subWays;
    }

    return ways;
}

function stringToBool(str) {
    return str == "1";
}