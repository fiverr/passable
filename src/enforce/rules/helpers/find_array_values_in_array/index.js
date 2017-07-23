// @flow

import { reduceArrayToObject,
    findArrayValuesInObjectKeys } from '../index';

type Value = Array<string | number>;

function findArrayValuesInArray(values: Value, array: Value): boolean {
    const reducedArray = reduceArrayToObject(array),
        allItemsFound = findArrayValuesInObjectKeys(values, reducedArray);

    return allItemsFound;
}

export default findArrayValuesInArray;