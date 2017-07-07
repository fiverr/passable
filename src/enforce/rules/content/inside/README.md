# [RULE] - Inside

## Description
Checks if a given value is within another.

## Arguments
* `value`: the value which you would like to find in the container. Can be any of the following types:
    `string`, `number`, `array`, `object`, `boolean`
* `container`: a `string`, `object` or an `array` which may contain the value specified.

## Response
The inside rule returns a boolean. `true` for matched values, and `false` for non matching values.

## usage examples:

### inside: array
Checks for membership in an array.

srting: checks if a string is an element in an array

```js
enforce('hello').allOf({
    inside: ['hello', 'world']
});
//true
```

```js
enforce('hello!').allOf({
    inside: ['hello', 'world']
});
//false
```
number: checks if a number is an element in an array

```js
enforce(1).allOf({
    inside: [1, 2]
});
//true
```

```js
enforce(3).allOf({
    inside: [1, 2]
});
//false
```

boolean: checks if a number is an element in an array

```js
enforce(false).allOf({
    inside: [true, false]
});
//true
```

```js
enforce(true).allOf({
    inside: [1,2,3]
});
//false
```

array: checks if all members of an array are members of another array

```js
enforce(['a', 'b', 'c']).allOf({
    inside: ['a', 'b', 'c', 'd', 'e']
});
//true
```

```js
enforce(['a', 'b', 'c', 'd', 'e']).allOf({
    inside: ['a', 'b', 'c']
});
//false
```

object: checks if all **keys** of an object are members of an array

```js
enforce({a: 1, b: 5, d: 6}).allOf({
    inside: ['a', 'b', 'c', 'd', 'e']
});
//true
```

```js
enforce({a: 1, b: 5, d: 6}).allOf({
    inside: ['e', 'f', 'g']
});
//false
```

### inside: object
Looks for presence of keys in an object. Does not evaluate value. If the keys has the matched property, it will be true, even if the value is false.

srting: checks if a string is a key in an object

```js
enforce('hello').allOf({
    inside: { hello: 'world!' }
});
//true
```

```js
enforce('hello!').allOf({
    inside: { hello: 'world!' }
});
//false
```

number: checks if a number is a key in an object

```js
enforce(1).allOf({
    inside: {1: 0}
});
//true
```

```js
enforce(1).allOf({
    inside: {2: 0}
});
//false
```

array: checks if all members of an array are **keys** in an object
```js
enforce(['a', 'b', 'c']).allOf({
    inside: {a: 5, b: null, c: 1}
});
//true
```

```js
enforce(['a', 'b', 'c']).allOf({
    inside: {d: 5}
});
//false
```

object: checks if all **keys** of an object are **keys** in another object (even if the values don't match!)

```js
enforce({a: 1, b: 5, d: 6}).allOf({
    inside: {a: 9, b: 4, d: 7, c: 4}
});
//true
```

```js
enforce({a: 1, b: 5, d: 6}).allOf({
    inside: {k:9}
});
//false
```

### inside: string
string: checks if a string is inside another string

```js
enforce('da').allOf({
    inside: 'tru dat.'
});
//true
```

```js
enforce('ad').allOf({
    inside: 'tru dat.'
});
//false
```