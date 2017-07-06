function findArrayValuesInObjectKeys(array, object) {

    return array.every((element) => object && object.hasOwnProperty(element));
}

export default findArrayValuesInObjectKeys;