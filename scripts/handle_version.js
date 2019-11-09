const bumpPackage = require('./bump_package');
const updateChangelog = require('./update_changelog');

const gitLog = process.argv[2] || '';

const nextVersion = bumpPackage(gitLog);

updateChangelog(nextVersion, gitLog);

console.log(nextVersion);
