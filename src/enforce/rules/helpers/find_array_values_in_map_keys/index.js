// @flow

function findArrayValuesInMapKeys(array: Array<NumStrBool>, map: MapType): boolean { // eslint-disable-line flowtype/no-weak-types
    if (!map) {return false;}
    return array.every((element) => map && map.has(element));
}

export default findArrayValuesInMapKeys;