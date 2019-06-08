# The result object

## Properties
| Name                             | Type       | Description                                         |
|----------------------------------|------------|-----------------------------------------------------|
| `name`                           | `String`   | The name of the form being validated
| `failCount`                      | `Number`   | Overall errors count for this form
| `warnCount`                      | `Number`   | Overall warnings count for this form
| `testCount`                      | `Number`   | Overall test count in this form
| `testsPerformed`                 | `Object{}` | Detailed stats per field (structure detailed below)
| `errors`                         | `Object[]` | Actual errors per each field
| `errors[field-name]`             | `Object[]` | All error strings for this field
| `warnings`                       | `Object[]` | Actual errors per each field
| `warnings[field-name]`           | `Object[]` | All warning strings for this field
| `skipped`                        | `Array`    | All skipped fields (empty, unless the `specific` option is used)
| `getErrors`                      | `Function` | Getter function which allows accessing the errors array of one or all fields
| `getWarnings`                    | `Function` | Getter function which allows accessing the warnings array of one or all fields
| `hasErrors`                      | `Function` | Returns whether a certain field (or the whole suite, if no field passed) has errors
| `hasWarnings`                    | `Function` | Returns whether a certain field (or the whole suite, if no field passed) has warnings

### `testsPerformed` field structure
| Name        | Type     | Description                           |
|-------------|----------|---------------------------------------|
| `failCount` | `Number` | Overall errors count for this field   |
| `warnCount` | `Number` | Overall warnings count for this field |
| `testCount` | `Number` | Overall test count in this field      |

## `hasErrors` and `hasWarnings` functions
> since 6.3.0

If you only need to know if a certain field has validation errors or warnings but don't really care which they are, you can use `hasErrors` or `hasWarnings` functions.

```js
resultObject.hasErrors('username');
// true

resultObject.hasWarnings('password');
// false
```

In case you want to know whether the whole suite has errors or warnings, you can use the same functions, just without specifying a field

```js
resultObject.hasErrors();
// true

resultObject.hasWarnings();
// true
```

## `getErrors` and `getWarnings` functions
> since 5.10.0

You can easily traverse the object tree to acess the field errors and warnings, but when accessing many fields, it can get pretty messy:

```js
resultObject.errors.myField && resultObject.errors.myField[0];
```
This is clearly not ideal. There is a shortcut to getting to a specific field:

```js
resultObject.getErrors('username');
// ['Error string 1', `Error string 2`]

resultObject.getWarnings('password');
// ['Warning string 1', `Warning string 2`]
```

If there are no errors for the field, the function returns an empty array:
```js
resultObject.getErrors('username');
// []

resultObject.getWarnings('username');
// []
```

## Why isn't there an `isValid` prop?
There is **no** `isValid` prop, this is by design. Passable cannot know your business logic, nor can it ever assume that `0` errors means valid result. `0` errors can be due to skipped fields. Same goes for isInvalid. Even though, usually, errors mean invalidity, it is not always the case. This is why Passable gives you all the information about the tests, but it is your job to decide whether it means that the validation failed or not.

## Passing Example
```js
{
  "name": "NewUserForm",
  "failCount": 0,
  "warnCount": 0,
  "testCount": 2,
  "testsPerformed": {
    "username": {
      "testCount": 1,
      "failCount": 0,
      "warnCount": 0
    },
    "age": {
      "testCount": 1,
      "failCount": 0,
      "warnCount": 0
    }
  },
  "errors": {},
  "warnings": {},
  "skipped": []
}
```

## Failing Example
```js
{
  "name": "NewUserForm",
  "failCount": 2,
  "warnCount": 0,
  "testCount": 2,
  "testsPerformed": {
    "username": {
      "testCount": 1,
      "failCount": 1,
      "warnCount": 0
    },
    "age": {
      "testCount": 1,
      "failCount": 1,
      "warnCount": 0
    }
  },
  "errors": {
    "username": [
      "Must be a string between 2 and 10 chars"
    ],
    "age": [
      "Can either be empty, or larger than 18"
    ]
  },
  "warnings": {},
  "skipped": []
}
```
