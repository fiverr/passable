# [RULE] - isArray

## Description
Checks if a value is of type `Array`

## Arguments
* `value`: the value which you would like to check
* `expect`: a `boolean`. Whether you expect the result to be `true` or `false`

## Response
The isArray rule returns a boolean. `true` for matched values, and `false` for non matching values.

## usage examples:

```js
enforce(['hello']).allOf({
    isArray: true
});
// true
```

```js
enforce('hello').allOf({
    isArray: true
});
// false
```

```js
enforce(['hello']).allOf({
    isArray: false
});
// false
```

```js
enforce('hello').allOf({
    isArray: false
});
// true
```
