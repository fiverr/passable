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
enforce([]).isEmpty(true);
// true
```

```js
enforce('').isEmpty(true);
// true
```

```js
enforce({}).isEmpty(true);
// true
```

```js
enforce(0).isEmpty(true);
// true
```

```js
enforce(NaN).isEmpty(true);
// true
```

```js
enforce(undefined).isEmpty(true);
// true
```

```js
enforce(null).isEmpty(true);
// true
```

```js
enforce(false).isEmpty(true);
// true
```

```js
enforce([1]).isEmpty(true);
// false
```

```js
enforce('1').isEmpty(true);
// false
```

```js
enforce({1:1}).isEmpty(true);
// false
```

```js
enforce(1).isEmpty(true);
// false
```

```js
enforce(true).isEmpty(true);
// false
```

```js
enforce([]).isEmpty(false);
// false
```

```js
enforce('').isEmpty(false);
// false
```

```js
enforce({}).isEmpty(false);
// false
```

```js
enforce(0).isEmpty(false);
// false
```

```js
enforce(NaN).isEmpty(false);
// false
```

```js
enforce(undefined).isEmpty(false);
// false
```

```js
enforce(null).isEmpty(false);
// false
```

```js
enforce(false).isEmpty(false);
// false
```