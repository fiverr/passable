'use strict';

import passRun from './index';
import chai from 'chai';

const expect = chai.expect,
    passing = () => true,
    failing = () => false;

describe('Test Pass Runner Logic', () => {

    it('Should be initialized as null', () => {
        expect(passRun().valid).to.equal(null);
    });

    it('Should return false if no callback is given', () => {
        expect(passRun().run()).to.equal(false);
    });

    it('Should return false if callback is not a function', () => {
        expect(passRun().run({})).to.equal(false);
    });

    it('Should return true for a passing test', () => {
        expect(passRun().run(passing)).to.equal(true);
    });

    it('Should return false for a failing test', () => {
        expect(passRun().run(failing)).to.equal(false);
    });
});
