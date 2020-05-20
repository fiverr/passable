const { execSync } = require('child_process');

describe('TypeScript Typings', () => {
    it('Should pass the typings check', () => {
        execSync('node_modules/.bin/tsc index.d.ts');
    }).timeout(0);
});
