// @flow

/**
 * Add array items or strings to object
 *
 * @private
 * @param {Object} group
 * @param {Array | String} items
 * @return {Object}
 */
function addSpecificItemsToGroup(group: SpecificGroup, specific: Specific): SpecificGroup {
    if (typeof specific === 'string') {
        group[specific] = true;
        return group;
    }

    if (Array.isArray(specific)) {
        specific.forEach((field) => group[field] = true);
    }

    return group;
}

/**
 * Build `specific` object from an array, string or object
 *
 * @param {String | Array<String> | Object} specific
 * @return {Object}
 */
export default function buildSpecificObject(specific: Specific = []): SpecificObject {

    const result: SpecificObject = {};

    if (!specific) { return result; }

    if (
        typeof specific === 'string'
        || Array.isArray(specific)
    ) {
        if (specific.length === 0) { return result; }

        result.only = {};
        addSpecificItemsToGroup(result.only, specific);
        return result;
    }

    if (specific.only) {
        result.only = {};
        addSpecificItemsToGroup(result.only, specific.only);
    }

    if (specific.not) {
        result.not = {};
        addSpecificItemsToGroup(result.not, specific.not);
    }

    return result;
}