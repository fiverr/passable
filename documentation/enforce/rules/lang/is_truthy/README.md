# Lang | isTruthy

## Description
Checks if a value is truthy; Meaning: if it can be coerced into boolean `true`.
Anything not in the following list is considered to be truthy.

* `undefined`
* `null`
* `false`
* `0`
* `NaN`
* empty string (`""`)

## Arguments
| Name   | Type      | Required? | Description
|--------|-----------|-----------|------------
| expect | `Boolean` | No        | when passed `false`, the negative result will be tested

## usage examples:

```js
enforce(true).isTruthy();
// true
```

```js
enforce(1).isTruthy();
// true
```

```js
enforce(null).isTruthy();
// false
```

```js
enforce(undefined).isTruthy();
// false
```

```js
enforce(0).isTruthy();
// false
```

```js
enforce(true).isTruthy(false); // false

enforce(false).allOf({
    isTruthy: false
}); // true
```
