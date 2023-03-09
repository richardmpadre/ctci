const GRID_SIZE = 8;

let result = [];
placeQueen(0, [], result);
console.log('result', result.length);

function placeQueen(row, cols, result) {
    if (row == GRID_SIZE) {
        result.push([...cols]);
    } else {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (isValid(c, row, cols)) {
                cols.push(c);
                placeQueen(row + 1, cols, result);
                cols.pop();
            }            
        }
    }
}

function isValid(c1, r1, cols) {

    for (let r2 = 0; r2 < r1; r2++) {
        let c2 = cols[r2];
        
        if (c1 == c2) return false;

        let cDistance = Math.abs(c2 - c1);
        let rDistance = Math.abs(r2 - r1);

        if (cDistance == rDistance) return false;        
    }

    return true;
}