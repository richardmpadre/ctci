class Box {
    height;

    constructor(h) {
        this.height = h;
    }

    canBeAbove(b) {
        return b.height > this.height;
    }
}

let boxes = [];
boxes.push(new Box(3));
boxes.push(new Box(1));
boxes.push(new Box(4));
boxes.push(new Box(2));

let result = createStack(boxes);
console.log('boxes', result);

function createStack(boxes) {
    boxes.sort(boxSorter)
    let maxHeight = 0;
    for (let i = 0; i < boxes.length; i++) {
        let height = createStackHelper(boxes, i);
        maxHeight = Math.max(height, maxHeight);
    }

    return maxHeight;
}

function createStackHelper(boxes, bottomIndex) {
    let bottom = boxes[bottomIndex];
    let maxHeight = 0;
    for (let i = bottomIndex + 1; i < boxes.length; i++) {
        if (boxes[i].canBeAbove(bottom)) {
            let height = createStackHelper(boxes, i);
            maxHeight = Math.max(height, maxHeight);
        }
    }

    maxHeight += bottom.height;
    return maxHeight;
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