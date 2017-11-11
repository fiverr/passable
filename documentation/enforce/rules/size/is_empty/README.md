# Size | isEmpty

## Description
Returns true if a given value is empty, false, or zero.

## Arguments
* `value`: the value which you would like to test. can be:
     * object: will return `true` if no keys
     * array: will return `true` if length equals zero
     * boolean: will return `true` for `false`
     * undefined: will return `true`
     * null: will return `true`
     * number: will return `true` for `NaN` of `0`
     * string: will return `true` for an empty string
* `expect`: a `boolean`. Whether you expect the result to be `true` or `false`

## Response
The isEmpty rule returns a boolean. `true` for matched values, and `false` for non matching values.

## usage examples:

```js
enforce([]).allOf({
    isEmpty: true
});
// true
```

```js
enforce('').allOf({
    isEmpty: true
});
// true
```

```js
enforce({}).allOf({
    isEmpty: true
});
// true
```

```js
enforce(0).allOf({
    isEmpty: true
});
// true
```

```js
enforce(NaN).allOf({
    isEmpty: true
});
// true
```

```js
enforce(undefined).allOf({
    isEmpty: true
});
// true
```

```js
enforce(null).allOf({
    isEmpty: true
});
// true
```

```js
enforce(false).allOf({
    isEmpty: true
});
// true
```

```js
enforce([1]).allOf({
    isEmpty: true
});
// false
```

```js
enforce('1').allOf({
    isEmpty: true
});
// false
```

```js
enforce({1:1}).allOf({
    isEmpty: true
});
// false
```

```js
enforce(1).allOf({
    isEmpty: true
});
// false
```

```js
enforce(true).allOf({
    isEmpty: true
});
// false
```

```js
enforce([]).allOf({
    isEmpty: false
});
// false
```

```js
enforce('').allOf({
    isEmpty: false
});
// false
```

```js
enforce({}).allOf({
    isEmpty: false
});
// false
```

```js
enforce(0).allOf({
    isEmpty: false
});
// false
```

```js
enforce(NaN).allOf({
    isEmpty: false
});
// false
```

```js
enforce(undefined).allOf({
    isEmpty: false
});
// false
```

```js
enforce(null).allOf({
    isEmpty: false
});
// false
```

```js
enforce(false).allOf({
    isEmpty: false
});
// false
```