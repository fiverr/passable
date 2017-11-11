# Enforce conditions relationships
When running validations against your data, there are different relationships between your rules that you need to consider. The enforce function exposes three different functions that represent possible relationships.

* `allOf`  | `AND` | makes sure all rules specified are true.
* `anyOf`  | `OR`  | makes sure at least one rule is true.
* `noneOf` | `NOT` | makes sure no rule is true.

## allOf  |  AND Relationship
You should use `allOf` when you need all your rules to be true in order for the validation to pass. For example, if any of the following is NOT TRUE, the validation should fail:

* The field must be a string
* `AND` The String must be longer than 5 characters
* `AND` The String must be shorter than 10 characters

Can be represented like this:

```js
// myString = 'hey there delilah what\'s it like in new york city';

enforce(myString).allOf({
    isString: true,
    largerThanOrEquals: 5,
    smallerThanOrEquals: 10
});
```

## anyOf  |  OR Relationship
You should use `anyOf` when you need at least one of your rules to be true in order for the validation to pass. Only if all the following are false, the validation will fail:

* The field can be left empty
* `Or`, it can contain a number

Can be represented like this:

```js

enforce(data).anyOf({
    isEmpty: true,
    isNumber: true
});
```

## noneOf  |  AND NOT Relationship
You should use `noneOf` when you need all of your fields to be false in order for the validation to pass. If any of the following is true, the validation will fail:

* The field cannot be left empty
* `AND NOT` be longer than 20 chars

Can be represented like this:

```js

enforce(data).noneOf({
    isEmpty: true,
    largerThan: 20
});
```

## Chaining enforce functions

All of these functions are chainable. All functions other can be used more than once.
When chained, all blocks share an AND relationship, meaning that if one block fails, the whole test fails as well.

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