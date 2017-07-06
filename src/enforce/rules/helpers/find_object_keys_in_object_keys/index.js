function findObjectKeysInObject(object1, object2) {
    let foundElements = 0;
    const object1Length = Object.keys(object1).length;

    for (const key in object1) {
        if (foundElements === object1Length) {
            // we're done. exit
            break;
        }

        if (object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
            foundElements++;
        } else {
            // missing one. exit
            break;
        }
    }

    return object1Length === foundElements;
}

export default findObjectKeysInObject;