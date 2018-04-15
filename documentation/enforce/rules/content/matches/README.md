# Content | matches

## Description
Checks if a value contains a regex match.

## Arguments
* `regexp`: either a `RegExp` object, or a RegExp valid string

## usage examples:

```js
enforce(1984).matches(/[0-9]/);
// true
```

```js
enforce(1984).matches('[0-9]');
// true
```

```js
enforce('1984').matches(/[0-9]/);
// true
```

```js
enforce('1984').matches('[0-9]');
// true
```

```js
enforce('198four').matches(/[0-9]/);
// true
```

```js
enforce('198four').matches('[0-9]');
// true
```

```js
enforce('ninety eighty four').matches(/[0-9]/);
// false
```

```js
enforce('ninety eighty four').matches('[0-9]');
// false
```