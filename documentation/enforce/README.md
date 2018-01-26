# The `enforce` function
The `enforce` function runs your data against different rules and conditions. It is basically, the default assertion method for Passable tests. Its intended use is for validations logic that gets repeated over and over again and shouldn't be written manually. For each rule, you may also pass either value or an options object that may be used by the function of the rule.

When using enforce, you do not have to return the result (although you may), each of your enforce tests updates the result of the whole pass. You may also use multiple enforces in the same pass function, they will run in sequence.

## Consuming `enforce`
You can consume the `enforce` function in two ways:

* Manually importing `enforce` along with `passable`
> Since 5.10.0

```js
import passable, {enforce} from 'passable';

Passable('enforcement', (pass) => {
    pass('test', 'enforce example', () => {
        enforce(4).isNumber();
    });
});
```
Direct import is the newer standard, and is intended to support future functionality of leaner validation syntax.

* `enforce` is the second argument of the passable function
```js
Passable('enforcement', (pass, enforce) => {
    pass('test', 'enforce example', () => {
        enforce(4).isNumber();
    });
});
```

```js
Passable('enforcement', (pass, enforce) => {
    pass('test', 'multiple enforces', () => {
        enforce('str1').allOf({...}).anyOf({...});
        enforce('str2').noneOf({...});
        enforce('str3').anyOf({...});
        enforce(4).isNumber();
    });
});
```

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

    -------------

    enforce('North Dakota, por favor').noneOf({
        largerThan: 5,
        smallerThan: 2,
        matches: /[0-9]/
    }); // false

    -------------

    enforce('Toto, I\'ve a feeling we\'re not in Kansas anymore').anyOf({
        largerThan: 5,
        smallerThan: 2
    }).anyOf({
        smallerThan: 150
    }); // true

    enforce('Toto, I\'ve a feeling we\'re not in Kansas anymore').anyOf({
        largerThan: 5,
        smallerThan: 2
    }).smallerThan(150);
```

Enforce exposes all [predefined](./rules/README.md) and [custom](./rules/custom.md) rules, and the [compound enforcement methods](./compound/README.md). You may use chaining to make multiple enfocements for the same value.