'use strict';

import passableArgs from './index';
import chai from 'chai';

const expect = chai.expect;

describe('Test Passable arguments logic', () => {
    const noop = () => undefined;

    it('Should throw an exception when given no arguments', () => {
        expect(passableArgs.bind(null, [])).to.throw("[Passable]: Failed to execute 'passableArgs': At least 1 argument required, but only 0 present.");
    });

    it('Should throw an exception when given a single argument of the wrong type', () => {
        expect(passableArgs.bind(null, ['basic'])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected string, expected function");
        expect(passableArgs.bind(null, [{}])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected object, expected function");
        expect(passableArgs.bind(null, [1])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected number, expected function");
    });

    it('Should return a correct passable arguments object when passableArgs recieves only a function as an argument', () => {
        expect(passableArgs([noop])).to.deep.equal({
            passes: noop,
            specific: [],
            custom: {}
        });
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

    it('Should throw an exception when passes is not a function', () => {
        expect(passableArgs.bind(null, [[], 'noop', {}])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected argument, expected function at position '2'");
    });

    it('Should throw an exception if either specific or custom are of wrong types', () => {
        expect(passableArgs.bind(null, [true, noop, ''])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected set of arguments. Expected: Specific, Passes, Custom");
        expect(passableArgs.bind(null, [[], noop, ''])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected set of arguments. Expected: Specific, Passes, Custom");
        expect(passableArgs.bind(null, [{}, noop, {}])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected set of arguments. Expected: Specific, Passes, Custom");
    });

    it('Should throw an exception if two arguments are passed, with no function', () => {
        expect(passableArgs.bind(null, [[], {}])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected argument, expected function at position '1' or '2'");
        expect(passableArgs.bind(null, ['noop', {}])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected argument, expected function at position '1' or '2'");
    });
});
