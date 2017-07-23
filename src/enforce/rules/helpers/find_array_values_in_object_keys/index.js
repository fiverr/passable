// @flow
function findArrayValuesInObjectKeys(array: Array<string | number>, object: Object): boolean {

    return array.every((element) => object && object.hasOwnProperty(element));
}

export default findArrayValuesInObjectKeys;