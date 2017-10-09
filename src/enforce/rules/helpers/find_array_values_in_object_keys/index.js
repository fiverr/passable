// @flow
function findArrayValuesInObjectKeys(array: Array<TYPENSB>, object: Object): boolean { // eslint-disable-line flowtype/no-weak-types

    return array.every((element) => object && object.hasOwnProperty(element));
}

export default findArrayValuesInObjectKeys;