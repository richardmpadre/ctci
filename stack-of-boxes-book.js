class Box {

    constructor(h, w, l) {
        this.height = h;
        this.width = w;
        this.length = l;
    }

    canBeAbove(b) {
        return b.width > this.width && b.length > this.length;
    }
}


let boxes = [];
boxes.push(new Box(3, 5, 20));
boxes.push(new Box(1, 2, 2));
boxes.push(new Box(4, 10, 10));
boxes.push(new Box(2, 4, 11));

let result = createStack2(boxes);
console.log('boxes', result);

function createStack(boxes) {
    boxes.sort(boxSorter)
    let maxHeight = 0;
    let stackMap = Array.apply(null, Array(5)).map(() => 0);
    for (let i = 0; i < boxes.length; i++) {
        let height = createStackHelper(boxes, i, stackMap);
        maxHeight = Math.max(height, maxHeight);
    }

    return maxHeight;
}

function createStackHelper(boxes, bottomIndex, stackMap) {
    if (bottomIndex < boxes.length && stackMap[bottomIndex] > 0) {
        return stackMap[bottomIndex];
    }

    let bottom = boxes[bottomIndex];
    let maxHeight = 0;
    for (let i = bottomIndex + 1; i < boxes.length; i++) {
        if (boxes[i].canBeAbove(bottom)) {
            let height = createStackHelper(boxes, i, stackMap);
            maxHeight = Math.max(height, maxHeight);
        }
    }

    maxHeight += bottom.height;
    stackMap[bottomIndex] = maxHeight;
    return maxHeight;
}

function createStack2(boxes) {
    boxes.sort(boxSorter);
    let stackMap = Array.apply(null, Array(5)).map(() => 0);
    return createStackHelper2(boxes, null, 0, stackMap);
}

function createStackHelper2(boxes, bottom, offset, stackMap) {
    if (offset >= boxes.length) return 0;

    let newBottom = boxes[offset];
    let heightWithBottom = 0;
    if (bottom == null || newBottom.canBeAbove(bottom)) {
        if (stackMap[offset] == 0) {
            stackMap[offset] = createStackHelper2(boxes, newBottom, offset + 1, stackMap);
            stackMap[offset] += newBottom.height;
        }
        heightWithBottom = stackMap[offset];        
    }

    let heightWtihoutBottom = createStackHelper2(boxes, bottom, offset + 1, stackMap);
    return Math.max(heightWithBottom, heightWtihoutBottom);
}

function boxSorter(a, b) 
{
    if (a.height < b.height) {
        return 1;
    }

    if (a.height > b.height) {
        return -1;
    }

    return 0;
}

