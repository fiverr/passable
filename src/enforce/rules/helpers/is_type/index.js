// @flow

function isType(value: mixed, type: string, expect?: boolean = true): boolean {

    if (type === 'array') {
        return Array.isArray(value) === expect;
    }

    return (typeof value === type) === expect;
}

export default isType;