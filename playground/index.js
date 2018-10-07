const passable = require('../dist/Passable');
const enforce = passable.enforce;

console.log('Playground. Lets play!');
console.log(`passable version: ${passable.VERSION}`);

passable('TestForm', (test) => {
    test('Field1', 'Should be valid', () => {
        enforce('string').allOf({
            isString: true,
            largerThan: 3,
            smallerThan: 10
        });
    });

    test('Field2', 'should wait some and pass', new Promise((resolve, reject) => setTimeout(resolve, 1000)));
    test('Field3', 'should wait some and fail', new Promise((resolve, reject) => setTimeout(reject, 3000)));
}).done(console.log);
