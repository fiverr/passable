// @flow

import reduceArrayToMap from '../reduce_array_to_map';
import findArrayValuesInMapKeys from '../find_array_values_in_map_keys';

type Value = Array<NumStrBool>;

function findArrayValuesInArray(values: Value, array: Value): boolean {
    const reducedArray: MapType = reduceArrayToMap(array),
        allItemsFound: boolean = findArrayValuesInMapKeys(values, reducedArray);

    return allItemsFound;
}

export default findArrayValuesInArray;