
const fs = require('fs');
const { format } = require('date-fns');
const determineLevel = require('./determine_change_level');
const { MAJOR_KEYWORD, MINOR_KEYWORD, PATCH_KEYWORD, CHANGELOG_TITLES } = require('./constants');

/**
 * Takes commit history and groups messages by change level
 * @param {String} gitLog commit history
 * @return {Object} an object with keys matching the semver levels
 */
const groupMessages = (gitLog) => gitLog.split('\n').reduce((accumulator, current) => {
    const level = determineLevel(current);

    if (!accumulator[level]) {
        accumulator[level] = `### ${CHANGELOG_TITLES[level]}\n`;
    }

    return Object.assign(accumulator, {
        [level]: `${accumulator[level]}- ${current}\n`
    });
}, {});

/**
 * Updates changelog file with recent version and commit history
 * @param {String} version semver version for current release
 * @param {String} gitLog commit history
 */
const updateChangelog = (version, gitLog) => {
    const groupedMessages = groupMessages(gitLog);

    const changelogTitle = `## [${version}] - ${format(new Date(), 'YYYY-MM-DD')}\n`;

    const versionLog = [
        changelogTitle,
        groupedMessages[MAJOR_KEYWORD],
        groupedMessages[MINOR_KEYWORD],
        groupedMessages[PATCH_KEYWORD]
    ].filter(Boolean).join('\n');

    const changelog = fs.readFileSync('./CHANGELOG.md', 'utf8').split('\n');
    changelog.splice(6, 0, versionLog);

    fs.writeFileSync('./CHANGELOG.md', changelog.join('\n'));
};

module.exports = updateChangelog;
