# Running a `specific` pass
Sometimes you want to test only a specific field out of the whole form. For example, when validating upon user interaction, such as input change, you probably do not want to validate all other fields as well. Same goes for only validating dirty/touched fields.
With the `specific` param, it is as easy as passing the names of the fields you wish to test. All other fields will be skipped and not tested.

The specific param is optional, and it accepts an array of fields to include - must be the same as the names specified in their `pass` function. The way easiest to use it, is to wrap your validation with a function that passes down the fields to include, only if needed.

In the following example, only First pass is going to run. Second will be skipped.
```js
const result = SpecificTests(['First']);

function SpecificTests (specific) {
    return Passable('SpecificTests', specific, (pass, enforce) => {
        pass('First',  'should pass', () => {...});
        pass('Second', 'should be skipped', () => {...});
    });
};
```