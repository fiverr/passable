# The result object

## Properties
| Name                             | Type       | Description                                         |
|----------------------------------|------------|-----------------------------------------------------|
| `name`                           | `String`   | The name of the form being validated                |
| `hasValidationErrors`            | `Boolean`  | Whether there are validation errors or not          |
| `hasValidationWarnings`          | `Boolean`  | Whether there are validation warnings or not        |
| `failCount`                      | `Number`   | Overall errors count for this form                  |
| `warnCount`                      | `Number`   | Overall warnings count for this form                |
| `testCount`                      | `Number`   | Overall test count in this form                     |
| `testsPerformed`                 | `Object{}` | Detailed stats per field (structure detailed below) |
| `validationErrors`               | `Object[]` | Actual errors per each field                        |
| `validationErrors[field-name]`   | `Object[]` | All error strings for this field                    |
| `validationWarnings`             | `Object[]` | Actual errors per each field                        |
| `validationWarnings[field-name]` | `Object[]` | All warning strings for this field                  |
| `skipped`                        | `Array`    | All skipped fields (empty, unless the `specific` option is used) |
| `getErrors`                      | `Function` | Getter function which allows accessing the errors array of one or all fields |
| `getWarnings`                      | `Function` | Getter function which allows accessing the warnings array of one or all fields |

### `testsPerformed` field structure
| Name        | Type     | Description                           |
|-------------|----------|---------------------------------------|
| `failCount` | `Number` | Overall errors count for this field   |
| `warnCount` | `Number` | Overall warnings count for this field |
| `testCount` | `Number` | Overall test count in this field      |

## `getErrors` and `getWarnings` functions
> since 5.10.0

You can easily traverse the object tree to acess the field errors and warnings, but when accessing many fields, it can get pretty messy:
```js
resultObject.validationErrors.myField && resultObject.validationErrors.myField[0];
```
This is clearly not ideal. There is a shortcut to getting to a specific field:

```js
resultObject.getErrors('fieldName');
// ['Error string 1', `Error string 2`]

resultObject.getWarnings('fieldName');
// ['Warning string 1', `Warning string 2`]
```

If there are no errors for the field, the function returns an empty array:
```js
resultObject.getErrors('fieldName');
// []

resultObject.getWarnings('fieldName');
// []
```

## Why No `isValid` prop?
There is **no** `isValid` prop, this is by design. Passable cannot know your business logic, nor can it ever assume that `0` errors means valid result. `0` errors can be due to skipped fields. Same goes for isInvalid. Even though, usually, errors mean invalidity, it is not always the case. This is why Passable gives you all the information about the tests, but it is your job to decide whether it means that the validation failed or not.

## Passing Example
```js
{
  "name": "NewUserForm",
  "hasValidationErrors": false,
  "hasValidationWarnings": false,
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
  "validationErrors": {},
  "validationWarnings": {},
  "skipped": []
}
```

## Failing Example
```js
{
  "name": "NewUserForm",
  "hasValidationErrors": true,
  "hasValidationWarnings": false,
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
  "validationErrors": {
    "username": [
      "Must be a string between 2 and 10 chars"
    ],
    "age": [
      "Can either be empty, or larger than 18"
    ]
  },
  "validationWarnings": {},
  "skipped": []
}
```
