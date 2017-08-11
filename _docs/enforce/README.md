# The `enforce` function
The `enforce` function runs your data against different rules and conditions. It is basically, the default assertion method for Passable tests. Its intended use is for validations logic that gets repeated over and over again and shouldn't be written manually. For each rule, you may also pass either value or an options object that may be used by the function of the rule.

When using enforce, you do not have to return the result (although you may), each of your enforce tests updates the result of the whole pass. You may also use multiple enforces in the same pass function, they will run in sequence.

```js
Passable('enforcement', (pass, enforce) => {
    pass('test', 'multiple enforces', () => {
        enforce('str1').allOf({...}).anyOf({...});
        enforce('str2').noneOf({...});
        enforce('str3').anyOf({...});
    });
});
```