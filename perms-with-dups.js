let input = "abba";

console.log('input: ' + input, 'findPerms: ', findPerms(input));

console.log('input: ' + input, 'findPermsSln: ', findPermsSln(input));

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

function findPermsSln(str) {
    let result = []
    let map = createKeyMap(str);
    findPermsSlnHelper(map, "", str.length, result);
    return result;
}

function  findPermsSlnHelper(map, prefix, remaining, result) {
    if (remaining == 0) {
        result.push(prefix);
    }

    for(const key in map) {
        let count = map[key];
        if (count > 0) {
            map[key] = count -1;
            findPermsSlnHelper(map, prefix + key, remaining - 1, result);
            map[key] = count;
        }
    }
}

function createKeyMap(str) {
    let map = {};
    for (let x = 0; x < str.length; x++) {
        if (!map[str[x]]) {
            map[str[x]] = 0;
        }
        map[str[x]]  = map[str[x]] + 1;
    }

    return map;
}