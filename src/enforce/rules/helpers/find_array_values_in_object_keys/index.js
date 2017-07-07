function findArrayValuesInObjectKyes(array, object) {
    let foundElements = 0;

    for (let index = 0; index < array.length; index++) {

        if (foundElements === array.length) {
            // we're done. exit.
            break;
        }

        if (object.hasOwnProperty(array[index])) {
            foundElements++;
        } else {
            // missing one. exit.
            break;
        }
    }
    return foundElements === array.length;
}

export default findArrayValuesInObjectKyes;