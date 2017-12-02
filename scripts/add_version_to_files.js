const fs = require('fs');
const files = fs.readFileSync('./tree.txt', 'utf8').split('\n');
const version = require('../version.json').version;
const pattern = '{{PASSABLE_VERSION}}';
const matchedFiles = [];

files.forEach((path) => {
    if (path.toLowerCase().indexOf('.md') === -1) {
        return;
    }

    const content = fs.readFileSync(path, 'utf8');
    if (content.match(pattern)) {
        matchedFiles.push({
            path,
            content
        });
    }
});

matchedFiles.forEach(({ path, content }) => {
    fs.writeFileSync(path, content.replace(new RegExp(pattern, 'g'), version));
});