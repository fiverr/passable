# Writing tests
 Much like when writing unit-tests, writing validations with Passable is all about knowing in advance which values you expect to get. The structure is very similar to the familiar unit test `describe/it/expect` combo, only that with Passable the functions you will mostly run are `Passable/test/enforce`.

 * `Passable` - the wrapper for your form validation, much like the describe function in unit tests.
 * `test` - a single tests, most commonly a single field, much like the it function in unit tests. [More about test](../test/index.md)
 * `enforce` - the function which gets and enforces the data model compliance, similar to the expect function in unit tests. [More about enforce](../enforce/README.md);

 ## Passable Parameters
 The passable suite accepts three arguments:

| Name       | Optional? | Type     | Description
|------------|:---------:|:--------:|------------------------------------------------
| `name`     | No        | String            | A name for the group of tests. E.G - form name
| `tests`    | No        | Function          | A function containing the actual validation logic.
| `only/not` | Yes       | Array / Object    | Whitelist or blacklist of tests to run/skip in the suite see: [Running a specific tests](../test/specific.md)


The most basic test would look somewhat like this:

```js
// data = {
//     username: 'ealush',
//     age: 27
// }
passable('NewUserForm', (test) => {
    test('username', 'Must be a string between 2 and 10 chars', () => {
        enforce(data.username).isString().largerThan(1).smallerThan(11);
    });

    test('username', 'already exists', fetch(`/check_availability?username=${data.username}`));

    test('age', 'Must be greater than 18', () => {
        enforce(data.age).greaterThan(18);
    });
});
```

In the example above, we tested a form named `NewUserForm`, and ran two tests on it. One of the `username` field, and one on the `age` field. When testing the username field, we made sure that **all** conditions are true, and when testing age, we made sure that **at least one** condition is true.

If our validation fails, among other information, we would get the names of the fields, and an array of errors for each, so we can show them back to the user.

## Accessing the intermediate test result from within your suite
// since 6.3.0

In some cases, you might want to access the intermediate result, for example, if you'd like to stop a server call from happening for a field that's already invalid. To do that, you can access the draft of the result object from within the test suite, using its second argument.

**Note**: It is only possible to access intermediate test results for sync tests, and it is recommended to put all the async tests at the bottom of your suite so they have access to the result of all the sync tests.

In the following example, we're preventing the async validation from running over the username field in case it already has errors.

```js
passable('NewUserForm', (test, draft) => {
    test('username', 'Must be a string between 2 and 10 chars', () => {
        enforce(data.username).isString().largerThan(1).smallerThan(11);
    });

    if (!draft.hasErrors('username')) {
        // if the username did not pass the previous test, the following test won't run
        test('username', 'already exists', fetch(`/check_availability?username=${data.username}`));
    }
});
```
