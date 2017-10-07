// @flow
const WARN: string = 'warn';

declare type countName = 'failCount' | 'warnCount';
declare type nameSuffix = 'Errors' | 'Warnings';
declare type objectName = 'validationErrors' | 'validationWarnings';
declare type hasValidationName = 'hasValidationErrors' | 'hasValidationWarnings';

function onFail(fieldName: string, statement: string, severity: Severity, prevResObj: PassableResponse): PassableResponse {
    let countName: countName = 'failCount',
        nameSuffix: nameSuffix = 'Errors';

    if (severity === WARN) {
        countName = 'warnCount';
        nameSuffix = 'Warnings';
    }

    const objectName: objectName = `validation${nameSuffix}`;
    const res: PassableResponse = prevResObj;
    const validationName: hasValidationName = `hasValidation${nameSuffix}`;

    res[validationName] = true;
    res[objectName][fieldName] = res[objectName][fieldName] || [];
    res[objectName][fieldName].push(statement);
    res[countName]++;
    res.testsPerformed[fieldName][countName]++;

    return res;
}

export default onFail;