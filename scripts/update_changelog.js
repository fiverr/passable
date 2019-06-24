const fs = require('fs');
const { format } = require('date-fns');

const changelogTitle = `## [${process.env.TRAVIS_BRANCH}] - ${format(new Date(), 'YYYY-MM-DD')}\n`;

const changelog = fs.readFileSync('./CHANGELOG.md', 'utf8').split('\n');
changelog.splice(6, 0, changelogTitle);

fs.writeFileSync('./CHANGELOG.md', changelog.join('\n'));