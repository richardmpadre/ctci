console.log(`swap a:2, b:10 = `, numberSwapper(2, 10));
console.log(`swap a:-8, b:4 = `, numberSwapper(-8, 4));

function numberSwapper(a, b) {
    a = Math.abs(a - b);
    b = b - a;
    a = a + b;

    console.log('a', a);
    console.log('b', b);
}