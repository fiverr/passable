// @flow
const WARN: string = 'warn';

type CountName = 'failCount' | 'warnCount';
type ObjectName = 'validationErrors' | 'validationWarnings';
type ValidationName = 'hasValidationErrors' | 'hasValidationWarnings';

function onFail(fieldName: string, statement: string, severity: Severity, prevResObj: PassableResponse): PassableResponse {
    let countName: CountName = 'failCount',
        objectName: objectName = 'validationErrors',
        validationName: ValidationName = 'hasValidationErrors';

    if (severity === WARN) {
        countName = 'warnCount';
        objectName = 'validationWarnings';
        validationName = 'hasValidationWarnings';
    }

    const res: PassableResponse = prevResObj;

    res[validationName] = true;
    res[objectName][fieldName] = res[objectName][fieldName] || [];
    res[objectName][fieldName].push(statement);
    res[countName]++;
    res.testsPerformed[fieldName][countName]++;

    return res;
}

export default onFail;