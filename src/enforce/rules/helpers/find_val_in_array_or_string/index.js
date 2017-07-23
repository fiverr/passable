// @flow
function findValInArrayOrString(value: string | any, container: Array<mixed> | string): boolean {
    return container.indexOf(value) > -1;
}

export default findValInArrayOrString;