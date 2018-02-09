# Writing tests
 Much like when writing unit-tests, writing validations with Passable is all about knowing in advance which values you expect to get. The structure is very similar to the familiar unit test `describe/it/expect` combo, only that with Passable the functions you will mostly run are `Passable/test/enforce`.

 * `Passable` - the wrapper for your form validation, much like the describe function in unit tests.
 * `test` - a single tests, most commonly a single field, much like the it function in unit tests. [More about test](../test/index.md)
 * `enforce` - the function which gets and enforces the data model compliance, similar to the expect function in unit tests. [More about enforce](../enforce/README.md);

The most basic test would look somewhat like this:

```js
// data = {
//     username: 'ealush',
//     age: 27
// }
Passable('NewUserForm', (test, enforce) => {
    test('username', 'Must be a string between 2 and 10 chars', () => {
        enforce(data.username).allOf({
            isString: true,
            largerThan: 1,
            smallerThan: 11
        });
    });

    test('age', 'Can either be empty, or larger than 18', () => {
        enforce(data.age).anyOf({
            isEmpty: true,
            largerThan: 18
        });
    })
});
```

In the example above, we tested a form named `NewUserForm`, and ran two tests on it. One of the `username` field, and one on the `age` field. When testing the username field, we made sure that **all** conditions are true, and when testing age, we made sure that **at least one** condition is true.

If our validation fails, among other information, we would get the names of the fields, and an array of errors for each, so we can show them back to the user.
