import { expect } from 'chai';
const { execSync } = require('child_process');

describe('TypeScript Typings', () => {
    it('Should pass the typings check', () => {
        expect(() => {
            execSync('node_modules/.bin/tsc index.d.ts');
        }).to.not.throw();
    }).timeout(0);

    it('Should fail the typings check with fail stub', () => {
        expect(() => {
            execSync('node_modules/.bin/tsc src/spec/fail.d.ts');
        }).to.throw();
    }).timeout(0);
});
