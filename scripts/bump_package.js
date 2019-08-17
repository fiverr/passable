const { execSync } = require('child_process');
const determineLevel = require('./determine_change_level');

/**
 * Bumps package.json version
 * @param {String} commitHistory
 * @return {String} next semver version
 */
const bumpPackage = (commitHistory) => {
    const changeLevel = determineLevel(commitHistory);
    execSync(`npm version ${changeLevel} --no-git-tag`);
    const { version } = require('../package.json');
    return version;
};

module.exports = bumpPackage;
