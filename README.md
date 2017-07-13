# Passable

Isomorphic data model validations made easy.

[![npm version](https://badge.fury.io/js/passable.svg)](https://badge.fury.io/js/passable) [![Build Status](https://travis-ci.org/ealush/passable.svg?branch=master)](https://travis-ci.org/ealush/passable) [![bitHound Overall Score](https://www.bithound.io/github/ealush/passable/badges/score.svg)](https://www.bithound.io/github/ealush/passable)

[LIVE DEMO](https://ealush.github.io/passable/) (try it in your browser);
---


* [Installation](#installation)
* [What is Passable?](#what-is-passable)
* [Why Passable](#key-benefits)
    * [Structured Validations](#structured-validations)
    * [Isomorphic Validations](#isomorphic-validations)
* [How to use Passable](#how-to-use-passable)
    * [Writing Tests](#writing-tests)
    * [The Response Object](#the-response-object)
        * [Why no isValid](#note-no-isvalid-prop)
    * [Accepted Params](#passable-params)
        * [Running specific passes](#running-specific-pass)
        * [The Pass Function](#the-pass-function)
            * [How to fail a pass function](#all-ways-to-fail-a-pass)
            * [Warn Only Tests](#warn-only-pass)
    * [The Enforce Function](#the-enforce-function)
        * [Enforce Rules](#enforce-rules)
        * [Adding custom rules](#adding-more-custom-rules)
            * [Globally](#addind-custom-rules-globally)
            * [Per Form](#addind-custom-rules-for-a-single-tests-run)
    * [Using with other assertion libraries](#using-with-other-assertion-libraries)

# Installation
```npm install passable --save```

# What is Passable
Passable is a system for javascript applications that allows you to write structured data model validations in a way that's consistent all accross your app, and fully reusable.

Inspired by the world of unit tests, Passable validations are written like actual specs that need to be passed. The syntax is very similar, adapted to be more suitable for testing data model.

![alt tag](https://raw.githubusercontent.com/ealush/passable/gh-pages/passable_diagram.png)

## Key Benefits
### **Structured Validations**

The basic notion behind Passable is that you would want to structure your data model validation in your application, in a way that's consistent and easy to follow. It isn't much of a problem in a smaller scale application, but as the application gets larger, and more complex, it gets harder to keep track of the different flows of the application and the ways data model validations are performed in each one. Passable gives you a consistent structure to construct your data model validations, in a way that's both reusable and easy to read.

### **Isomorphic Validations**

The other, use of Passable, is server side validations. Since most of the times we perform validations, we send the data back to the server, we would like to perform the tests there as well. This causes a great deal of confusion and error. It is hard to keep the validations in the server and the client synced, so if we update a validation in the client side, or the server, it is easy to neglet and change it on the other side as well. Even if we do keep them up to date, it is easy, especially if the server and the client are written in different languages, to have a slightly different interpertation of the logic on each end, whic, eventually, causes inconsistencies and bugs.

Instead, with Passable, you could just as easily set up a data model validations server that would run the same exact validation code that runs in the browser. No duplication, no sync problems.

 [Here is an example server](https://github.com/ealush/passable-server) running Passable, both as  a file server, and as a validations server.

 # How to use Passable
 ## Writing tests
 Much like when writing unit-tests, writing validations with Passable is all about knowing in advance which values you expect to get. The structure is very similar to the familiar unit test `describe/it/expect` combo, only that with Passable the functions you will mostly run are `Passable/pass/enforce`.

 * `Passable` - the wrapper for your form validation, much like the describe function in unit tests.
 * `pass` - a single tests, most commonly a single field, much like the it function in unit tests.
 * `enforce` - the function which gets and enforces the data model compliance, similar to the expect function in unit tests.

The most basic test would looke somewhat like this:

```js
// data = {
//     username: 'ealush',
//     age: 27
// }
Passable('NewUserForm', (pass, enforce) => {
    pass('username', 'Must be a string between 2 and 10 chars', () => {
        enforce(data.username).allOf({
            isString: true,
            largerThan: 1,
            smallerThan: 11
        });
    });

    pass('age', 'Can either be empty, or larger than 18', () => {
        enforce(data.age).anyOf({
            isEmpty: true,
            largerThan: 18
        });
    })
});
```

In the example above, we tested a form named `NewUserForm`, and ran two tets on it. One of the `username` field, and one on the `age` field. When testing the username field, we made sure that **all** conditions are true, and when testing age, we made sure that **at least one** condition is true.

If our validation fails, among other information, we would get the names of the fields, and an array of errors for each, so we can show them back to the user.

### The response object:
In the response object you will find the following:
* name: `string` | the name of the form being validated
* hasValidationErrors: `boolean` | whether there are validation errors or not
* hasValidationWarnings: `boolean` | whether there are validation warnings or not
* failCount: `number` | overall errors count for this form
* warnCount: `number` | overall warning count for this form
* testCount: `number` | overall test count in this form
* testsPerformed: `object` | detailed stats per each field
    * [field-name]: `object` | per field data
        * testCount: `number` | test count for the field.
        * failCount: `number` | error count for the field.
        * warnCount: `number` | warning count for the field.
* validationErrors: `object` | actual errors per each field
    * [field-name]: `array` | all error strings for thes field
* validationWarnings: `object` | actual warnings per each field
    * [field-name]: `array` | all warning strings for thes field
* skipped | `array` | all skipped fields (empty, unless the `specific` option is used)

#### **Note** No `isValid` prop
There is **no** `isValid` prop, this is by design. Passable cannot know your business logic, nor can it ever assume that `0` errors means valid response. `0` errors can be due to skipped fields. Same goes for isInvalid. Even though, usually, errors mean invalidity, it is not always the case. This is why Passable gives you all the information about the tests, but it is your job to decide whether it means that the validation failed or not.

**A passing** response object would look somewhat like this:
```js
{
  "name": "NewUserForm",
  "hasValidationErrors": false,
  "hasValidationWarnings": false,
  "failCount": 0,
  "warnCount": 0,
  "testCount": 2,
  "testsPerformed": {
    "username": {
      "testCount": 1,
      "failCount": 0,
      "warnCount": 0
    },
    "age": {
      "testCount": 1,
      "failCount": 0,
      "warnCount": 0
    }
  },
  "validationErrors": {},
  "validationWarnings": {},
  "skipped": []
}
```

**A failing** response object would look somewhat like this
```js
{
  "name": "NewUserForm",
  "hasValidationErrors": true,
  "hasValidationWarnings": false,
  "failCount": 2,
  "warnCount": 0,
  "testCount": 2,
  "testsPerformed": {
    "username": {
      "testCount": 1,
      "failCount": 1,
      "warnCount": 0
    },
    "age": {
      "testCount": 1,
      "failCount": 1,
      "warnCount": 0
    }
  },
  "validationErrors": {
    "username": [
      "Must be a string between 2 and 10 chars"
    ],
    "age": [
      "Can either be empty, or larger than 18"
    ]
  },
  "validationWarnings": {},
  "skipped": []
}
```

## Passable params

| Name       | Optional? | type     | Description                                                               |
|------------|:---------:|:--------:|---------------------------------------------------------------------------|
| `name`     | No        | String   | A name for the group of tests. E.G - form name                            |
| `specific` | Yes       | Array    | Whitelist of tests to run. Can be completely ommitted                     |
| `passes`   | No        | Function | A function containing the actual validation logic.                        |
| `custom`   | Yes       | Object   | Custom rules to extend the basic ruleset with. Can be completely ommitted |

![alt tag](https://raw.githubusercontent.com/ealush/passable/gh-pages/passable-api.jpg)

### Running `specific` pass
Sometimes you want to test only a specific field out of the whole form. For example, when validating upon user interaction, such as input change, you probably do not want to validate all other fields as well. Same goes for only validating dirty/touched fields.
With the `specific` param, it is as easy as passing the names of the fields you wish to test. All other fields will be skipped and not tested.

The specific param is optional, and it accepts an array of fields to include - must be the same as the names specified in their `pass` function. The way easiest to use it, is to wrap your validation with a function that passes down the fields to include, only if needed.

In the following example, only First pass is going to run. Second will be skipped.
```js
const result = SpecificTests(['First']);

function SpecificTests (specific) {
    return Passable('SpecificTests', specific, (pass, enforce) => {
        pass('First',  'should pass', () => {...});
        pass('Second', 'should be skipped', () => {...});
    });
};
```

## The `pass` function
The pass function is a single test in your validations. It is similar to unit tests `it` function. `pass` accepts the name of the test, the error message and the actual test function. If you explicitly return true, or if your enforce function passed correctly, it is assumed that the pass is true.

You can have multipe `pass` functions for each field, each with a different error.

```js
Passable('MyForm', (pass, enforce) => {
    pass('name',  'should be ...', () => {...});
    pass('name',  'should be ...', () => {...});
    pass('age', 'should be ...', () => {...});
});
```

### All ways to fail a `pass`
There are three ways of failing a pass, and marking it as having a validation error:
* Having an `enforce` function which ends up failing.
    ```js
        pass('field', 'should fail by enforce', () => {
            enforce(1).allOf({ largerThan: 5 });
        });
    ```
* explicitly returning false from the `pass` itself (running some logic that returns false).
    ```js
        pass('filed', 'should explicitly fail by false', () => false);
        pass('filed', 'should explicitly fail by false', () => { return 1 !== 1; });
    ```
* Throwing an Error from within the `pass`. Thrown errors within the `pass` function are caught and handled to mark the pass as failing.
    ```js
        pass('filed', 'should fail by a thrown error', () => { throw new Error(); });
    ```

### Warn only `pass`
By default, a failing `pass` will set `hasValidationErrors` to `true`. Sometimes you would want to set a warn-only validation test (password strength, for example). In this case, you would add the 'warn' flag to your pass function.
This will leave `hasValidationErrors` unchanged (other tests may have set it to `true`), and update `hasValidationWarnings` to `true`. It will also bump up `warnCount`.

If no flag is added, your pass function will default to `fail`.

```
Passable('WarnAndPass', (pass, enforce) => {
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

## The `enforce` function
The `enforce` function runs your data against different rules and condition. It is basically, the default assertion method for Passable tests. Its intended use is for validations logic that gets repeated over and over again and shouldn't be written manually. For each rule, you may also pass either value or an options object that may be used by the function of the rule.

The enforce function exposes the following functions:

* `allOf`  | `AND` | makes sure all rules specified are true.
* `anyOf`  | `OR`  | makes sure at least one rule is true.
* `noneOf` | `NOT` | makes sure no rule is true.

All of these functions are chainable. All functions other can be used more than once. All enforce chain-blocks are in an AND relationship, which means that if one block is false the others won't get evaluated.
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
    }); // true

    -------------

    enforce('North Dakota, por favor').noneOf({
        largerThan: 5,
        smallerThan: 2,
        matches: /[0-9]/
    }); // false

    -------------

    enforce('I consider it asshole tax').anyOf({
        largerThan: 5,
        smallerThan: 2
    }).anyOf({
        smallerThan: 150
    }); // true
```

When using enforce, you do not have to return the result (although you may), each of your enforce tests updates the result of the whole pass. You may also use multiple enforces in the same pass function, they will run in sequence.

```js
Passable('enforcement', (pass, enforce) => {
    pass('test', 'multiple enforces', () => {
        enforce('str1').allOf({...}).anyOf({...});
        enforce('str2').noneOf({...});
        enforce('str3').anyOf({...});
    });
});
```

### Enforce rules

Passable comes with the following rules (click for detailed info)
* [isArray](./src/enforce/rules/lang/is_array#rule---isarray) Determines whether a given value is an array or not.
* [isString](./src/enforce/rules/lang/is_string#rule---isstring) Determines whether a given value is a string or not.
* [isNumber](./src/enforce/rules/lang/is_number#rule---isnumber) Determines whether a given value is a number or not.
* [isEmpty](./src/enforce/rules/size/is_empty#rule---isempty) Returns true if a given value is empty.
* [matches](./src/enforce/rules/content/matches#rule---matches) Tests value against RegExp.
* [inside](./src/enforce/rules/content/inside#rule---inside) Checks if a value is contained inside another value.
* [largerThan](./src/enforce/rules/size/larger_than#rule---largerthan) Compares numbers, array/string lengths and object sizes.
* [sizeEquals](./src/enforce/rules/size/size_equals#rule---sizeequals) Compares numbers, array/string lengths and object sizes.
* [smallerThan](./src/enforce/rules/size/smaller_than#rule---smallerthan) Compares numbers, array/string lengths and object sizes.

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

### Addind custom rules globally
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

### Addind custom rules for a single tests run
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
    Passable('GroupName', (pass, enforce) => {
        pass('TestName', 'Must have a valid email', () => {
            enforce(user.email).allOf({
                isValidEmail: null
            });
        });
    }, myCustomRules);
```

## Using with other assertion libraries
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

