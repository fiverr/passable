// @flow
function findValInArrayOrString(value: string | AnyValue, container: Array<mixed> | string): boolean {
    return container.indexOf(value) > -1;
}

export default findValInArrayOrString;