// @flow
const WARN = 'warn';

function onFail(fieldName: string, statement: string, severity: Severity, prevResObj: Object): PassableResponse {
    let countName = 'failCount',
        nameSuffix = 'Errors';

    if (severity === WARN) {
        countName = 'warnCount';
        nameSuffix = 'Warnings';
    }

    const objectName = `validation${nameSuffix}`;
    const res = prevResObj;

    res[`hasValidation${nameSuffix}`] = true;
    res[objectName][fieldName] = res[objectName][fieldName] || [];
    res[objectName][fieldName].push(statement);
    res[countName]++;
    res.testsPerformed[fieldName][countName]++;

    return res;
}

export default onFail;