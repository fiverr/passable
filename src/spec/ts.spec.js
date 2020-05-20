const { execSync } = require('child_process');
const path = require('path');

describe('TypeScript Typings', () => {
    it('Should pass the typings check', () => {
        execSync(`node_modules/.bin/tsc ${path.resolve(__dirname, '../..', 'index.d.ts')}`);
    }).timeout(0);
});
