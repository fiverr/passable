// @flow
function findValInArrayOrString(value: string | AnyValue, container: Array<NumStrBool> | string): boolean {
    return container.indexOf(value) > -1;
}

export default findValInArrayOrString;