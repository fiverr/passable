# Using with other assertion libraries
Using other assertion libraries along with Passable can't be easier. Most popular assertion libraries are supported by default, and many others are supported as well. Basically, if it throws an error, it works.

For example, let's say you want to use the popular <a href="https://github.com/imbrn/v8n" target="_blank">v8n</a> validation library, which can be <a href="https://imbrn.github.io/v8n/Validation.html#exception-based-validation" target="_blank">configured to throw an exception</a> for failed validations.

```js
import passable, { enforce } 'passable';
import v8n from 'v8n';

// data = {
//     username: 'ealush',
//     age: 27
// }

passable('FormWithV8N', (test) => {
    test('username', 'Should be a string', () => {
        v8n()
            .string()
            .check(data.username);
    });

    test('age', 'Should be a number and larger than 18', () => {
        v8n()
            .number()
            .greaterThan(18)
            .check(data.age);
    });
});

```