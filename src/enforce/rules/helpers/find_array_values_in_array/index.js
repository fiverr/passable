// @flow

import { reduceArrayToObject,
    findArrayValuesInObjectKeys } from '../index';

type Value = Array<NumStrBool>;

function findArrayValuesInArray(values: Value, array: Value): boolean {
    const reducedArray: ArrayReducedToObject = reduceArrayToObject(array),
        allItemsFound: boolean = findArrayValuesInObjectKeys(values, reducedArray);

    return allItemsFound;
}

export default findArrayValuesInArray;