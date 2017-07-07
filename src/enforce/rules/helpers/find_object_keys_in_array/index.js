import { reduceArrayToObject } from '../index';

function findObjectKeysInArray(object, array) {

    let foundElements = 0;
    const reducedArray = reduceArrayToObject(array);

    for (const key in object) {
        if (object.hasOwnProperty(key) && reducedArray.hasOwnProperty(key)) {
            foundElements++;
        } else {
            // missing one. exit
            break;
        }
    }

    return Object.keys(object).length === foundElements;
}

export default findObjectKeysInArray;