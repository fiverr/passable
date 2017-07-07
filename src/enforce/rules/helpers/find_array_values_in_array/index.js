import { reduceArrayToObject } from '../index';

function findArrayValuesInArray(values, array) {
    let foundElements = 0;
    const reducedArray = reduceArrayToObject(array);

    for (let index = 0; index < values.length; index++) {

        // we're done, exit
        if (foundElements === values.length) {
            break;
        }

        if (reducedArray.hasOwnProperty(values[index])) {
            foundElements++;
        } else {
            // missing one, exit.
            break;
        }
    }

    return foundElements === values.length;
}

export default findArrayValuesInArray;