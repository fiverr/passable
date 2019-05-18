import chai from 'chai';
import chaiExclude from 'chai-exclude';

chai.use(chaiExclude);

export const excludeFromResult = [
    'after',
    'done',
    'getErrors',
    'hasErrors',
    'hasWarnings',
    'getWarnings'
];