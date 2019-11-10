const { version } = require('../package.json');
const semver = require('semver');
const determineLevel = require('./determine_change_level');

const changeLevel = determineLevel(process.argv[2] || '');

const nextVersion = semver.inc(version, changeLevel);

console.log(nextVersion);
