function isType(value, type, expect) {

    if (type === 'array') {
        return Array.isArray(value) === expect;
    }

    return (typeof value === type) === expect;
}

export default isType;