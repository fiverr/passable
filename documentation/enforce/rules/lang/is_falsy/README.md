# Lang | isFalsy

## Description
Checks if a value is falsy; Meaning: if it can be coerced into boolean false.
The following list will return true:

* undefined
* null
* false
* 0
* NaN
* empty string ("")

Reverse implementation of [`isTruthy` (see documentation)](../is_truthy/README.md).


## usage examples:

```js
enforce(1).isFalsy();
// false
```

```js
enforce(true).isFalsy();
// false
```

```js
enforce('hi').isFalsy();
// false
```

```js
enforce(false).isFalsy();
// true
```

```js
enforce(0).isFalsy();
// true
```

```js
enforce(undefined).isFalsy();
// true
```