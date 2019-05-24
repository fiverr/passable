const fs = require('fs');
const { version } = require('../package.json');

fs.writeFileSync('./.version', version);