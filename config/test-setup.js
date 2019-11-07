const regeneratorRuntime = require('regenerator-runtime');
const chai = require('chai');

global.expect = chai.expect;
global.PASSABLE_VERSION = require('../package.json').version;

require('../src');
