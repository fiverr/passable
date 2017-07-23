// @flow

function isType(value: any, type: string, expect?: boolean = true): boolean {

    if (type === 'array') {
        return Array.isArray(value) === expect;
    }

    return (typeof value === type) === expect;
}

export default isType;