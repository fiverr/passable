const passable = require('passable');

console.log('Playground. Lets play!');

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