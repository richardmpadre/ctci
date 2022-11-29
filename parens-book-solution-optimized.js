let result = generateParensOptimized(2);
console.log('result', result);

function addParen(list, leftRem, rightRem, str, index) {
    if (leftRem < 0 || rightRem < leftRem) return; // invalid state;

    if (leftRem == 0 && rightRem == 0) {
        list.push(str.join(""));
    } else {
        str[index] = '(';
        addParen(list, leftRem - 1, rightRem, str, index + 1);

        str[index] = ')';
        addParen(list, leftRem, rightRem - 1, str, index + 1);
    }
}

function generateParensOptimized(count) {
    let str = [];
    let list = [];

    addParen(list, count, count, str, 0);
    return list;
}
