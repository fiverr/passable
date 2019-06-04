# Size | numberNotEquals

> Since 7.0.0

## Description
Checks that your numeric `enforce` value does not equal another value.
Reverse implementation of [`numberEquals` (see documentation)](../number_equals/README.md).

## Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

## Usage

### Passing examples:

```js
enforce(2).numberNotEquals(0);
enforce('11').numberNotEquals('10');
```


### Failing examples:

```js
enforce(100).numberNotEquals(100);
enforce('110').numberNotEquals(100);
```