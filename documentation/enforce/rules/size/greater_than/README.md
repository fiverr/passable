# Size | greaterThan

## Description
Checks that your numeric `enforce` value is larger than a given numeric value.

## Arguments
* `value`: `number | string` | A numeric value against which you want to check your enforced value.

Strings are parsed using `Number()`, values which are non fully numeric always return false;

## Usage

### Passing examples:
```js
enforce(1).greaterThan(0);
enforce('10').greaterThan(0);
enforce(900).greaterThan('100');
```


### Failing examples:

```js
enforce(100).greaterThan(100);
enforce('100').greaterThan(110);
enforce([100]).greaterThan(1);
```