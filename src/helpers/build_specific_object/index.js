// @flow

/**
 * Add array items or strings to set
 *
 * @private
 * @param {Set} set
 * @param {Array | String} items
 * @return {Set}
 */
function addSpecificItemsToSet(set: Set<string>, items: Specific): Set<string> {
    if (typeof items === 'string') {
        return set.add(items);
    }

    if (Array.isArray(items)) {
        items.forEach(set.add, set);
    }

    return set;
}

/**
 * Build `specific` object from an array, string or object
 *
 * @param {String | Array<String> | Object} specific
 * @return {Object}
 */

export default function buildSpecificObject(specific: Specific): SpecificSelf {

    const result: SpecificSelf = {
        only: new Set(),
        not: new Set()
    };

    if (!specific) { return result; }

    if (
        typeof specific === 'string'
        || Array.isArray(specific)
    ) {
        addSpecificItemsToSet(result.only, specific);
        return result;
    }

    if (specific.only) {
        addSpecificItemsToSet(result.only, specific.only);
    }

    if (specific.not) {
        addSpecificItemsToSet(result.not, specific.not);
    }

    return result;
}