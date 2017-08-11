# The response object

## All response properties
In the response object you will find the following:
* name: `string` | the name of the form being validated
* hasValidationErrors: `boolean` | whether there are validation errors or not
* hasValidationWarnings: `boolean` | whether there are validation warnings or not
* failCount: `number` | overall errors count for this form
* warnCount: `number` | overall warning count for this form
* testCount: `number` | overall test count in this form
* testsPerformed: `object` | detailed stats per each field
    * [field-name]: `object` | per field data
        * testCount: `number` | test count for the field.
        * failCount: `number` | error count for the field.
        * warnCount: `number` | warning count for the field.
* validationErrors: `object` | actual errors per each field
    * [field-name]: `array` | all error strings for thes field
* validationWarnings: `object` | actual warnings per each field
    * [field-name]: `array` | all warning strings for thes field
* skipped | `array` | all skipped fields (empty, unless the `specific` option is used)

## Why No `isValid` prop?
There is **no** `isValid` prop, this is by design. Passable cannot know your business logic, nor can it ever assume that `0` errors means valid response. `0` errors can be due to skipped fields. Same goes for isInvalid. Even though, usually, errors mean invalidity, it is not always the case. This is why Passable gives you all the information about the tests, but it is your job to decide whether it means that the validation failed or not.

## Passing example
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