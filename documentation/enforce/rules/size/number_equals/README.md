# Size | numberEquals

> Since 7.0.0

## Description
Checks that your numeric `enforce` value is equals another value.

## Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

## Usage

### Passing examples:

```js
enforce(0).numberEquals(0);
enforce(2).numberEquals('2');
```


### Failing examples:

```js
enforce(100).numberEquals(10);
enforce('110').numberEquals(100);
enforce([0]).numberEquals(1);
```