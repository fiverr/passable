# Lang | isString

## Description
Checks if a value is of type `String`

## Arguments
* `value`: the value which you would like to check
* `expect`: a `boolean`. Whether you expect the result to be `true` or `false`

## Response
The isString rule returns a boolean. `true` for matched values, and `false` for non matching values.

## usage examples:

```js
enforce('hello').allOf({
    isString: true
});
// true
```

```js
enforce(['hello']).allOf({
    isString: true
});
// false
```

```js
enforce(1984).allOf({
    isString: true
});
// false
```

```js
enforce('hello').allOf({
    isString: false
});
// false
```

```js
enforce(['hello']).allOf({
    isString: false
});
// true
```

```js
enforce(1984).allOf({
    isString: false
});
// true
```