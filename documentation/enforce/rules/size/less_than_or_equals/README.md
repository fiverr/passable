# Size | lessThanOrEquals

> Since 7.0.0

- alias: `lte()`

## Description
Checks that your numeric `enforce` value is smaller than or equals to a given numeric value.

## Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

## Usage

### Passing examples:
```js
enforce(0).lessThanOrEquals(1);
enforce(2).lessThanOrEquals('10');
enforce('90').lte(100);
enforce(100).lte('100');
```


### Failing examples:

```js
enforce(100).lessThanOrEquals(90);
enforce('110').lessThanOrEquals(100);
enforce([0]).lte(1);
```