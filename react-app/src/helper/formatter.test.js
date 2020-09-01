const { getTime } = require("./formatter");

test('Tests for input 100 seconds', () => {
    expect(getTime(100)).toBe('1:40');
});

test('Tests for input 60 seconds', () => {
    expect(getTime(60)).toBe('1:00');
});

test('Tests for input 3600 seconds (1 hour)', () => {
    expect(getTime(3600)).toBe('1:00:00');
});

test('Tests for input 4095 seconds', () => {
    expect(getTime(4095)).toBe('1:08:15');
});