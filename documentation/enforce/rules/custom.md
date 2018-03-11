# Custom `enforce` rules
To make it easier to reuse logic across your application, sometimes you would want to encapsulate bits of logic in rules that you can use later on, for example, "what's considered a valid email".

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
* `args` (optional) the arguments which you pass on when running your tests.

## Extending `Enforce` with custom rules
> Since 6.0.0

You can add your custom rules directly to enforce to allow reusability. As describe in [enforce](../README.md), you simply need to create a new instance of `Enforce` and add the rules as the argument.

```js
import passable, { Enforce } from 'passable';

const myCustomRules = {
    isValidEmail: (value) => value.indexOf('@') > -1,
    hasKey: (value, key) => value.hasOwnProperty(key),
    passwordsMatch: (passConfirm, options) => passConfirm === options.passConfirm && options.passIsValid
}

const enforce = new Enforce(myCustomRules);

passable('GroupName', (test) => {
    test('TestName', 'Must have a valid email', () => {
        enforce(user.email).isValidEmail();
    });
});
```

## Inline Custom Rules
There is another way to add rules per a single run that does not involve the hassle of creating a new rules object. Instead, the function can be written in-line, along with the other selected rules. Just as in all other rules, the value supplied to the function is the value being enforced.

```js
    passable('GroupName', (test) => {
        test('TestName', 'Must have a valid email', () => {
            enforce(user.email).allOf({
                isValidEmail: (value) => value.indexOf('@') > -1,
                isEmpty: false
            });
        });
    });
```

**Note**: If a rule with the selection function name already exists, it will take precedence over the inline function, in which case, your tests may fail as you are supplying function value where it is not expected.