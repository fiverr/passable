# Adding custom enforce rules
To make it easier to reuse logic across your application, sometimes you would want to encapsulate bits of logic in rules that you can later on use, for example, what's considered a valid email.

Your custom rules are essentially a single javascript object containing your rules.
```js
const myCustomRules = {
    isValidEmail: (value) => value.indexOf('@') > -1,
    hasKey: (value, {key}) => value.hasOwnProperty(key),
    passwordsMatch: (passConfirm, options) => passConfirm === options.passConfirm && options.passIsValid
}
```
Just like the predefined rules, your custom rules can accepts two parameters:
* `value` The actual value you are testing against.
* `options` (optional) the options object which you pass when running your tests.

## Global Custom Rules
It is possible to add a global custom rules object named `customPassableRules` (to `window`, in the browser, or to `global` on the server) and have it store all your custom rules. This is especially useful when you have many tests that rely on the same logic, and you don't want to manually define them for each passable run.

Passable will grab all the rules configured in this object:
```js
// browser:
window.customPassableRules = {
    alwaysTrue: () => true,
    alwaysFalse: () => false,
    hasKey: (value, key) => value.hasOwnProperty(key)
}

// node:
global.customPassableRules = {
    alwaysTrue: () => true,
    alwaysFalse: () => false,
    hasKey: (value, key) => value.hasOwnProperty(key)
}
```

## Per Test Custom Rules
Sometimes you just want to extend Passable with more options that are not used anywhere else and shouldn't be stored globally.

Adding your rules so they are available to the enforce function is as simple as running Passable with another param.
```js
    const myCustomRules = {
        isValidEmail: (value) => value.indexOf('@') > -1,
        hasKey: (value, {key}) => value.hasOwnProperty(key),
        passwordsMatch: (passConfirm, options) => passConfirm === options.passConfirm && options.passIsValid
    }

    Passable('GroupName', () => {...}, myCustomRules);
```
```js
    Passable('GroupName', (test, enforce) => {
        test('TestName', 'Must have a valid email', () => {
            enforce(user.email).isValidEmail();
        });
    }, myCustomRules);
```

## Inline Custom Rules
There is another way to add rules per a single run that does not involve the hassle of creating a new rules object. Instead, the function can be written in-line, along with the other selected rules. Just as in all other rules, the value supplied to the function is the value being enforced.

```js
    Passable('GroupName', (test, enforce) => {
        test('TestName', 'Must have a valid email', () => {
            enforce(user.email).allOf({
                isValidEmail: (value) => value.indexOf('@') > -1,
                isEmpty: false
            });
        });
    });
```

**Note**: If a rule with the selection function name already exists, it will take precedence over the inline function, in which case, your tests may fail as you are supplying function value where it is not expected.