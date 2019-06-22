# Content | Inside

## Description
Checks if your `enforce` value is contained in another array or string.
Your `enforce` value can be of the following types:
* `string`
* `number`
* `boolean`

## Arguments
* `container`: a `string` or an `array` which may contain the value specified.

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