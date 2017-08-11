# Lang | isNumber

## Description
Checks if a value is of type `number`

## Arguments
* `value`: the value which you would like to check
* `expect`: a `boolean`. Whether you expect the result to be `true` or `false`

## Response
The isNumber rule returns a boolean. `true` for matched values, and `false` for non matching values.

## usage examples:

```js
enforce(143).allOf({
    isNumber: true
});
// true
```

```js
enforce(NaN).allOf({
    isNumber: true
});
// true
```

```js
enforce('143').allOf({
    isNumber: false
});
// true
```

```js
enforce(143).allOf({
    isNumber: false
});
// false
```

