const { execSync } = require('child_process');
const determineLevel = require('./determine_change_level');

/**
 * Bumps package.json version
 * @param {String} commitHistory
 * @return {String} next semver version
 */
const bumpPackage = (commitHistory) => {
    const changeLevel = determineLevel(commitHistory);
    console.log('bumpPackage: Change level is:', changeLevel);
    execSync(`npm version ${changeLevel} --no-git-tag`);
    const { version } = require('../package.json');
    console.log('bumpPackage: version is:', version);
    return version;
};

module.exports = bumpPackage;
