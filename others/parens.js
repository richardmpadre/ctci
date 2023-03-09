let n = 5;

for (let i = 0; i < n; i++) {
    console.log('n: ', i + ', parensHelper: ', parensHelper(i));
    console.log('n: ', i + ', parensBookSln1: ', Object.keys(parensBookSln1(i)));
}

function parensHelper(n) {
    let result = [];
    if (n == 0) return result;

    parens("", n, result, 3);

    return result;
}
// actionType { 1:'prepend', 2:'enclose' , 3:'append'  }
function parens(str, n, result, actionType) {
    switch (actionType) {
        case 1:
            str = "()" + str;
            break;
        case 2:
            str = "(" + str + ")";
            break;
        case 3:
            str = str + "()";
            break;
    }

    n = n - 1;
    if (n == 0) {
        result.push(str);
        return;
    }

    if (actionType != 3) {
        parens(str, n, result, 1);
    }

    parens(str, n, result, 2);
    parens(str, n, result, 3);
}

