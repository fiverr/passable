# Assertions with `enforce`
`enforce`  is Passable's assertion library. It allows you to run your data against [rules and conditions](./rules/README.md) and test whether it passes your validations. It is intended for validation logic that gets repeated over and over again and should not be written manually. It comes with a wide-variety of pre-built rules, but it can also be extended to support your own repeated custom logic.

The way `enforce` operates is similar to most common assertion libraries - if the validation fails, it throws an Error, and if the validation succeeds, it returns the current instance of `enforce` to allow chaining more rules.

## Consuming `enforce`
You can consume `enforce` in two ways:

### Require `enforce` directly from Passable:
> Since 5.10.0

```js
// es6
import passable, { enforce } from 'passable'

// es5
const passable = require('passable');
const enforce = passable.enforce;

passable('enforcement', (test) => {
    test('test', 'enforce example', () => {
        enforce(4).isNumber();
    });
});
```

### Create a new `enforce`  instance with custom functions
> Since 6.0.0

This is a slightly more advanced use case for `enforce` , use it if you have repeated custom logic (for example `isValidOrgEmail`).

You will have to import the `Enforce`  constructor, and instantiate it with your custom rules object. A new instance of `enforce` will be created, containing both the predefined rules and your custom rules.

```js
// es6
import passable, { Enforce } from 'passable';

// es5
const passable = require('passable');
const Enforce = passable.Enforce;

// ---
const myCustomRules = {
    isValidOrgEmail: (email) => // logic here
};

const enforce = new Enforce(myCustomRules);

// email = abc@xyz.com

passable('enforcement', (test) => {
    test('test', 'enforce example', () => {
        enforce(email).isValidOrgEmail();
    });
});

```

More on [custom enforce rules](./rules/custom.md).

## Chaining enforce functions

All of these functions are chainable and can be used more than once in the same chain.
When chained, all blocks share an `AND` relationship, meaning that if one block fails, the whole test fails as well.

All the following are valid uses of enforce.

```js
enforce([1,2,3,4,5,6]).anyOf({
    largerThan: 5, // in anyOf - this one is enough to set the anyOf block to true
    smallerThan: 6,
}).noneOf({
    isString: true, // in noneOf, all must be false
    isNumber: true
}).isArray(); // true
```

```js
enforce('North Dakota, por favor').noneOf({
    largerThan: 5,
    smallerThan: 2,
    matches: /[0-9]/
}); // false
```

```js
enforce('Toto, I\'ve a feeling we\'re not in Kansas anymore').anyOf({
    largerThan: 5,
    smallerThan: 2
}).smallerThan(150); // true
```

```js
enforce('Toto, I\'ve a feeling we\'re not in Kansas anymore').anyOf({
    largerThan: 5,
    smallerThan: 2
}).smallerThan(150);
```

Enforce exposes all [predefined](./rules/README.md) and [custom](./rules/custom.md) rules, and the [compound enforcement methods](./compound/README.md). You may use chaining to make multiple enfocements for the same value.

### Table of Contents
* [Enforce Rules](./rules/README.md)
* [Custom Enforce Rules](./rules/custom.md)
