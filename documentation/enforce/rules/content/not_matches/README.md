# Content | notMatches

## Description
Checks if a value does not contain a regex match.
Reverse implementation of [`matches` (see documentation)](../matches/README.md).

## usage examples:

```js
enforce(1984).notMatches(/[0-9]/);
// false
```

```js
enforce('ninety eighty four').notMatches('[0-9]');
// true
```