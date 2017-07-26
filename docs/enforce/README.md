# The `enforce` function
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