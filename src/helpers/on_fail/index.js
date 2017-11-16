// @flow
const WARN: string = 'warn';

type CountName = 'failCount' | 'warnCount';
type ObjectName = 'validationErrors' | 'validationWarnings';
type ValidationName = 'hasValidationErrors' | 'hasValidationWarnings';

function onFail(fieldName: string, statement: string, severity: Severity, prevResObj: PassableResponse): PassableResponse {
    const isFail: boolean = (severity !== WARN);

    const countName: CountName = isFail? 'failCount' : 'warnCount',
        objectName: objectName = isFail? 'validationErrors' : 'validationWarnings',
        validationName: ValidationName = isFail? 'hasValidationErrors' : 'hasValidationWarnings';

    const res: PassableResponse = prevResObj;

    res[validationName] = true;
    res[objectName][fieldName] = res[objectName][fieldName] || [];
    res[objectName][fieldName].push(statement);
    res[countName]++;
    res.testsPerformed[fieldName][countName]++;

    return res;
}

export default onFail;