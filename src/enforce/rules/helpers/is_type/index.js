function isType(value, type, expect = true) {

    if (type === 'array') {
        return Array.isArray(value) === expect;
    }

    return (typeof value === type) === expect;
}

export default isType;