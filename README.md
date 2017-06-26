# Passable

Isomorphic data model validations made easy.

[![npm version](https://badge.fury.io/js/passable.svg)](https://badge.fury.io/js/passable) [![Build Status](https://travis-ci.org/ealush/passable.svg?branch=master)](https://travis-ci.org/ealush/passable) [![bitHound Overall Score](https://www.bithound.io/github/ealush/passable/badges/score.svg)](https://www.bithound.io/github/ealush/passable)

---

## What is Passable
More than anything, Passable is a way to structure your data model validations in a way that's easy to manage - as small tests, grouped logically. They can be interdependant, or standalone, they can perform your own validation logic, or rely on the predefined rules you can match your data model against.

![alt tag](https://raw.githubusercontent.com/ealush/passable/diagram/passable_diagram.png)

* [Why Passable](#why-passable-key-benefits)
    * [Structured Validations](#structured-validations)
    * [Isomorphic Validations](#isomorphic-validations)
* [How to use Passable](#how-to-use-passable)
    * [Installation](#installation)
    * [Test Construction](#test-construction)
    * [Accepted Params](#passable-params)
    * [The Enforce Function](#the-enforce-function)
        * [Predefined rules](#the-predefined-rules)
        * [Adding custom rules](#adding-more-custom-rules)
    * [Warn only tests](#warn-only-tests)
    * [Running specific Passes conditionally](#running-specific-passes-only-with-the-specific-param)

## Why Passable (Key benefits)
### Structured Validations
The basic notion behind Passable is that you would want to structure your data model validation in your application, in a way that's consistent and easy to follow. It isn't much of a problem in a smaller scale application, but as the application gets larger, and more complex, it gets harder to keep track of the different flows of the application and the ways data model validations are performed in each one. Passable gives you a consistent wstructure to construct your data model validations, in a way that's both reusable and easy to read.

### Isomorphic Validations
The other, possibly more important use of Passable, is server side validations. Since most of the times we perform validations, we send the data back to the server, we would like to perform the tests there as well. This causes a great deal of confusion and error. It is hard to keep the validations in the server and the client synced, so if we update a validation in the client side, or the server, it is easy to neglet and change it on the other side as well. Even if we _do_ keep them up to date, it is easy, especially if the server and the client are written in different languages, to have a slightly different interpertation of the logic on each end, whic, eventually, causes inconsistencies and bugs.

Instead, with Passable, you could just as easily set up a data model validations server that would run the same exact validation code that runs in the browser. No duplication, no sync problems.

---

# How to use Passable?

## Installation
`npm install passable --save`

## Test Construction

You construct your tests in a spec-like manner, grouping a bunch of tests together, for example, all inputs in a form.
When compared to a spec, you can see your current running instance of `Passable` as your describe function, and each `pass` is equivalent to a single it.

The `pass` function is a single test inside of the group of tests. It accepts the name of the test, description of the success condition, and the actual test function.
If the test function returns true, the test has passed. If not, it is considered as failed.

You could perform multiple 'passes' on the same data object. If you do so, it is recommended to use the same name for all these passes, as the results for all tests under the same name will be grouped together.
```js

// data = {
//  userName: "test",
//  email: "test@sil.ly"
// }

const validate = Passable('UserEditForm', (pass, enforce) =>  {
    pass('UserName', 'Must be at least 5 chars, but not longer than 20', () => {
        // this is an example using the predefined tests, using the 'enforce' function

        enforce(data.userName).allOf({
            largerThan: 5,
            smallerThan: 20
        });
    });

    pass('UserEmail', 'Must not end with the letter Y', () => {
        // this is an example for a free-style, do it yourself, validation
        return data.email.substr(-1) !== 'y';
    });
});
```

## Passable params

Listed here are the params Passable accepts:

| Name       | Optional? | type     | Description                                       |
|------------|:---------:|:--------:|---------------------------------------------------|
| `name`     | No        | String   | A name for the group of tests which is being run. |
| `specific` | Yes       | Array    | Whitelist of tests to run.                        |
| `passes`   | No        | Function | A function contains the actual validation logic.  |
| `custom`   | Yes       | Object   | Custom rules to extend the basic ruleset with.    |

And the resulting object for these tests would be:
```js
{
    name: 'UserEditForm',
    skipped: [],
    hasValidationErrors: true,
    hasValidationWarnings: false,
    testsPerformed: {
        UserName: {
            testCount: 1,
            failCount: 1
        },
        UserEmail: {
            testCount: 1,
            failCount: 1
        }
    },
    validationErrors: {
        UserName: [
            'Must be at least 5 chars, but not longer than 20'
        ],
        UserEmail: [
            'Must not end with the letter Y'
        ]
    },
    validationWarnings: {},
    failCount: 2,
    warnCount: 0,
    testCount: 2
}
```

## Passable params

Listed here are the params Passable accepts:

| Name       | Optional? | type     | Description                                       |
|------------|:---------:|:--------:|---------------------------------------------------|
| `name`     | No        | String   | A name for the group of tests which is being run. |
| `specific` | Yes       | Array    | Whitelist of tests to run.                        |
| `passes`   | No        | Function | A function contains the actual validation logic.  |
| `custom`   | Yes       | Object   | Custom rules to extend the basic ruleset with.    |

# The enforce function
The enforce function runs predefined rules in sequence. Its intended use is for validations logic that gets repeated over and over again and shouldn't be written manually.
For each rule, you may also pass either value or an options object that may be used by the function of the rule.

The enforce function exposes the following four functions:
* `allOf` - makes sure all rules specified are true.
* `anyOf` - makes sure at least one rule is true.
* `noneOf` - makes sure no rule is true.
* `fin` - returns the result.

All functions are chainable, fin must be at the end. All functions other than fin can be used more than once. All enforce chain-blocks are in an `AND` relationship, which means that if one block is `false` the others won't even get evaluated.

All the following are valid uses of enforce.
```js
    enforce([1,2,3,4,5,6]).anyOf({
        largerThan: 5, // in anyOf - this one is enough to set the anyOf block to true
        smallerThan: 6,
    }).noneOf({
        isString: true, // in noneOf, all must be false
        isNumber: true
    }).allOf({
        isArray: true
    }).fin(); // true

    -------------

    enforce('North Dakota, por favor').noneOf({
        largerThan: 5,
        smallerThan: 2,
        matches: /[0-9]/
    }).fin(); // false

    -------------

    enforce('I consider it asshole tax').anyOf({
        largerThan: 5,
        smallerThan: 2
    }).anyOf({
        smallerThan: 150
    }).fin(); // true

```

When using `enforce`, you do not have to return the result (although you may), each of your enforce tests updates the result of the whole pass. You may also use multiple enforces in the same pass function, they will simply run in sequence.

Again, as in the different enforce functions, all `enforce` call have an `AND` relationship, which means that once one call fails, the whole pass fails.

```js
pass('test', 'multiple enforces', () => {
    enforce('str1').allOf({...}).anyOf({...}).fin();
    enforce('str2').noneOf({...}).fin();
    enforce('str3').anyOf({...}).fin();
});
```

## The predefined rules
At the moment there are only a few predefined rules.

| Name           | Type | Accepts        | Description                                              |
|----------------|:----:|:--------------:|----------------------------------------------------------|
| `isArray`      | Lang | Boolean (for negative check) | Determines whether a given value is an array or not.     |
| `isString`     | Lang | Boolean (for negative check) | Determines whether a given value is a string or not.     |
| `isNumber`     | Lang | Boolean (for negative check) | Determines whether a given value is a number or not.     |
| `isEmpty`      | Size | Boolean (for negative check) | Returns true if a given value is empty(object/array), false, undefined, null, NaN or equals zero |
| `matches`   | Content | RegExp  | Tests value against RegExp. Returns true even for a partial match. |
| `largerThan`   | Size | value  | Compares numbers, array/string lengths and object sizes. |
| `sizeEquals`   | Size | value  | Compares numbers, array/string lengths and object sizes. |
| `smallerThan`  | Size | value  | Compares numbers, array/string lengths and object sizes. |

## Adding more (/custom) rules
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

Adding your rules so they are available to the enforce function is as simple as running Passable with another param.
```js
    Passable('GroupName', () => {...}, myCustomRules);
```
```js
    Passable('GroupName', (pass, enforce) => {
        pass('TestName', 'Must have a valid email', () => {
            enforce(user.email).allOf({
                isValidEmail: null
            }).fin();
        });
    }, myCustomRules);
```

## Warn only tests
By default, `pass` functions with the return value of `false` will fail your test group and set `hasValidationErrors` to `true`. Sometimes you would want to set a warn-only validation test (password strength, for example). In this case, you would add the 'warn' flag to your pass function.
This will leave `hasValidationErrors` unchanged (other tests may have set it to `true`), and update `hasValidationWarnings` to `true`. It will also bump up `warnCount`.

If no flag is added, your pass function will default to `fail`.

```
const validate = Passable('WarnAndPass', (pass, enforce) =>  {
    pass('WarnMe', 'Should warn and not fail', 'warn', () => false);
});
```

Will result in the following object:
```js
{
    name: 'WarnAndPass',
    skipped: [],
    hasValidationErrors: false,
    hasValidationWarnings: true,
    testsPerformed: {
        WarnMe: {
            testCount: 1,
            failCount: 0,
            warnCount: 1
        }
    },
    validationErrors: {},
    validationWarnings: {
        WarnMe: [
            'Should warn and not fail'
        ]
    },
    failCount: 0,
    warnCount: 1,
    testCount: 1
}
```

## Running specific passes only with the `specific` param
Sometimes you would want to run only specific tests in your group. For example, when running validations on an input change, you would probably want to test it specifically, and not the other test in the same group. This is simple using the `specific` param. The specific param is optional, and it accepts an array of pass functions to include (by their name). The easiest to use it in a reusable way, is to wrap your Passable group with a function that passes down the fields to include, only if needed.

In the following example, only `First` pass is going to run. `Second` will be skipped.
```js
const result = SpecificTests(['First']);

function SpecificTests (specific) {
    return Passable('SpecificTests', specific, (pass, enforce) => {
        pass('First',   'should pass', () => true);
        pass('Second',  'should pass', () => true);
    });
};
```