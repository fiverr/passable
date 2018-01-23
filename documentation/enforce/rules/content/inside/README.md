# Content | Inside

## Description
Checks if a given value is contained in another array or string.

## Arguments
* `value`: the value which you would like to find in the container. Can be any of the following types:
    `string`, `number`, `array`, `boolean`
* `container`: a `string` or an `array` which may contain the value specified.

## Response
The inside rule returns a boolean. `true` for matched values, and `false` for non matching values.

## usage examples:

### inside: array
Checks for membership in an array.

string: checks if a string is an element in an array

```js
enforce('hello').inside(['hello', 'world']);
//true
```

```js
enforce('hello!').inside(['hello', 'world']);
//false
```
number: checks if a number is an element in an array

```js
enforce(1).inside([1, 2]);
//true
```

```js
enforce(3).inside([1, 2]);
//false
```

boolean: checks if a number is an element in an array

```js
enforce(false).inside([true, false]);
//true
```

```js
enforce(true).inside([1,2,3]);
//false
```

array: checks if all members of an array are members of another array

```js
enforce(['a', 'b', 'c']).inside(['a', 'b', 'c', 'd', 'e']);
//true
```

```js
enforce(['a', 'b', 'c', 'd', 'e']).inside(['a', 'b', 'c']);
//false
```

### inside: string
string: checks if a string is inside another string

```js
enforce('da').inside('tru dat.');
//true
```

```js
enforce('ad').inside('tru dat.');
//false
```