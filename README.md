# ![Passable](https://cdn.rawgit.com/fiverr/passable/master/documentation/assets/img/logo.png?raw=true "Passable")

Declarative data validations.

[![npm version](https://badge.fury.io/js/passable.svg)](https://badge.fury.io/js/passable) [![Build Status](https://travis-ci.org/fiverr/passable.svg?branch=master)](https://travis-ci.org/fiverr/passable)


[Documentation homepage](https://fiverr.github.io/passable/)

[Try it live](https://stackblitz.com/edit/passable-example?file=validate.js)

## What is Passable?
Passable is a library for JS applications for writing validations in a way that's structured and declarative.

Inspired by the syntax of modern unit testing framework, passable validations are written as a spec or a contract, that reflects your form structure.
Your validations run in production code, and you can use them in any framework (or without any framework at all).

The idea behind passable is that you can easily adopt its very familiar syntax, and transfer your knowledge from the world of testing to your form validations.

Much like most testing frameworks, Passable comes with its own assertion function, [enforce](https://fiverr.github.io/passable/enforce/index.html), all error based assertion libraries are supported.

## Key features
1. [Non failing tests](https://fiverr.github.io/passable/test/warn_only_tests.html).
2. [Conditionally running tests](https://fiverr.github.io/passable/test/specific.html).
3. [Async validations](https://fiverr.github.io/passable/test/async.html).
4. [Test callbacks](https://fiverr.github.io/passable/getting_started/callbacks.html).

---

## Difference from testing frameworks

Since Passable is running in production environment, and accommodates different needs, some changes to the basic unit test syntax have been made, to cover the main ones quickly:

- Your test function is not available globally, it is an argument passed to your suite's callback.
- Each test has two string values before its callback, one for the field name, and one for the error returned to the user.
- Your suite accepts another argument after the callback - name (or array of names) of a field. This is so you can run tests selectively only for changed fields.

```js
// validation.js
import passable, { enforce } from 'passable';

const validation = (data) => passable('NewUserForm', (test) => {

    test('username', 'Must be at least 3 chars', () => {
        enforce(data.username).longerThanOrEquals(3);
    });

    test('email', 'Is not a valid email address', () => {
        enforce(data.email)
            .isNotEmpty()
            .matches(/[^@]+@[^\.]+\..+/g);
    });
});

export default validation;
```

```js
// myFeature.js
import validation from './validation.js';

const res = validation({
    username: 'example',
    email: 'email@example.com'
});

res.hasErrors() // returns whether the form has errors
res.hasErrors('username') // returns whether the 'username' field has errors
res.getErrors() // returns an object with an array of errors per field
res.getErrors('username') // returns an array of errors for the `username` field
```

[Getting started](https://fiverr.github.io/passable/getting_started/writing_tests.html).
