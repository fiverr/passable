# matches

## Description
Checks if a value contains a regex match.

## Arguments
* `value`: the value which you would like to test against the rexep
* `regexp`: either a `RegExp` object, or a RegExp valid string

## Response
The matches rule returns a boolean. `true` for matched values, and `false` for non matching values.

## usage examples:

```js
enforce(1984).allOf({
    matches: /[0-9]/
});
// true
```

```js
enforce(1984).allOf({
    matches: '[0-9]'
});
// true
```

```js
enforce('1984').allOf({
    matches: /[0-9]/
});
// true
```

```js
enforce('1984').allOf({
    matches: '[0-9]'
});
// true
```

```js
enforce('198four').allOf({
    matches: /[0-9]/
});
// true
```

```js
enforce('198four').allOf({
    matches: '[0-9]'
});
// true
```

```js
enforce('ninety eighty four').allOf({
    matches: /[0-9]/
});
// false
```

```js
enforce('ninety eighty four').allOf({
    matches: '[0-9]'
});
// false
```