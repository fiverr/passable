# Compound enforce statements
When running validations against your data, you may want to bundle multiple tests in the same statement - for example, when they interact with each other.

`enforce` provides three grouping methods that allow you to bundle one or more statements. You may use them as is, or in conjunction with regular [rule-based validation](../rules/README.md) via [enforcement chaining](../README.md#chaining-enforce-functions).

You can use all rules (both custom and predefined) as members of a compound enforcement.

| Statement | Relationship | Description |
|-----------|--------------|-------------|
| `allOf`  | `AND` | makes sure all rules specified are true. |
| `anyOf`  | `OR`  | makes sure at least one rule is true. |
| `noneOf` | `NOT` | makes sure no rule is true. |

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