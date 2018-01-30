// @flow

import { reduceArrayToMap,
    findArrayValuesInMapKeys } from '../index';

type Value = Array<NumStrBool>;

function findArrayValuesInArray(values: Value, array: Value): boolean {
    const reducedArray: MapType = reduceArrayToMap(array),
        allItemsFound: boolean = findArrayValuesInMapKeys(values, reducedArray);

    return allItemsFound;
}

export default findArrayValuesInArray;