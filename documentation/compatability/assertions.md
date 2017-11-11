# Using with other assertion libraries
Using other assertion libraries along with Passable can't be easier. Most popular assertion libraries are supported by default, and many others are supported as well. Basically, if it throws an error, it works. You can even use it alongside enforce. Say you want some `chaijs` goodness in Passable, here is how to do it:

```js
import { expect } from chai; // you can also just embed chai as a script tag if you don't use es6 imports

// data = {
//     username: 'ealush',
//     age: 27
// }

Passable('FormWithChai', (pass, enforce) => {
    pass('username', 'Should be a string', () => {
        expect(data.username).to.be.a('string');
    });

    pass('age', 'Should be a number and larger than 18', () => {
        expect(data.age).to.be.a('number');
        enforce(data.age).allOf({
            largerThan: 18
        });
    });
});

```