class Box {
    length;
    width;
    height;

    constructor(l, w, h) {
        this.length = l;
        this.width = w;
        this.height = h;
    }
}

let box1 = new Box(2, 2, 2);
let box2 = new Box(4, 4, 4);
let box3 = new Box(3, 3, 3);
let box4 = new Box(1, 1, 1);
let boxes = [
    box1,
    box2,
    box3,
    box4
];

let result = stackBoxes(boxes);
console.log('result', result);

function stackBoxes(boxes) {

    let stack = [];
    let height = 0;
    while (boxes.length > 0) {
        let box = boxes.pop();

        if (stack.length == 0) {
            stack.push(box);
            height += box.height;
        } else {
            let temp = [];
            while (isFirstBoxBigger(box, stack.slice(-1).pop())) {
                let poppedBox = stack.pop();
                height -= poppedBox.height;
                temp.push(poppedBox);
            }

            stack.push(box);
            height += box.height;

            while (temp.length > 0) {
                let poppedBox = temp.pop();
                height += poppedBox.height;
                stack.push(poppedBox);                
            }
        }
    }

    console.log('height', height);

    return stack;
}

function isFirstBoxBigger(box1, box2) {
    if (box2 == null) return false;
    return (box1.length > box2.length &&
        box1.width > box2.width &&
        box1.height > box2.height)
}