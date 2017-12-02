const fs = require('fs');
const { version } = require('../package.json');

fs.writeFileSync('version.json', JSON.stringify({ version }));