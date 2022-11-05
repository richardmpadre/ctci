let n = 3;
console.log('n: ', n + ', output: ', parens(n));


function parens(n) {
    if (n == 0) return null;

    let result = [];
    let prefix = "()";
    append(prefix, n - 1, result);
    enclose(prefix, n - 1, result);
    return result;
}

function append(prefix, n, result) {
    prefix += "()";
    
    let next = n - 1;
    if (next == 0) {
        result.push(prefix);
        return;
    }

    append(prefix, next, result);
    enclose(prefix, next, result);
}


function enclose(prefix, n, result) {
    prefix = '(' + prefix + ')';
    
    let next = n - 1;
    if (next == 0) {
        result.push(prefix);
        return;
    }

    append(prefix, next, result);
    enclose(prefix, next, result);
}


function prepend(prefix, n, result) {
    prefix = "()" + prefix;
    
    let next = n - 1;
    if (next == 0) {
        result.push(prefix);
        return;
    }

    append(prefix, next, result);
    enclose(prefix, next, result);
    prepend(prefix, next, result);
}
