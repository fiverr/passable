'use strict';

import passableArgs from './index';
import chai from 'chai';

const expect = chai.expect;

describe('Test Passable arguments logic', () => {
    const noop = () => undefined;

    it('Should throw exception when given no arguments', () => {
        expect(passableArgs.bind(null, [])).to.throw("passable]: Failed to execute 'passableArgs': At least 1 argument required, but only 0 present.");
    });

    it('Should throw exception when given only string argument', () => {
        expect(passableArgs.bind(null, ['basic'])).to.throw("[passable]: Failed to execute 'passableArgs': Unexpected string, expected function");
    });

    it('Should return given "passes", default on specific and custom', () => {
        const value = passableArgs([noop]);
        expect(value).to.deep.equal({
            passes: noop,
            custom: {},
            specific: []
        });
    });

    it('Should return all attrs, not use default values', () => {
        const value = passableArgs([['noop'], noop, {noop}]);
        expect(value).to.deep.equal({
            specific: ['noop'],
            passes: noop,
            custom: {noop}
        });
    });

    it('Should return specific and passes, default on custom', () => {
        const value = passableArgs([['Yo'], noop]);
        expect(value).to.deep.equal({
            specific: ['Yo'],
            passes: noop,
            custom: {}
        });
    });

    it('Should return custom and passes, default on specific', () => {
        const value = passableArgs([noop, {t: noop}]);
        expect(value).to.deep.equal({
            specific: [],
            passes: noop,
            custom: {t: noop}
        });
    });

    it('Should throw a typerror if passes is not a function', () => {
        expect(passableArgs.bind(null, [[], 'noop', {}])).to.throw("[passable]: Failed to execute 'passableArgs': Unexpected argument, expected function at positon '2'");
    });
});
