function inside(value, arg1) {

    if (Array.isArray(arg1) && ['string', 'number', 'boolean'].includes(typeof value)) {
        return arg1.includes(value);
    }

    // both value and arg1 are strings
    if (typeof arg1 === 'string' && typeof value === 'string') {
        return arg1.includes(value);
    }

    return false;
}

inside.negativeForm = 'notInside';

export default inside;
