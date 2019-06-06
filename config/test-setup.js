const regeneratorRuntime = require('regenerator-runtime');
const chai = require('chai');
const chaiExclude = require('chai-exclude');

chai.use(chaiExclude);

export const excludeFromResult = [
    'after',
    'done',
    'getErrors',
    'hasErrors',
    'hasWarnings',
    'getWarnings'
];

global.PASSABLE_VERSION = require('../package.json').version;