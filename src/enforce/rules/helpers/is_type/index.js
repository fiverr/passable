// @flow

function isType(value: mixed, type: string, expect?: boolean = true): boolean %checks {
    return type === 'array' ? Array.isArray(value) === expect : (typeof value === type) === expect;
}

export default isType;