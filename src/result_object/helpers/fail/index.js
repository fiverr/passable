// @flow
import PassableResponse from '../../index';

export const WARN: string = 'warn';

type CountName = 'failCount' | 'warnCount';
type ObjectName = 'validationErrors' | 'validationWarnings';
type ValidationName = 'hasValidationErrors' | 'hasValidationWarnings';

function fail(fieldName: string, statement: string, severity: Severity): PassableResponse {
    const isFail: boolean = (severity !== WARN);

    const countName: CountName = isFail? 'failCount' : 'warnCount',
        objectName: objectName = isFail? 'validationErrors' : 'validationWarnings',
        validationName: ValidationName = isFail? 'hasValidationErrors' : 'hasValidationWarnings';

    this[validationName] = true;
    this[objectName][fieldName] = this[objectName][fieldName] || [];
    this[objectName][fieldName].push(statement);
    this[countName]++;
    this.testsPerformed[fieldName][countName]++;

    return this;
}

export default fail;