const passable = require('../dist/Passable');
const enforce = passable.enforce;

console.log('Playground. Lets play!');
console.log(`passable version: ${passable.VERSION}`);

const validity = passable('TestForm', (test) => {
    test('Field1', 'Should be valid', () => {
        enforce('string').allOf({
            isString: true,
            largerThan: 3,
            smallerThan: 10
        });
    });
});

console.log(validity);
