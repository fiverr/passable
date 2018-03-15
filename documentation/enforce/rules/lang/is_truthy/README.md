# Lang | isTruthy

## Description
Checks if a value is of type is any other then undefined, null, false, 0, NaN or an empty string "".

## Arguments
* `value`: the value which you would like to check

## Response
Checks if a value is truthy; Meaning: if it can be coerced into boolean true.
Anything not in the following list will return true:

* undefined
* null
* false
* 0
* NaN
* empty string ("")

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
