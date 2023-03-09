let result = generateParens(3);
console.log(Object.keys(result));

function generateParens(n) {
    let set = {};
    if (n == 0) {
        set[""] = "";
        return set;
    } else {
        let prev = generateParens(n - 1);
        for (const key in prev) {
            for (let i = 0; i < key.length; i++) {
                let s = insertInside(key, i);
                set[s] = "";
            }

            set["()" + key] = "";
        }
    }

    return set;
}

function insertInside(str, leftIndex) {
    let left = str.substring(0, leftIndex + 1);
    let right = str.substring(leftIndex + 1, str.length);
    return left + "()" + right;
}