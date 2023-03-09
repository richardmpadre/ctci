let exps = [
    "1|1|1",
    "0&0&0&1^1|0",

];

let memory = {};
for (let x = 0; x < exps.length; x++) {
    const exp = exps[x];
    let result = boolEval(exp, true, memory);
    console.log(result);
}

function boolEval(exp, result, memory) {
    let key = exp + result;
    if (memory[key]) {
        return memory[key];
    }

    if (exp.length == 1) return (stringToBool(exp) == result) ? 1 : 0;
    let ways = 0;

    for (let c = 1; c < exp.length; c += 2) {
        let left = exp.substring(0, c);
        let right = exp.substring(c + 1, exp.length);

        let leftTrue = boolEval(left, true, memory);
        let leftFalse = boolEval(left, false, memory);
        let rightTrue = boolEval(right, true, memory);
        let rightFalse = boolEval(right, false, memory);
        let total = (leftTrue +  leftFalse) * (rightTrue + rightFalse);

        let totalTrue = 0;
        if (exp[c] == '&') {
            totalTrue = leftTrue * rightTrue;
        }
        else if (exp[c] == "^") {
            totalTrue = (leftTrue * rightFalse) + (leftFalse * rightTrue);
        }
        else if (exp[c] == '|') {
            totalTrue = (leftTrue * rightTrue) + (leftTrue * rightFalse) + (rightTrue * leftFalse);
        }

        let subways = result ? totalTrue : total - totalTrue;
        ways += subways;
    }

    memory[key] = ways;
    return ways;

}

function stringToBool(str) {
    return (str == "1");
}