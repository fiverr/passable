# Lang | isTruthy

## Description
Checks if a value is of type is any other then undefined, null, false, 0, NaN or an empty string "".

## Arguments
* `value`: the value which you would like to check

## Response
The isTruthy rule returns a boolean. `true` for matched values, and `false` for non matching values.

## usage examples:


```js
enforce(true).isTruthy(true);
// true
```

```js
enforce(1).isTruthy(true);
// true
```

```js
enforce(null).isTruthy(true);
// false
```

```js
enforce(undefined).isTruthy(true);
// false
```

```js
enforce(0).isTruthy(true);
// false
```
