const passable = require('../dist/Passable.min');

console.log('Playground. Lets play!');
console.log(`passable version: ${passable.VERSION}`);

const validity = passable('TestForm', (pass, enforce) => {
    pass('Field1', 'Should be valid', () => {
        enforce('string').allOf({
            isString: true,
            largerThan: 3,
            smallerThan: 10
        });
    });
});

console.log(validity);
