const fs = require('fs');
const { version } = require('../package.json');

fs.writeFileSync('version.json', JSON.stringify({ version }));
fs.writeFileSync('./version.txt', version);