'use strict';

import passRunner from './index';
import chai from 'chai';

const pr = passRunner.bind({}); // mimicks the `call` wer'e doing in passable 'run' function

const expect = chai.expect,
    passing = () => true,
    failing = () => false;

describe('Test Pass Runner Logic', () => {

    it('Should be default to false', () => {
        expect(pr(() => undefined)).to.equal(false);
    });

    it('Should return null if no callback is given', () => {
        expect(pr()).to.equal(false);
    });

    it('Should return false if callback is not a function', () => {
        expect(pr({})).to.equal(false);
    });

    it('Should return true for a passing test', () => {
        expect(pr(passing)).to.equal(true);
    });

    it('Should return false for a failing test', () => {
        expect(pr(failing)).to.equal(false);
    });
});