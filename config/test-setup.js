const regeneratorRuntime = require('regenerator-runtime');
const chai = require('chai');
const chaiExclude = require('chai-exclude');

chai.use(chaiExclude);

global.PASSABLE_VERSION = require('../package.json').version;