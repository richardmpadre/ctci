class Point {

    color;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    top() {
        return new Point(this.x, this.y - 1)
    }

    right() {
        return new Point(this.x + 1, this.y)
    }

    bottom() {
        return new Point(this.x, this.y + 1)
    }


    left() {
        return new Point(this.x - 1, this.y)
    }
}


let screen = buildScreen(3);
let targetPoint = new Point(1, 1);
let targetPixel = getPixel(screen, targetPoint);

colorFill(screen, targetPixel, 3, targetPoint);
console.log(screen);

function colorFill(screen, sourceColor, targetColor, targetPoint) {
    let pixel = getPixel(screen, targetPoint);
    if (pixel == null || pixel != sourceColor) return;

    screen[targetPoint.y][targetPoint.x] = targetColor;
    colorFill(screen, sourceColor, targetColor, targetPoint.top());
    colorFill(screen, sourceColor, targetColor, targetPoint.right());
    colorFill(screen, sourceColor, targetColor, targetPoint.bottom());
    colorFill(screen, sourceColor, targetColor, targetPoint.left());
}


function getPixel(screen, point) {
    let x = point.x;
    let y = point.y;

    if (x < 0 || y < 0) return null;

    if (y >= screen.length) return null;

    let row = screen[y];
    if (x >= row.length) return null;

    return screen[y][x];
}

function buildScreen(n) {
    return [
        [0, 0, 2],
        [0, 0, 0],
        [0, 0, 0],
    ]
}

