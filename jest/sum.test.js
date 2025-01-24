const sum = require('./sum.js');
test('adds 1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3)
})
test('对象赋值', () => {
    const data = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
});
test('乘法赋值', () => {
    const a = 3
    const b = 4
    expect(a * b).toEqual(12)
})
test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
});