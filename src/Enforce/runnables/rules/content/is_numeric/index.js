// @flow

function isNumeric(value: mixed): boolean {
    const result: boolean = !isNaN(parseFloat(value)) && !isNaN(Number(value)) && isFinite(value);
    return Boolean(result);
}

isNumeric.negativeForm = 'isNotNumeric';

export default isNumeric;