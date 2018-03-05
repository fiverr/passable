# Content | isNumeric

## Description
Checks if a value is a representation of a real number

## Arguments
* `value`: the value which you would like to check
* `expect`: a `boolean`. Whether you expect the result to be `true` or `false`

## Response
The isNumeric rule returns a boolean. `true` for matched values, and `false` for non matching values.

## usage examples:

```js
enforce(143).isNumeric(true);
// true
```

```js
enforce(NaN).isNumeric(false);
// true
```

```js
enforce('143').isNumeric(true);
// true
```

```js
enforce(143).isNumeric(false);
// false
```

