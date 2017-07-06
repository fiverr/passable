import { reduceArrayToObject,
    findArrayValuesInObjectKeys } from '../index';

function findArrayValuesInArray(values, array) {
    const reducedArray = reduceArrayToObject(array),
        allItemsFound = findArrayValuesInObjectKeys(values, reducedArray);

    return allItemsFound;
}

export default findArrayValuesInArray;