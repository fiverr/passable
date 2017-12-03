const fs = require('fs');
const files = fs.readFileSync('./tree.txt', 'utf8').split('\n');
const version = require('../version.json').version;
const pattern = /{{([a-zA-Z0-9_]+)}}/;
const strings = {
    'PASSABLE_VERSION': () => version
};

const matchedFiles = files.reduce((accumulator, path) => {
    if (path.toLowerCase().indexOf('.md') === -1) {
        return accumulator;
    }

    const content = fs.readFileSync(path, 'utf8');
    if (content.match(pattern)) {
        accumulator.push({
            path,
            content
        });
    }
    return accumulator;
}, []);

matchedFiles.forEach(({ path, content }) => {
    fs.writeFileSync(path, content.replace(new RegExp(pattern, 'g'), (match) => {
        const noBrackets = match.substr(2, match.length - 4);
        return strings[noBrackets] ? strings[noBrackets](noBrackets) : match;
    }));
});

fs.writeFileSync('./version.txt', version);