let input = "abaa";

console.log('input: ' + input, 'output: ', findPerms(input));

function findPerms(str) {
    if (str == null) return null;
    if (str.length == 1) return str;

    let result = [];
    let keyMap = {};

    for (let x = 0; x < str.length; x++) {
        if (keyMap[str[x]] == true) continue;
        keyMap[str[x]] = true;

        let before = str.substring(0, x);
        let after = str.substring(x + 1);
        let words = findPerms(before + after);

        for (let y = 0; y < words.length; y++) {
            result.push(str[x] + words[y]);            
        }
    }

    return result;
}