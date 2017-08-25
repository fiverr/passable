// @flow
const WARN: string = 'warn';

function onFail(fieldName: string, statement: string, severity: Severity, prevResObj: PassableResponse): PassableResponse {
    let countName: string = 'failCount',
        nameSuffix: string = 'Errors';

    if (severity === WARN) {
        countName = 'warnCount';
        nameSuffix = 'Warnings';
    }

    const objectName: string = `validation${nameSuffix}`;
    const res: PassableResponse = prevResObj;

    res[`hasValidation${nameSuffix}`] = true;
    res[objectName][fieldName] = res[objectName][fieldName] || [];
    res[objectName][fieldName].push(statement);
    res[countName]++;
    res.testsPerformed[fieldName][countName]++;

    return res;
}

export default onFail;